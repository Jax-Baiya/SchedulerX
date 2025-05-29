from sqlalchemy import Column, String, Integer, ForeignKey, JSON
from .base import BaseModel

class UploadStatus(BaseModel):
    __tablename__ = "upload_status"
    
    media_id = Column(Integer, ForeignKey("media.id"))
    r2_url = Column(String)
    upload_metadata = Column(JSON)
    status = Column(String)
    error_message = Column(String, nullable=True)
