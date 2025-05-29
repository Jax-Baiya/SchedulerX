import logging
from sqlalchemy import MetaData
from datetime import datetime

def seed_upload_status_table(engine):
    """
    Seeds the upload_status table with initial pending statuses for all media.
    """
    logging.info("[Seeder] Starting Upload Status Table Seeding...")

    # Use the engine's metadata
    metadata = MetaData()
    metadata.reflect(bind=engine)
    
    media_table = metadata.tables.get('media')
    upload_status_table = metadata.tables.get('upload_status')

    if media_table is None:
        raise Exception("[❌] 'media' table does not exist!")
    if upload_status_table is None:
        raise Exception("[❌] 'upload_status' table does not exist!")

    try:
        with engine.begin() as conn:
            # Clear existing statuses
            conn.execute(upload_status_table.delete())
            
            # Get all media items that don't have a status
            result = conn.execute(media_table.select())
            media_items = result.fetchall()
            
            # Create initial pending status for each media item
            insert_values = [
                {
                    "video_id": item.video_id,
                    "status": "pending",
                    "upload_timestamp": datetime.utcnow(),
                    "retry_count": 0
                }
                for item in media_items
            ]
            
            if insert_values:
                conn.execute(upload_status_table.insert(), insert_values)
                logging.info(f"[Seeder ✅] Created {len(insert_values)} initial upload status records")
            else:
                logging.warning("[⚠️] No media items found to create status records for")
                
    except Exception as e:
        raise Exception(f"[❌] Failed to seed upload status records: {str(e)}")
