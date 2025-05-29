# runtime/core/config_loader.py

import os
from dotenv import load_dotenv
from pathlib import Path

class Config:
    def __init__(self, env_path: Path = None):
        self.env_path = env_path or Path(__file__).parent.parent / ".env"
        self._load()

    def _load(self):
        load_dotenv(dotenv_path=self.env_path)
        self.LOCAL_MEDIA_DIR = os.getenv("LOCAL_MEDIA_DIR")
        self.R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME")
        self.R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
        self.R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
        self.R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
        self.PINTEREST_ACCESS_TOKEN = os.getenv("PINTEREST_ACCESS_TOKEN")
        self.PINTEREST_CLIENT_ID = os.getenv("PINTEREST_CLIENT_ID")
        self.DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///media.db"

    def debug_print(self):
        print(f"[ENV] LOCAL_MEDIA_DIR: {self.LOCAL_MEDIA_DIR}")
        print(f"[ENV] R2_BUCKET_NAME: {self.R2_BUCKET_NAME}")
        print(f"[ENV] DATABASE_URL: {self.DATABASE_URL}")

# Example Usage
if __name__ == "__main__":
    config = Config()
    config.debug_print()
