from sqlalchemy import Column, Integer, String, DateTime, Float, Enum, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum as PyEnum
from .base import BaseModel

class UploadState(PyEnum):
    PENDING = "pending"
    VALIDATING = "validating"
    UPLOADING = "uploading"
    COMPLETED = "completed"
    FAILED = "failed"

class MediaUpload(BaseModel):
    __tablename__ = "media_uploads"

    file_path = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    status = Column(Enum(UploadState), default=UploadState.PENDING, nullable=False)
    error_message = Column(String, nullable=True)
    r2_url = Column(String, nullable=True)
    # Media properties
    mime_type = Column(String, nullable=True)
    file_size = Column(Integer, nullable=True)
    duration = Column(Float, nullable=True)  # For video
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    # WARNING: Do not use 'metadata' as a column name (reserved by SQLAlchemy)
    media_metadata = Column(JSON, nullable=True)  # Renamed from 'metadata'
    timestamp = Column(DateTime, default=datetime.utcnow)
