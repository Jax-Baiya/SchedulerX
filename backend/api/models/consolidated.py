from sqlalchemy import Column, String
from backend.api.database.base import Base

class Consolidated(Base):
    __tablename__ = "consolidated"
    id = Column(String, primary_key=True, index=True)
    data = Column(String)
    created_at = Column(String)
