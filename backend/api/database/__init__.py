from .base import Database, Base
from .utils import DatabaseManager
from .models import media, upload
from backend.api.config import settings

__all__ = [
    'Database',
    'Base',
    'DatabaseManager',
    'media',
    'upload',
    'SessionLocal'
]

db_instance = Database(settings.DATABASE_URL)
db_instance.init_db()
SessionLocal = db_instance.SessionLocal

def init_database(database_url: str) -> Database:
    db = Database(database_url)
    db.init_db()
    return db

def get_db_manager(database_url: str) -> DatabaseManager:
    db = init_database(database_url)
    return DatabaseManager(db)
