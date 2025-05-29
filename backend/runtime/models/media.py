# runtime/models/media.py

from sqlalchemy import Column, String, Text, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Media(Base):
    __tablename__ = "media"

    video_id = Column(String, primary_key=True)
    author_id = Column(String)
    video_path = Column(Text)
    cover_path = Column(Text)
    title = Column(String)
    description = Column(Text)
    tags = Column(String)
    
    # New fields for upload tracking
    # upload_status = Column(String, default="pending")
    # upload_timestamp = Column(DateTime)
    # r2_video_url = Column(Text)
    # r2_cover_url = Column(Text)
    # retry_count = Column(Integer, default=0)
    # last_error = Column(Text)
