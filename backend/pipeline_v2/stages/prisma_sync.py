"""
🧬 Stage 6: Prisma Schema Sync
Initializes Prisma (if needed), pulls database schema, generates client, and launches Studio.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import subprocess
import logging
from pathlib import Path
from dotenv import dotenv_values

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def run_prisma_commands():
    # Set pipeline_root to backend/pipeline_v2
    pipeline_root = Path(__file__).resolve().parent.parent
    prisma_dir = pipeline_root / "prisma"
    schema_file = prisma_dir / "schema.prisma"

    try:
        # Step 1: Ensure prisma project is initialized
        if not prisma_dir.exists() or not schema_file.exists():
            logging.info("🧱 Initializing new Prisma project...")
            subprocess.run(["npx", "prisma", "init"], check=True, cwd=str(pipeline_root))
        else:
            logging.info("🗂️ Existing Prisma schema detected.")

        # Step 2: Pull schema from the DB
        logging.info("📥 Pulling DB schema with Prisma...")
        subprocess.run(["npx", "prisma", "db", "pull"], check=True, cwd=str(pipeline_root))

        # Step 3: Generate Prisma Client
        logging.info("⚙️ Generating Prisma Client...")
        subprocess.run(["npx", "prisma", "generate"], check=True, cwd=str(pipeline_root))

        # Step 4: Launch Studio (background for non-blocking, with .env loaded)
        logging.info("🧪 Launching Prisma Studio (background)...")
        env_vars = os.environ.copy()
        env_path = pipeline_root / ".env"
        if env_path.exists():
            env_vars.update(dotenv_values(env_path))
        # Launch studio with cwd=pipeline_root so prisma/ is used in the correct place
        subprocess.Popen([
            "npx", "prisma", "studio"
        ], cwd=str(pipeline_root), env=env_vars)


    except subprocess.CalledProcessError as e:
        logging.error(f"⚠️ Prisma sync failed: {e}")

def run():
    logging.info("🔧 Starting Prisma + PostgreSQL sync...")

    # Use prepare_pipeline_paths to set up output paths (for consistency)
    from utils import load_session, prepare_pipeline_paths
    session = load_session()
    prepare_pipeline_paths(session)

    pipeline_root = Path(__file__).resolve().parent.parent
    env_path = pipeline_root / ".env"
    env = dotenv_values(env_path)
    db_url = env.get("DATABASE_URL")

    if not db_url:
        logging.error("❌ DATABASE_URL not found in .env. Aborting.")
        return

    logging.info("✅ Found DATABASE_URL in .env -- continuing.")
    run_prisma_commands()

if __name__ == "__main__":
    run()