# pipeline_v2/seeders/media_seeder.py

import pandas as pd
from pathlib import Path
from sqlalchemy import MetaData
import logging

def seed_media_table(engine):
    """
    Seeds the media table using data from the consolidated Excel sheet.
    Uses the engine provided by the pipeline.
    """
    logging.info("[Seeder] Starting Media Table Seeding...")

    # Use the engine's metadata
    metadata = MetaData()
    metadata.reflect(bind=engine)
    media_table = metadata.tables.get('media')

    if media_table is None:
        raise Exception("[❌] 'media' table does not exist! Make sure define_tables() was called.")

    # Use the Excel file path from the pipeline session
    from utils import load_session
    session = load_session()
    
    # Get paths from session
    excel_path = Path(session.get('xlsx_file'))
    if not excel_path:
        raise ValueError("[❌] xlsx_file not found in session!")
        
    local_media_dir = Path(session.get('src_root'))
    if not local_media_dir:
        raise ValueError("[❌] src_root not found in session!")

    if not excel_path.exists():
        raise FileNotFoundError(f"[❌] Excel file not found at: {excel_path}")

    # Read the consolidated sheet
    logging.info(f"[Seeder] Reading Excel file: {excel_path}")
    try:
        df = pd.read_excel(excel_path, sheet_name="consolidated")
    except Exception as e:
        raise Exception(f"[❌] Failed to read Excel file: {str(e)}")

    insert_values = []
    skipped_records = 0

    for idx, row in df.iterrows():
        try:
            video_id = str(row["c_videos_id"])
            author_id = str(row["c_videos_authorid"])

            # Construct relative paths
            video_rel_path = Path(author_id) / "videos" / f"{video_id}.mp4"
            cover_rel_path = Path(author_id) / "covers" / f"{video_id}.jpg"

            # Construct full paths for validation
            video_full_path = local_media_dir / "Following" / video_rel_path
            cover_full_path = local_media_dir / "Following" / cover_rel_path

            # Verify paths exist
            if not video_full_path.exists():
                logging.warning(f"[⚠️] Video file not found: {video_full_path}")
                skipped_records += 1
                continue

            if not cover_full_path.exists():
                logging.warning(f"[⚠️] Cover file not found: {cover_full_path}")
                skipped_records += 1
                continue

            record = {
                "author_id": author_id,
                "video_id": video_id,
                "video_path": str(video_rel_path),  # Store relative path
                "cover_path": str(cover_rel_path),  # Store relative path
                "title": row.get("c_authors_uniqueids", "Unknown"),
                "description": row.get("c_texts_text_content", ""),
                "tags": "",
            }
            insert_values.append(record)
        except Exception as e:
            logging.error(f"[❌] Error processing row {idx}: {str(e)}")
            skipped_records += 1
            continue

    if not insert_values:
        raise Exception("[❌] No valid records found to insert!")

    # Delete existing records and insert new ones
    logging.info("[Seeder] Clearing existing media records...")
    try:
        with engine.begin() as conn:
            # Delete all existing records
            conn.execute(media_table.delete())
            logging.info("[Seeder] Existing records cleared.")
            
            # Insert new records
            conn.execute(media_table.insert(), insert_values)
            logging.info(f"[Seeder ✅] Successfully inserted {len(insert_values)} new records.")
    except Exception as e:
        raise Exception(f"[❌] Failed to refresh media records: {str(e)}")

    if skipped_records > 0:
        logging.warning(f"[⚠️] Skipped {skipped_records} records due to missing files or errors.")
