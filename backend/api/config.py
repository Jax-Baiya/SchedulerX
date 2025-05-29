from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional
import os
from pathlib import Path
from dotenv import load_dotenv
import json

# Load environment variables from .env file
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "SchedulerX"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    DEBUG: bool = False
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_SECRET_KEY: str = "supersecretjwtkey"  # Add a default for dev/testing
    JWT_ALGORITHM: str = "HS256"
    
    # R2 Storage
    R2_ACCOUNT_ID: str
    R2_ACCESS_KEY_ID: str
    R2_SECRET_ACCESS_KEY: str
    R2_BUCKET_NAME: str
    R2_ENDPOINT: Optional[str] = None
    
    # Local Storage
    LOCAL_MEDIA_DIR: Optional[Path] = None
    
    # Pipeline Settings
    PIPELINE_V2_PATH: Path = Path(__file__).parent.parent / "pipeline_v2"
    RUNTIME_PATH: Path = Path(__file__).parent.parent / "runtime"
    
    # Pinterest API
    PINTEREST_ACCESS_TOKEN: Optional[str] = None
    PINTEREST_CLIENT_ID: Optional[str] = None
    PINTEREST_CLIENT_SECRET: Optional[str] = None
    
    # TikTok API
    TIKTOK_ACCESS_TOKEN: Optional[str] = None
    
    # Database
    DATABASE_URL: Optional[str] = None
    
    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: Optional[str] = "logs/schedulerx.log"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    def __init__(self, **values):
        # --- Load DATABASE_URL from pipeline_v2/.env ---
        pipeline_env_path = Path(__file__).parent.parent / "pipeline_v2" / ".env"
        if pipeline_env_path.exists():
            load_dotenv(dotenv_path=pipeline_env_path, override=True)
            db_url = os.getenv("DATABASE_URL")
            if db_url:
                values["DATABASE_URL"] = db_url

        # --- Load LOCAL_MEDIA_DIR from session.json ---
        session_json_path = Path(__file__).parent.parent / "pipeline_v2" / "session" / "session.json"
        if session_json_path.exists():
            with open(session_json_path, "r") as f:
                session_data = json.load(f)
                src_path = session_data.get("selected_source_path")
                if src_path:
                    # Append 'Following' to the path
                    media_dir = Path(src_path) / "Following"
                    values["LOCAL_MEDIA_DIR"] = media_dir

        super().__init__(**values)
        self.validate_paths()

    def validate_paths(self) -> None:
        """Validate that all required paths exist"""
        # Convert string paths to Path objects if needed
        if isinstance(self.LOCAL_MEDIA_DIR, str):
            self.LOCAL_MEDIA_DIR = Path(self.LOCAL_MEDIA_DIR)
            
        # Ensure paths exist
        if not self.LOCAL_MEDIA_DIR.exists():
            raise ValueError(f"LOCAL_MEDIA_DIR does not exist: {self.LOCAL_MEDIA_DIR}")
            
        if not self.PIPELINE_V2_PATH.exists():
            raise ValueError(f"PIPELINE_V2_PATH does not exist: {self.PIPELINE_V2_PATH}")
            
        if not self.RUNTIME_PATH.exists():
            raise ValueError(f"RUNTIME_PATH does not exist: {self.RUNTIME_PATH}")
            
        # Create log directory if it doesn't exist
        if self.LOG_FILE:
            log_dir = Path(self.LOG_FILE).parent
            log_dir.mkdir(parents=True, exist_ok=True)

@lru_cache()
def get_settings() -> Settings:
    settings = Settings()
    settings.validate_paths()
    return settings

# Global settings instance
settings = get_settings()