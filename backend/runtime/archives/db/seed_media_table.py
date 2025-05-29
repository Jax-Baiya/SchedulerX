# backend/runtime/seed_media_table.py

import os
from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

# Constants
DB_URL = os.getenv("DATABASE_URL") or "sqlite:///../pipeline_v2/assets/xlsx_files/media.db"
EXCEL_PATH = Path(__file__).parent / "../pipeline_v2/assets/xlsx_files/data.xlsx"
LOCAL_MEDIA_DIR = Path(os.getenv("LOCAL_MEDIA_DIR", "/mnt/c/Users/jaxba/AlexNova/data/Following"))

# Connect to DB
engine = create_engine(DB_URL)
metadata = MetaData()
metadata.reflect(bind=engine)

# Load Media Table
media_table = metadata.tables.get('media')
if media_table is None:
    raise Exception("[❌] 'media' table does not exist. Did you run define_tables(engine)?")

# Read consolidated sheet
df = pd.read_excel(EXCEL_PATH, sheet_name="consolidated")

# Prepare insertion
insert_values = []

for idx, row in df.iterrows():
    video_id = str(row["c_videos_id"])
    author_id = str(row["c_videos_authorid"])

    video_path = LOCAL_MEDIA_DIR / author_id / "videos" / f"{video_id}.mp4"
    cover_path = LOCAL_MEDIA_DIR / author_id / "covers" / f"{video_id}.jpg"

    record = {
        "author_id": author_id,
        "video_id": video_id,
        "video_path": str(video_path),
        "cover_path": str(cover_path),
        "title": row.get("c_authors_uniqueids", "Unknown"),
        "description": row.get("c_texts_text_content", ""),
        "tags": "",  # Future enhancement
    }
    insert_values.append(record)

# Insert into DB
with engine.begin() as conn:
    conn.execute(media_table.insert(), insert_values)

print(f"[✅] Successfully inserted {len(insert_values)} media records into the database.")
