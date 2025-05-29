from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UploadRequest(BaseModel):
    files: List[str]  # List of file paths or IDs from session
    destination: str  # R2 bucket/folder destination
    metadata: Optional[dict] = None  # Additional metadata
    
class UploadResponse(BaseModel):
    success: bool
    uploaded_files: List[str]
    r2_urls: List[str]
    metadata: dict
    timestamp: datetime
