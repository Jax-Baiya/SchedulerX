from sqlalchemy import Column, String
from backend.api.database.base import Base

class Following(Base):
    __tablename__ = "following"
    user_id = Column(String, primary_key=True, index=True)
    following_id = Column(String, primary_key=True, index=True)
    created_at = Column(String)
