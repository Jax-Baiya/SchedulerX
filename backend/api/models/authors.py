from sqlalchemy import Column, String, Integer, Boolean
from backend.api.database.base import Base

class Author(Base):
    __tablename__ = "authors"
    author_id = Column(String, primary_key=True, index=True)
    unique_id = Column(String, index=True)
    nickname = Column(String)
    follower_count = Column(Integer)
    heart_count = Column(Integer)
    video_count = Column(Integer)
    signature = Column(String)
    private_account = Column(Boolean)
