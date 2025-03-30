from pathlib import Path
import os
import subprocess
import logging
from utils import get_or_prompt

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

    db_user = get_or_prompt("db_user", "Enter database username", "john_doe")
    db_pass = get_or_prompt("db_password", "Enter database password", "password")
    db_name = get_or_prompt("db_name", "Enter database name", "database_name")
    db_schema = get_or_prompt("db_schema", "Enter schema name", "public")

    write_env_file(db_user, db_pass, db_name, db_schema)
    run_prisma_commands()

if __name__ == "__main__":
    main()
