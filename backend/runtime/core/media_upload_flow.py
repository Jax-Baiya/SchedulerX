from pathlib import Path
from core.db_access import get_first_media_item, get_media_items
from core.r2_uploader import R2Uploader
import logging
import time
from typing import Optional, Dict, List
from datetime import datetime
from sqlalchemy.orm import Session
from core.db_access import get_db

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class UploadStatus:
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"

class MediaUploadFlow:
    def __init__(self, max_retries: int = 3, retry_delay: int = 5):
        self.r2_uploader = R2Uploader()
        self.max_retries = max_retries
        self.retry_delay = retry_delay

    def validate_media_file(self, file_path: Path) -> bool:
        """Validate that the media file exists and is accessible"""
        if not file_path.exists():
            logger.error(f"[❌] File not found: {file_path}")
            return False
        if not file_path.is_file():
            logger.error(f"[❌] Not a file: {file_path}")
            return False
        return True

    def _retry_operation(self, operation, *args, **kwargs) -> Optional[str]:
        """Retry an upload operation with exponential backoff"""
        for attempt in range(self.max_retries):
            try:
                result = operation(*args, **kwargs)
                if result:
                    return result
            except Exception as e:
                logger.error(f"Attempt {attempt + 1} failed: {str(e)}")
                
            if attempt < self.max_retries - 1:
                delay = self.retry_delay * (2 ** attempt)  # Exponential backoff
                logger.info(f"Retrying in {delay} seconds...")
                time.sleep(delay)
        
        return None

    def update_upload_status(self, media_item, status: str, urls: Dict = None):
        """Update media item with upload status and URLs"""
        db = next(get_db())
        try:
            # Add status and URLs to media item
            media_item.upload_status = status
            media_item.upload_timestamp = datetime.utcnow()
            
            if urls:
                media_item.r2_video_url = urls.get('video_url')
                media_item.r2_cover_url = urls.get('cover_url')
            
            db.commit()
            logger.info(f"[✓] Updated status for {media_item.video_id}: {status}")
        except Exception as e:
            db.rollback()
            logger.error(f"[❌] Failed to update status: {str(e)}")
        finally:
            db.close()

    def upload_single_media(self, media_item) -> dict:
        """Upload a single media item with retry logic"""
        result = {
            'success': False,
            'video_url': None,
            'cover_url': None,
            'errors': []
        }

        # Update status to in progress
        self.update_upload_status(media_item, UploadStatus.IN_PROGRESS)

        # Upload video with retry
        video_path = Path(media_item.video_path)
        if self.validate_media_file(video_path):
            video_url = self._retry_operation(
                self.r2_uploader.upload_file, 
                video_path
            )
            if video_url:
                result['video_url'] = video_url
            else:
                result['errors'].append("Failed to upload video after retries")
                self.update_upload_status(media_item, UploadStatus.FAILED)
                return result
        else:
            result['errors'].append(f"Invalid video file: {video_path}")
            self.update_upload_status(media_item, UploadStatus.FAILED)
            return result

        # Upload cover with retry
        cover_path = Path(media_item.cover_path)
        if self.validate_media_file(cover_path):
            cover_url = self._retry_operation(
                self.r2_uploader.upload_file, 
                cover_path
            )
            if cover_url:
                result['cover_url'] = cover_url
            else:
                result['errors'].append("Failed to upload cover after retries")
                self.update_upload_status(media_item, UploadStatus.FAILED)
                return result
        else:
            result['errors'].append(f"Invalid cover file: {cover_path}")
            self.update_upload_status(media_item, UploadStatus.FAILED)
            return result

        # Update status to completed
        result['success'] = True
        self.update_upload_status(
            media_item, 
            UploadStatus.COMPLETED,
            {
                'video_url': result['video_url'],
                'cover_url': result['cover_url']
            }
        )
        return result

    def process_next_media(self) -> dict:
        """Process the next available media item"""
        media_item = get_first_media_item()
        if not media_item:
            return {'success': False, 'error': 'No media items found in database'}
        
        return self.upload_single_media(media_item)

    def process_batch(self, limit: int = 5) -> list:
        """Process a batch of media items"""
        results = []
        media_items = get_media_items(limit=limit)
        
        for item in media_items:
            result = self.upload_single_media(item)
            results.append({
                'video_id': item.video_id,
                'result': result
            })
            
        return results

def main():
    """Main entry point for media upload flow"""
    flow = MediaUploadFlow()
    
    # Process single item
    logger.info("[🚀] Starting media upload flow...")
    result = flow.process_next_media()
    
    if result['success']:
        logger.info("[✅] Upload completed successfully!")
        logger.info(f"Video URL: {result['video_url']}")
        logger.info(f"Cover URL: {result['cover_url']}")
    else:
        logger.error(f"[❌] Upload failed: {result['errors']}")

if __name__ == "__main__":
    main()
