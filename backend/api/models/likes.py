from sqlalchemy import Column, String
from backend.api.database.base import Base

class Like(Base):
    __tablename__ = "likes"
    like_id = Column(String, primary_key=True, index=True)
    user_id = Column(String)
    media_id = Column(String)
    created_at = Column(String)
