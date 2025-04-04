from pathlib import Path
import os
import subprocess
import logging
from dotenv import dotenv_values
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import prompt_for_directory, save_session, smart_prompt, load_session, get_or_prompt

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def write_env_file(user, password, db, schema):
    env_content = f"""DATABASE_URL="postgresql://{user}:{password}@localhost:5432/{db}?schema={schema}"
"""
    with open(".env", "w") as f:
        f.write(env_content)
    logging.info("✅ .env file created or updated.")

def run_prisma_commands():
    try:
        if not Path("prisma").exists():
            logging.info("🧱 Initializing new Prisma project...")
            subprocess.run(["npx", "prisma", "init"], check=True)
        else:
            logging.info("🗂️ Existing Prisma project detected. Skipping 'prisma init'.")

        logging.info("📥 Pulling DB schema with Prisma...")
        subprocess.run(["npx", "prisma", "db", "pull"], check=True)

        # Studio command is now backgrounded to avoid blocking automation
        logging.info("🧪 Launching Prisma Studio (in background)...")
        subprocess.Popen(["npx", "prisma", "studio"])

    except subprocess.CalledProcessError as e:
        logging.error(f"⚠️ Prisma sync failed: {e}")

def main():
    logging.info("🔧 Starting Prisma + PostgreSQL sync...")

    # Read .env variables diretly
    env = dotenv_values(".env")
    db_url = env.get("DATABASE_URL")

    if not db_url:
        logging.error("❌ DATABASE_URL not found in .env. Aborting.")
        return
    
    logging.info("✅ Found DATABASE_URL in .env -- skipping manual input.")
    run_prisma_commands()

    run_prisma_commands()

if __name__ == "__main__":
    main()
