from pydantic import BaseModel, Field, validator
from typing import List, Dict, Any, Optional
from datetime import datetime
import mimetypes
from pathlib import Path

class R2Error(Exception):
    """Base exception for R2 service errors"""
    pass

class R2ConnectionError(R2Error):
    """Raised when there are connection issues with R2"""
    pass

class R2UploadError(R2Error):
    """Raised when file upload fails"""
    pass

class R2ValidationError(R2Error):
    """Raised when file validation fails"""
    pass

class FileValidationConfig(BaseModel):
    """Configuration for file validation"""
    max_size_mb: int = Field(default=100, description="Maximum file size in MB")
    allowed_types: List[str] = Field(
        default=["image/jpeg", "image/png", "image/gif", "video/mp4"],
        description="Allowed MIME types"
    )
    allowed_extensions: List[str] = Field(
        default=[".jpg", ".jpeg", ".png", ".gif", ".mp4"],
        description="Allowed file extensions"
    )

class FileMetadata(BaseModel):
    """Metadata for a file in R2"""
    content_type: Optional[str] = Field(None, description="MIME type of the file")
    content_length: Optional[int] = Field(None, description="Size of the file in bytes")
    last_modified: Optional[datetime] = Field(None, description="Last modification time")
    metadata: Dict = Field(default_factory=dict, description="Custom metadata")
    etag: Optional[str] = Field(None, description="ETag of the file")
    
    @validator('content_type')
    def validate_content_type(cls, v):
        if v and not mimetypes.guess_extension(v):
            raise ValueError(f"Invalid content type: {v}")
        return v

class UploadResponse(BaseModel):
    """Response model for file uploads"""
    url: str = Field(..., description="URL of the uploaded file")
    key: str = Field(..., description="Key (filename) in the bucket")
    size: int = Field(..., description="Size of the uploaded file in bytes")
    content_type: str = Field(..., description="MIME type of the file")
    metadata: Dict = Field(default_factory=dict, description="Custom metadata")
    upload_time: datetime = Field(default_factory=datetime.utcnow)

class BatchUploadResponse(BaseModel):
    """Response model for batch uploads"""
    successful: List[UploadResponse] = Field(..., description="Successfully uploaded files")
    failed: List[Dict] = Field(..., description="Failed uploads with error details")
    total_files: int = Field(..., description="Total number of files processed")
    total_size: int = Field(..., description="Total size of uploaded files in bytes")

class PresignedUrlResponse(BaseModel):
    """Response model for presigned URLs"""
    url: str = Field(..., description="Presigned URL for temporary access")
    expires_at: datetime = Field(..., description="Expiration time of the URL")
    method: str = Field(..., description="HTTP method allowed with the URL")

class FileListResponse(BaseModel):
    """Response model for file listing"""
    files: List[FileMetadata] = Field(..., description="List of files")
    prefix: Optional[str] = Field(None, description="Prefix used for filtering")
    max_keys: int = Field(..., description="Maximum number of keys returned")
    is_truncated: bool = Field(..., description="Whether there are more files to list")
