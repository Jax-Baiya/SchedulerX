from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from .base import BaseModel
import enum

class MediaType(enum.Enum):
    VIDEO = "video"
    IMAGE = "image"

class Media(BaseModel):
    __tablename__ = "media"
    
    video_id = Column(String, unique=True, index=True)
    author_id = Column(String, index=True)
    title = Column(String)
    description = Column(String)
    video_path = Column(String)
    cover_path = Column(String)
    media_type = Column(Enum(MediaType))
    status = Column(String)
