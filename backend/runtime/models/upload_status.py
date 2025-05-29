from sqlalchemy import Column, String, Text, DateTime, Integer, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class UploadStatus(Base):
    __tablename__ = "upload_status"

    id = Column(Integer, primary_key=True)
    video_id = Column(String, ForeignKey('media.video_id'))
    status = Column(String)  # pending, in_progress, completed, failed
    upload_timestamp = Column(DateTime, default=datetime.utcnow)
    r2_video_url = Column(Text)
    r2_cover_url = Column(Text)
    retry_count = Column(Integer, default=0)
    last_error = Column(Text)
