"""
🛢️ Stage 5: Import Excel Sheets into PostgreSQL
Reads Excel sheets, normalizes, and inserts them into a PostgreSQL database using SQLAlchemy.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import pandas as pd
import logging
from sqlalchemy import create_engine, Table, Column, MetaData, String, Boolean
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
from pathlib import Path

from shared.media_utils import validation, metadata
from core.table_definitions import define_tables
from seeders.media_seeder import seed_media_table
from utils import prepare_pipeline_paths, load_session, normalize_dataframe, save_session

# ───────────────────────────────────────────────
# 🔧 Logging Configuration
# ───────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    filename="import_db.log",
    filemode="w"
)

# ───────────────────────────────────────────────
# 🛠️ Define SQLAlchemy Engine + Metadata
# ───────────────────────────────────────────────
def create_engine_and_metadata(db_url, schema):
    engine = create_engine(db_url)
    metadata = MetaData(schema=schema)
    return engine, metadata

# ───────────────────────────────────────────────
# ⬇️ Insert Data Into Tables
# ───────────────────────────────────────────────
def insert_data(engine, table, df):
    if df.empty:
        logging.warning(f"⚠️ Skipping empty DataFrame for table '{table.name}'")
        return
    try:
        with engine.begin() as conn:
            stmt = pg_insert(table).values(df.to_dict(orient="records"))
            conn.execute(stmt)
            logging.info(f"✅ Inserted {len(df)} rows into table '{table.name}'")
    except SQLAlchemyError as e:
        logging.error(f"❌ Failed to insert into '{table.name}': {e}")

# ───────────────────────────────────────────────
# 🚀 Main Importer Logic
# ───────────────────────────────────────────────
def run():
    # Load environment and session here instead
    load_dotenv()
    session = load_session()

    # Use prepare_pipeline_paths to set up output paths
    prepare_pipeline_paths(session)

    # --- PATCH: Force session DATABASE_URL to match .env if .env is set to a real DB ---
    env_url = os.getenv("DATABASE_URL")
    if env_url and not (env_url.startswith("sqlite:") or "/tmp/" in env_url):
        session["DATABASE_URL"] = env_url
        save_session(session)

    raw_url = session.get("DATABASE_URL") or os.getenv("DATABASE_URL")
    if not raw_url:
        raise RuntimeError("❌ DATABASE_URL not found in session or environment.")

    # Prevent use of SQLite or test DB
    if raw_url.startswith("sqlite:") or "/tmp/" in raw_url:
        raise RuntimeError(f"❌ Refusing to use test/SQLite DB: {raw_url}\nPlease set a real DATABASE_URL in your .env and session.")

    # Always use the raw URL from .env for Supabase connections
    db_url = raw_url

    print(f"📡 Using DB connection: {db_url}")

    EXCEL_FILE = session.get("xlsx_file")
    DB_SCHEMA = session.get("DB_SCHEMA", "public")

    if not os.path.exists(EXCEL_FILE):
        logging.error(f"❌ Excel file not found: {EXCEL_FILE}")
        return

    engine, metadata = create_engine_and_metadata(db_url, DB_SCHEMA)
    tables = define_tables(metadata)
    metadata.create_all(engine, checkfirst=True)


    xls = pd.ExcelFile(EXCEL_FILE, engine='openpyxl')
    for sheet in xls.sheet_names:
        sheet_clean = sheet.strip().lower()
        table_key = next((key for key in tables if key.lower() == sheet_clean), None)
        if not table_key:
            logging.warning(f"⚠️ No matching table for sheet '{sheet}', skipping.")
            continue
        df = pd.read_excel(xls, sheet_name=sheet, engine='openpyxl')
        # Enforce shared validation/metadata for videos
        if sheet_clean == "videos" and 'file_path' in df.columns:
            for idx, row in df.iterrows():
                file_path = row.get('file_path')

        df = normalize_dataframe(df)
        insert_data(engine, tables[table_key], df)

    # Seed Media Table
    seed_media_table(engine)

    logging.info("🎉 All applicable sheets imported successfully.")

    # Call Prisma sync
    # os.system("python3 -m stages.prisma_sync")
    # Commented out to prevent duplicate Prisma Studio launch

if __name__ == "__main__":
    run()