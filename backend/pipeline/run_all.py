import logging
import os
import sys
import subprocess
from datetime import datetime

# Ensure utils is imported from backend/utils
UTILS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils'))
sys.path.append(UTILS_PATH)
from utils import get_or_prompt, load_session, save_session, write_env, move_logs_and_session, print_stage_header

# Set up logging
LOG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs'))
os.makedirs(LOG_DIR, exist_ok=True)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PIPELINE_DIR = os.path.join(PROJECT_ROOT, "pipeline")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename=os.path.join(LOG_DIR, "master_log.log"),
    filemode="w"
)

def run_script(script_name):
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    try:
        subprocess.run(["python3", script_path], check=True)
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"❌ Error running {script_name}: {e}")
        return False
    
STAGES = [
    ("0copy_appdata.py", "Copy Raw Data"),
    ("1generate_md.py", "Generate Markdown"),
    ("2decode.py", "Decode Sections"),
    ("3xlsx.py", "Generate Excel Files"),
    ("4append_consolidated.py", "Append Consolidated Sheet"),
    ("5import_db.py", "Import to Database")
]

def select_db_setup():
    print("\nChoose your database setup:")
    print("  [1] Localhost (dev/testing)")
    print("  [2] Supabase / Remote PostgreSQL")
    choice = input("Enter 1 or 2 (Default: 1): ").strip()
    return "remote" if choice == "2" else "local"

def setup_environment():
    print_stage_header("SchedulerX DB Setup")
    session = load_session()

    env_path = os.path.join(PROJECT_ROOT, ".env")
    if os.path.exists(env_path):
        print("✅ Existing .env file found.")
        return session

    print("❌ .env not found. Creating new environment setup...")
    db_type = select_db_setup()

    if db_type == "remote":
        session["DB_TYPE"] = "remote"
        session["DB_USER"] = get_or_prompt("DB_USER", "Remote DB Username", "postgres")
        session["DB_PASSWORD"] = get_or_prompt("DB_PASSWORD", "Remote DB Password", "password")
        session["DB_HOST"] = get_or_prompt("DB_HOST", "Remote DB Host", "your.pooler.supabase.com")
        
        # Pooler-specific logic
        if "pooler.supabase.com" in session["DB_HOST"]:
            session["PROJECT_REF"] = get_or_prompt("PROJECT_REF", "Supabase Project Ref", "xxxxxxxxxxxxxxxxxxxx")
            pooler_choice = get_or_prompt("POOLER_TYPE", "Choose pooler type: [1] Transaction, [2] Session", "2")
            if pooler_choice == "1":
                session["DB_PORT"] = "6543"
                session["POOLER_TYPE"] = "transaction"
            else:
                session["DB_PORT"] = "5432"
                session["POOLER_TYPE"] = "session"
            session["DB_NAME"] = "postgres"
        else:
            session["DB_PORT"] = get_or_prompt("DB_PORT", "Remote DB Port", "5432")
            session["DB_NAME"] = get_or_prompt("DB_NAME", "Remote DB Name", "postgres")

        session["DB_SCHEMA"] = get_or_prompt("DB_SCHEMA", "DB Schema", "public")
    else:
        print("\nSelected: Local PostgreSQL setup.\n")
        session["DB_USER"] = get_or_prompt("DB_USER", "DB_USER", "postgres")
        session["DB_PASSWORD"] = get_or_prompt("DB_PASSWORD", "DB_PASSWORD", "password")
        session["DB_HOST"] = "localhost"
        session["DB_PORT"] = "5432"
        session["DB_NAME"] = get_or_prompt("DB_NAME", "DB_NAME", "schedulerx_db")
        session["DB_SCHEMA"] = get_or_prompt("DB_SCHEMA", "DB_SCHEMA", "public")

    write_env(session, dict)
    return session

def run_pipeline():
    print_stage_header("SchedulerX Master Pipeline")
    for stage_file, desc in STAGES:
        print(f"Running Stage {STAGES.index((stage_file, desc)) + 1}: {stage_file}")
        try:
            subprocess.run(["python3", os.path.join(PIPELINE_DIR, stage_file)], check=True)
        except subprocess.CalledProcessError as e:
            print(f"Stage {STAGES.index((stage_file, desc)) + 1} failed. Aborting execution.")
            break
    try:
        subprocess.run(["python3", os.path.join(PIPELINE_DIR, "cleanup.py")], check=True)
    except Exception as e:
        print(f"⚠️ Cleanup skipped: {e}")
    print("Master controller script execution completed. Check logs/master_log.log for details.")

if __name__ == "__main__":
    setup_environment()
    run_pipeline()