from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from .config import settings
import logging
from pathlib import Path
from .services.r2_service import R2Service
from .services.r2_uploader import R2UploadService
from typing import Iterator

# Database setup
try:
    engine = create_engine(settings.DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    SessionLocal = None
    logging.warning(f"SessionLocal not initialized: {e}")

def get_db() -> Iterator[Session]:
    if SessionLocal is None:
        raise RuntimeError("SessionLocal is not initialized.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Logging setup
def setup_logging():
    log_level = getattr(logging, settings.LOG_LEVEL.upper())
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        filename=settings.LOG_FILE
    )
    return logging.getLogger(__name__)

logger = setup_logging()

# Pipeline dependencies
def get_pipeline_path() -> Path:
    return settings.PIPELINE_V2_PATH

def get_runtime_path() -> Path:
    return settings.RUNTIME_PATH 

def get_r2_service() -> R2Service:
    """
    Dependency for R2 service
    """
    return R2Service()

def get_upload_service() -> R2UploadService:
    """
    Dependency for R2 upload service
    """
    return R2UploadService()