from sqlalchemy import Column, String
from backend.api.database.base import Base

class UploadStatus(Base):
    __tablename__ = "upload_status"
    __table_args__ = {'extend_existing': True}
    id = Column(String, primary_key=True, index=True)
    status = Column(String)
    created_at = Column(String)
