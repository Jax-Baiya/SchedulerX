from sqlalchemy import Column, String, Integer
from backend.api.database.base import Base

class Video(Base):
    __tablename__ = "videos"
    video_id = Column(String, primary_key=True, index=True)
    author_id = Column(String, index=True)
    video_path = Column(String)
    cover_path = Column(String)
    title = Column(String)
    description = Column(String)
    tags = Column(String)
    upload_status = Column(String)
