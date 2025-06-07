from .base import Database, Base
from .utils import DatabaseManager
from .models import media, upload
from backend.api.config import settings

__all__ = [
    'Database',
    'Base',
    'DatabaseManager',
    'media',
    'upload'
]

# Remove all eager DB connection/init at import time.
# Only provide lazy init functions. Do not import or create SessionLocal here.

def init_database(database_url: str) -> Database:
    db = Database(database_url)
    db.init_db()
    return db

def get_db_manager(database_url: str) -> DatabaseManager:
    db = init_database(database_url)
    return DatabaseManager(db)
