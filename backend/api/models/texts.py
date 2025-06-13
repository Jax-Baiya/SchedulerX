from sqlalchemy import Column, String
from backend.api.database.base import Base

class Text(Base):
    __tablename__ = "texts"
    text_id = Column(String, primary_key=True, index=True)
    content = Column(String)
    author_id = Column(String)
    created_at = Column(String)
