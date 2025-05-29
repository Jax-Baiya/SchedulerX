from sqlalchemy import Column, Integer, String, DateTime, Enum, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum as PyEnum
from backend.api.database.base import Base

class PostStatus(PyEnum):
    PENDING = "pending"
    PROCESSING = "processing"
    POSTED = "posted"
    FAILED = "failed"

class ScheduledPost(Base):
    __tablename__ = "scheduled_posts"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, nullable=False)  # e.g., 'pinterest', 'tiktok', etc.
    media_path = Column(String, nullable=False)
    caption = Column(String, nullable=True)
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(Enum(PostStatus), default=PostStatus.PENDING, nullable=False)
    result = Column(JSON, nullable=True)  # Store API response or error
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Optionally, add user_id or account_id for multi-user support
