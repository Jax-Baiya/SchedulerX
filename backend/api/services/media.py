from pathlib import Path
from typing import Optional, Dict, List
import logging
from sqlalchemy.orm import Session
from ..utils.path_resolver import (
    resolve_media_path,
    normalize_path,
    validate_path,
    get_relative_path,
    sanitize_path,
    check_permissions
)
from ..config import settings
from shared.media_utils import validation, metadata

logger = logging.getLogger(__name__)

class MediaService:
    def __init__(self, db: Session):
        self.db = db
        self.base_dir = settings.LOCAL_MEDIA_DIR

    def get_media_paths(self, video_id: str) -> Dict[str, Path]:
        """Get sanitized, normalized full paths for a video's media files"""
        media_record = self.db.query("media").filter_by(video_id=video_id).first()
        if not media_record:
            raise ValueError(f"Media record not found for video_id: {video_id}")

        # Resolve and sanitize paths using the base directory
        video_path = sanitize_path(
            resolve_media_path(media_record.video_path, self.base_dir),
            self.base_dir
        )
        cover_path = sanitize_path(
            resolve_media_path(media_record.cover_path, self.base_dir),
            self.base_dir
        )

        # Normalize paths for current OS
        return {
            "video": Path(normalize_path(video_path)),
            "cover": Path(normalize_path(cover_path))
        }

    def validate_media_files(self, video_id: str) -> bool:
        """Validate that all media files exist, are accessible, and pass shared validation."""
        try:
            paths = self.get_media_paths(video_id)
            for path in paths.values():
                if not validation.validate_file_size(str(path), 500):
                    logger.error(f"File too large: {path}")
                    return False
                if not validation.validate_file_type(str(path), ['video/mp4', 'image/jpeg', 'image/png']):
                    logger.error(f"Invalid file type: {path}")
                    return False
                # Optionally add integrity check if hash is available
                meta = metadata.extract_metadata(str(path))
                if not meta:
                    logger.error(f"Metadata extraction failed: {path}")
                    return False
            return all(check_permissions(path)["read"] for path in paths.values())
        except Exception as e:
            logger.error(f"Error validating media files for {video_id}: {str(e)}")
            return False

    def list_media(self, author_id: Optional[str] = None) -> List[Dict]:
        """List media records with resolved paths and permission info"""
        query = self.db.query("media")
        if author_id:
            query = query.filter_by(author_id=author_id)

        records = query.all()
        result = []

        for record in records:
            try:
                paths = self.get_media_paths(record.video_id)
                perms = {k: check_permissions(v) for k, v in paths.items()}
                result.append({
                    "video_id": record.video_id,
                    "author_id": record.author_id,
                    "title": record.title,
                    "description": record.description,
                    "video_path": str(paths["video"]),
                    "cover_path": str(paths["cover"]),
                    "exists": all(p["read"] for p in perms.values()),
                    "permissions": perms
                })
            except Exception as e:
                logger.error(f"Error processing media record {record.video_id}: {str(e)}")
                continue

        return result

    def get_media_details(self, video_id: str) -> Optional[Dict]:
        """Get detailed information about a media item, including permissions"""
        try:
            paths = self.get_media_paths(video_id)
            media_record = self.db.query("media").filter_by(video_id=video_id).first()
            
            if not media_record:
                return None

            perms = {k: check_permissions(v) for k, v in paths.items()}

            return {
                "video_id": media_record.video_id,
                "author_id": media_record.author_id,
                "title": media_record.title,
                "description": media_record.description,
                "video_path": str(paths["video"]),
                "cover_path": str(paths["cover"]),
                "exists": all(p["read"] for p in perms.values()),
                "permissions": perms,
                "relative_paths": {
                    "video": media_record.video_path,
                    "cover": media_record.cover_path
                }
            }
        except Exception as e:
            logger.error(f"Error getting media details for {video_id}: {str(e)}")
            return None

def get_media_list(db, skip=0, limit=20):
    service = MediaService(db)
    all_media = service.list_media()
    # Apply pagination
    return all_media[skip:skip+limit]

def get_media_detail(db, media_id):
    service = MediaService(db)
    # The API expects an integer ID, but the service expects video_id (likely a string)
    # If your DB uses int PKs, adjust accordingly. Here, we cast to str for compatibility.
    return service.get_media_details(str(media_id))