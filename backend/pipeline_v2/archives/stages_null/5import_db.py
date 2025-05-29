import os
import pandas as pd
import logging
from sqlalchemy import create_engine, Table, Column, MetaData, String, Boolean
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import sys
from pathlib import Path

# Extend path to use shared utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import load_session, normalize_dataframe, prompt_for_directory, save_session, smart_prompt,  get_or_prompt
# <- Reuse utility function if centralized

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
# 📦 Load Environment + Session
# ───────────────────────────────────────────────
load_dotenv()
session = load_session()

raw_url = session.get("DATABASE_URL") or os.getenv("DATABASE_URL")
if not raw_url:
    raise RuntimeError("❌ DATABASE_URL not found in session or environment.")

host = session.get("DB_HOST", "")
db_type = session.get("DB_TYPE", "local")

# For Supabase Pooler, use raw URL as-is
if "pooler.supabase.com" in host:
    db_url = raw_url
else:
    # Strip ?schema=... for local/dev
    db_url = raw_url.split("?")[0]

print(f"📡 Using DB connection: {db_url}")


EXCEL_FILE = session.get("xlsx_file", "assets/xlsx_files/data.xlsx")
DB_SCHEMA = session.get("DB_SCHEMA", "public")

# ───────────────────────────────────────────────
# 🛠️ Define SQLAlchemy Engine + Metadata
# ───────────────────────────────────────────────
def create_engine_and_metadata():
    engine = create_engine(db_url)
    metadata = MetaData(schema=DB_SCHEMA)
    return engine, metadata

# ───────────────────────────────────────────────
# 🧱 Table Definitions
# Needs to be updated with an import of the table definitions from the core package
# ───────────────────────────────────────────────
def define_tables(metadata):
    return {
        "videos": Table("videos", metadata,
            Column('videos_id', String, primary_key=True),
            Column('videos_authorid', String),
            Column('videos_createtime', String),
            Column('videos_diggcount', String),
            Column('videos_playcount', String),
            Column('videos_audioid', String),
            Column('videos_size', String),
            Column('videos_itemmute', String),
        ),
        "authors": Table("authors", metadata,
            Column("authors_id", String, primary_key=True),
            Column("authors_uniqueids", String),
            Column("authors_nicknames", String),
            Column("authors_followercount", String),
            Column("authors_heartcount", String),
            Column("authors_videocount", String),
            Column("authors_signature", String),
            Column("authors_privateaccount", Boolean)
        ),
        "texts": Table("texts", metadata,
            Column("texts_text_id", String, primary_key=True),
            Column("texts_text_content", String)
        ),
        "likes": Table("likes", metadata,
            Column("likes_schemaversion", String),
            Column("likes_user", String, primary_key=True),
            Column("likes_likes", String)
        ),
        "bookmarks": Table("bookmarks", metadata,
            Column("bookmarks_officiallist", String, primary_key=True),
            Column("bookmarks_downloaded", String),
            Column("bookmarks_total", String),
            Column("bookmarks_numdisappeared", String),
            Column("bookmarks_lastrun", String)
        ),
        "following": Table("following", metadata,
            Column("following_author_id", String, primary_key=True),
            Column("following_official", Boolean),
            Column("following_started", Boolean),
            Column("following_not_interested", Boolean),
            Column("following_infolder", String),
            Column("following_disappeared", String),
            Column("following_last_run_start", String),
            Column("following_last_run_finish", String),
            Column("following_last_run_bottom", String),
            Column("following_last_run_firstadded", String)
        ),
        "consolidated": Table("consolidated", metadata,
            Column("c_videos_id", String, primary_key=True),
            Column("c_videos_authorid", String),
            Column("c_videos_audioid", String),
            Column("c_authors_id", String),
            Column("c_authors_nicknames", String),
            Column("c_authors_uniqueids", String),
            Column("c_texts_text_content", String)
        )
    }

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
def main():
    if not os.path.exists(EXCEL_FILE):
        logging.error(f"❌ Excel file not found: {EXCEL_FILE}")
        return

    engine, metadata = create_engine_and_metadata()
    tables = define_tables(metadata)
    metadata.create_all(engine, checkfirst=True)

    xls = pd.ExcelFile(EXCEL_FILE)
    for sheet in xls.sheet_names:
        sheet_clean = sheet.strip().lower()
        table_key = next((key for key in tables if key.lower() == sheet_clean), None)
        if not table_key:
            logging.warning(f"⚠️ No matching table for sheet '{sheet}', skipping.")
            continue

        df = pd.read_excel(xls, sheet_name=sheet)
        df = normalize_dataframe(df)
        insert_data(engine, tables[table_key], df)

    logging.info("🎉 All applicable sheets imported successfully.")

    # Call Prisma sync
    pipeline_dir = Path(__file__).parent
    prisma_sync_script = pipeline_dir / "6prisma_sync.py"
    os.system(f"python3 {prisma_sync_script}")

if __name__ == "__main__":
    main()
