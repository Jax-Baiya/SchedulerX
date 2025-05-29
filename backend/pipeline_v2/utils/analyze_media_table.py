import pandas as pd
from sqlalchemy import create_engine, text, MetaData, inspect
import logging
from pathlib import Path
from utils import load_session

def analyze_media_table():
    """
    Analyzes the structure and content of the media table.
    """
    # Setup logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)

    # Get database connection from session
    session = load_session()
    engine = create_engine(session.get('DATABASE_URL'))
    
    try:
        # 1. Table Structure
        logger.info("📊 Analyzing Media Table Structure:")
        inspector = inspect(engine)
        columns = inspector.get_columns('media')
        
        print("\nTable Structure:")
        for col in columns:
            print(f"- {col['name']}: {col['type']} (nullable: {col['nullable']})")

        # 2. Basic Statistics
        with engine.connect() as conn:
            # Count total records
            result = conn.execute(text("""
                SELECT 
                    COUNT(*) as total_records,
                    COUNT(DISTINCT author_id) as unique_authors,
                    COUNT(DISTINCT video_id) as unique_videos
                FROM media
            """))
            stats = result.fetchone()
            print(f"\nBasic Statistics:")
            print(f"- Total Records: {stats[0]}")
            print(f"- Unique Authors: {stats[1]}")
            print(f"- Unique Videos: {stats[2]}")

            # Check for NULL values
            result = conn.execute(text("""
                SELECT 
                    COUNT(*) - COUNT(author_id) as null_author_ids,
                    COUNT(*) - COUNT(video_id) as null_video_ids,
                    COUNT(*) - COUNT(video_path) as null_video_paths,
                    COUNT(*) - COUNT(cover_path) as null_cover_paths,
                    COUNT(*) - COUNT(title) as null_titles,
                    COUNT(*) - COUNT(description) as null_descriptions,
                    COUNT(*) - COUNT(tags) as null_tags
                FROM media
            """))
            nulls = result.fetchone()
            print(f"\nNull Value Analysis:")
            print(f"- Null Author IDs: {nulls[0]}")
            print(f"- Null Video IDs: {nulls[1]}")
            print(f"- Null Video Paths: {nulls[2]}")
            print(f"- Null Cover Paths: {nulls[3]}")
            print(f"- Null Titles: {nulls[4]}")
            print(f"- Null Descriptions: {nulls[5]}")
            print(f"- Null Tags: {nulls[6]}")

            # Videos per Author
            result = conn.execute(text("""
                SELECT 
                    author_id,
                    COUNT(*) as video_count
                FROM media
                GROUP BY author_id
                ORDER BY video_count DESC
                LIMIT 5
            """))
            print(f"\nTop 5 Authors by Video Count:")
            for row in result:
                print(f"- Author {row[0]}: {row[1]} videos")

            # Path Analysis
            result = conn.execute(text("""
                SELECT 
                    COUNT(*) as total,
                    COUNT(*) FILTER (WHERE video_path LIKE '%.mp4') as valid_video_paths,
                    COUNT(*) FILTER (WHERE cover_path LIKE '%.jpg') as valid_cover_paths
                FROM media
            """))
            paths = result.fetchone()
            print(f"\nPath Analysis:")
            print(f"- Total Records: {paths[0]}")
            print(f"- Valid Video Paths (.mp4): {paths[1]}")
            print(f"- Valid Cover Paths (.jpg): {paths[2]}")

            # Description Length Statistics
            result = conn.execute(text("""
                SELECT 
                    MIN(LENGTH(description)) as min_length,
                    AVG(LENGTH(description))::integer as avg_length,
                    MAX(LENGTH(description)) as max_length
                FROM media
                WHERE description IS NOT NULL
            """))
            lengths = result.fetchone()
            print(f"\nDescription Length Statistics:")
            print(f"- Minimum Length: {lengths[0]} characters")
            print(f"- Average Length: {lengths[1]} characters")
            print(f"- Maximum Length: {lengths[2]} characters")

    except Exception as e:
        logger.error(f"Error analyzing media table: {str(e)}")
        raise

if __name__ == "__main__":
    analyze_media_table()
