"""
📦 SchedulerX: Config Module
This module loads environment-driven runtime settings and defines global toggles for pipeline_v2.
"""

import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root
dotenv_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path)

# 🔁 Execution Mode: auto or step
RUN_MODE = os.getenv("RUN_MODE", "step")

# 🗂️ Source Directory Profile: default or custom
SRC_PROFILE = os.getenv("SRC_PROFILE", "default")

# 🛢️ Database Profile: local, supabase_session, supabase_transaction
DB_PROFILE = os.getenv("DB_PROFILE", "local")

# 🔌 Enabled Feature Plugins
ENABLED_FEATURES = [
    # "upload_to_r2",  # Removed: now handled by backend/api
    "auto_tagging",
    "analytics",
]

# 🧾 Logging Level: info, debug, warning, error
LOG_LEVEL = os.getenv("LOG_LEVEL", "info")

# 📁 Optional Default Paths
DEFAULT_SRC_DIR = "/home/An_Xing/Downloads/tiktok_data"
DEFAULT_DEST_DIR = "assets"
