# Add bootstrap at the top
from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

from typing import List, Dict, Optional, Set
from datetime import datetime
from fastapi import HTTPException
import asyncio
import os
from pathlib import Path
import aiofiles
import aiofiles.os
from PIL import Image
import cv2
import json
import magic  # for MIME type detection

# Now these imports should work
from backend.pipeline_v2.utils.session_tools import get_session_data
from backend.pipeline_v2.utils.file_ops import ensure_dir, resolve_file_type
from shared.media_utils.validation import validate_file_size, validate_file_type, validate_file_integrity
from shared.media_utils.metadata import extract_metadata, validate_metadata
from sqlalchemy.orm import Session

class FileValidationError(HTTPException):
    """Custom exception for file validation errors"""
    def __init__(self, detail: str):
        super().__init__(status_code=400, detail=detail)

class R2UploadService:
    # File type configurations
    ALLOWED_VIDEO_EXTENSIONS = {'.mp4', '.mov', '.avi'}
    ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png'}
    ALLOWED_EXTENSIONS = ALLOWED_VIDEO_EXTENSIONS | ALLOWED_IMAGE_EXTENSIONS
    
    MAX_FILE_SIZE = 500 * 1024 * 1024  # 500MB
    MAX_TOTAL_SIZE = 2 * 1024 * 1024 * 1024  # 2GB
    MAX_VIDEO_DURATION = 600  # 10 minutes
    MIN_IMAGE_DIMENSION = 100  # pixels
    MAX_IMAGE_DIMENSION = 4096  # pixels

    def __init__(self, db: Session = None):
        self.session = get_session_data()
        self.db = db  # SQLAlchemy session for DB persistence

    def create_or_update_media_upload(self, file_path, destination, status, error_message=None, r2_url=None, mime_type=None, file_size=None, duration=None, width=None, height=None, media_metadata=None):
        """Create or update a MediaUpload record in the DB."""
        record = self.db.query(MediaUpload).filter_by(file_path=file_path, destination=destination).first()
        if not record:
            record = MediaUpload(
                file_path=file_path,
                destination=destination,
                status=status,
                error_message=error_message,
                r2_url=r2_url,
                mime_type=mime_type,
                file_size=file_size,
                duration=duration,
                width=width,
                height=height,
                metadata=media_metadata or {},
            )
            self.db.add(record)
        else:
            record.status = status
            record.error_message = error_message
            record.r2_url = r2_url
            record.mime_type = mime_type
            record.file_size = file_size
            record.duration = duration
            record.width = width
            record.height = height
            record.media_metadata = media_metadata or record.media_metadata
        self.db.commit()
        return record

    async def validate_files(self, files: List[str], destination: str) -> List[str]:
        """Comprehensive file validation with DB status tracking and metadata extraction."""
        validated = []
        total_size = 0
        for file in files:
            try:
                self.create_or_update_media_upload(file, destination, UploadState.VALIDATING)
                # Centralized validation
                if not validate_file_size(file, self.MAX_FILE_SIZE // (1024 * 1024)):
                    raise FileValidationError(f"File too large: {file}")
                if not validate_file_type(file, list(self.ALLOWED_EXTENSIONS)):
                    raise FileValidationError(f"Unsupported file type: {file}")
                # Optionally, add integrity check if hash is provided
                meta = extract_metadata(file)
                if not validate_metadata(meta, {"min_width": self.MIN_IMAGE_DIMENSION, "max_duration": self.MAX_VIDEO_DURATION}):
                    raise FileValidationError(f"Metadata constraints not met for {file}")
                # Update DB with extracted metadata and status
                self.create_or_update_media_upload(
                    file, destination, UploadState.VALIDATING, mime_type=meta.get("mime_type"), file_size=meta.get("file_size"), duration=meta.get("duration"), width=meta.get("width"), height=meta.get("height")
                )
                validated.append(str(file))
            except FileValidationError as e:
                self.create_or_update_media_upload(file, destination, UploadState.FAILED, error_message=str(e))
                raise
            except Exception as e:
                self.create_or_update_media_upload(file, destination, UploadState.FAILED, error_message=f"Validation failed: {str(e)}")
                raise FileValidationError(f"Validation failed for {file}: {str(e)}")
        return validated

    async def validate_video(self, file_path: str):
        """Validate video file integrity and properties"""
        try:
            cap = cv2.VideoCapture(file_path)
            if not cap.isOpened():
                raise FileValidationError(f"Cannot open video file: {file_path}")
            
            # Get video properties
            fps = cap.get(cv2.CAP_PROP_FPS)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            duration = frame_count / fps
            
            if duration > self.MAX_VIDEO_DURATION:
                raise FileValidationError(
                    f"Video duration ({duration:.1f}s) exceeds "
                    f"maximum allowed ({self.MAX_VIDEO_DURATION}s)"
                )
            
            # Check if video is readable
            ret, frame = cap.read()
            if not ret:
                raise FileValidationError(f"Video file is corrupted: {file_path}")
            
            cap.release()
            
        except FileValidationError:
            raise
        except Exception as e:
            raise FileValidationError(f"Video validation failed: {str(e)}")

    async def validate_image(self, file_path: str):
        """Validate image file integrity and properties"""
        try:
            with Image.open(file_path) as img:
                width, height = img.size
                
                if width < self.MIN_IMAGE_DIMENSION or height < self.MIN_IMAGE_DIMENSION:
                    raise FileValidationError(
                        f"Image dimensions ({width}x{height}) are too small. "
                        f"Minimum size: {self.MIN_IMAGE_DIMENSION}x{self.MIN_IMAGE_DIMENSION}"
                    )
                
                if width > self.MAX_IMAGE_DIMENSION or height > self.MAX_IMAGE_DIMENSION:
                    raise FileValidationError(
                        f"Image dimensions ({width}x{height}) are too large. "
                        f"Maximum size: {self.MAX_IMAGE_DIMENSION}x{self.MAX_IMAGE_DIMENSION}"
                    )
                
                # Verify image can be loaded
                img.load()
                
        except FileValidationError:
            raise
        except Exception as e:
            raise FileValidationError(f"Image validation failed: {str(e)}")

    def validate_metadata(self, metadata: Optional[Dict]) -> Dict:
        """Validate and sanitize upload metadata"""
        if not metadata:
            return {}
            
        required_fields = {'title', 'description'}
        missing_fields = required_fields - set(metadata.keys())
        if missing_fields:
            raise FileValidationError(
                f"Missing required metadata fields: {', '.join(missing_fields)}"
            )
            
        # Sanitize and validate values
        sanitized = {}
        for key, value in metadata.items():
            # Convert to string and limit length
            if isinstance(value, (str, int, float, bool)):
                sanitized[key] = str(value)[:1000]  # Limit string length
            elif isinstance(value, (list, dict)):
                # Allow JSON-serializable data with depth limit
                try:
                    json_str = json.dumps(value)
                    if len(json_str) > 5000:  # Limit JSON length
                        raise FileValidationError(
                            f"Metadata value too large for field: {key}"
                        )
                    sanitized[key] = value
                except (TypeError, ValueError):
                    raise FileValidationError(
                        f"Invalid metadata value for field: {key}"
                    )
            else:
                raise FileValidationError(
                    f"Unsupported metadata type for field: {key}"
                )
                
        return sanitized
        
    async def upload_file_task(self, file: str, destination: str, metadata: Optional[Dict] = None):
        """Handle validation and upload for a single file, with DB progress tracking."""
        try:
            # Validate file and extract metadata
            await self.validate_files([file], destination)
            self.create_or_update_media_upload(file, destination, UploadState.UPLOADING)
            # Prepare upload context for a single file
            upload_context = {
                "files": [file],
                "destination": destination,
                "metadata": metadata or {},
                "timestamp": datetime.utcnow()
            }
            # Run pipeline upload for this file
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(None, pipeline_upload, upload_context)
            # Update DB with completed status and R2 URL
            self.create_or_update_media_upload(
                file, destination, UploadState.COMPLETED, r2_url=result["urls"][0] if result.get("urls") else None
            )
            return {"file": file, "status": "completed", "r2_url": result.get("urls", [None])[0]}
        except Exception as e:
            self.create_or_update_media_upload(file, destination, UploadState.FAILED, error_message=str(e))
            return {"file": file, "status": "failed", "error": str(e)}

    async def upload_files(
        self,
        files: List[str],
        destination: str,
        metadata: Optional[Dict] = None
    ) -> Dict:
        """
        Batch and parallel upload support with progress tracking.
        """
        try:
            # Validate all files first (will update DB with VALIDATING/FAILED)
            await self.validate_files(files, destination)
            # Parallel upload tasks
            tasks = [self.upload_file_task(file, destination, metadata) for file in files]
            results = await asyncio.gather(*tasks, return_exceptions=True)
            # Collate results
            uploaded_files = [r["file"] for r in results if r.get("status") == "completed"]
            r2_urls = [r.get("r2_url") for r in results if r.get("status") == "completed"]
            errors = [r for r in results if r.get("status") == "failed"]
            return {
                "success": len(errors) == 0,
                "uploaded_files": uploaded_files,
                "r2_urls": r2_urls,
                "errors": errors,
                "timestamp": datetime.utcnow()
            }
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Batch upload failed: {str(e)}"
            )

    async def update_session_metadata(self, upload_result: Dict):
        """Update session.json with upload metadata"""
        session_data = self.session.get_data()
        session_data["uploads"] = session_data.get("uploads", [])
        session_data["uploads"].append(upload_result)
        self.session.save_data(session_data)
