# runtime/core/db_access.py

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path
from dotenv import load_dotenv
import logging
from models.media import Media, Base

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_database_url():
    """Get database URL with proper error handling"""
    # Try multiple .env locations
    env_locations = [
        Path(__file__).parent.parent.parent / "pipeline_v2" / ".env",  # SchedulerX/pipeline_v2/.env
        Path(__file__).parent.parent / ".env",  # SchedulerX/backend/runtime/.env
        Path.cwd() / ".env"  # Current directory
    ]
    
    for env_path in env_locations:
        if env_path.exists():
            logger.info(f"[✓] Found .env at: {env_path}")
            load_dotenv(dotenv_path=env_path)
            break
    else:
        logger.error("[❌] No .env file found in any of the expected locations!")
        for loc in env_locations:
            logger.error(f"  - Tried: {loc}")
        raise FileNotFoundError("No .env file found")

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL not found in environment variables")
    
    return database_url

# Initialize database connection
try:
    DATABASE_URL = get_database_url()
    engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    logger.info("[✓] Database connection initialized")
except Exception as e:
    logger.error(f"[❌] Failed to initialize database: {str(e)}")
    raise

def init_db():
    """Initialize database tables"""
    try:
    Base.metadata.create_all(bind=engine)
        logger.info("[✓] Database tables created")
    except Exception as e:
        logger.error(f"[❌] Failed to create tables: {str(e)}")
        raise

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_media_items(limit: int = None):
    """Get all media items"""
    db = next(get_db())
    try:
        query = db.query(Media)
        if limit:
            query = query.limit(limit)
        return query.all()
    finally:
        db.close()

def get_first_media_item():
    """Get first media item"""
    db = next(get_db())
    try:
        return db.query(Media).first()
    finally:
        db.close()

# Example standalone run
if __name__ == "__main__":
    init_db()
    media_records = get_media_items()
    print(f"[Fetched] {len(media_records)} media records.")
