# runtime/tests/test_db_access.py

import unittest
from pathlib import Path
from sqlalchemy import text
from core.db_access import init_db, get_media_items, get_first_media_item, SessionLocal
from models.media import Media
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

class TestDBAccess(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Load env from pipeline_v2/.env
        env_path = Path(__file__).parent.parent.parent / "pipeline_v2" / ".env"
        load_dotenv(dotenv_path=env_path)
        
        # Verify DATABASE_URL exists
        cls.database_url = os.getenv("DATABASE_URL")
        if not cls.database_url:
            raise ValueError("DATABASE_URL not found in environment variables")
        
        # Initialize DB
        init_db()
        
        # Create a test session
        engine = create_engine(cls.database_url)
        TestingSessionLocal = sessionmaker(bind=engine)
        cls.test_db = TestingSessionLocal()

    def setUp(self):
        self.db = SessionLocal()

    def test_get_media_items(self):
        """Test fetching all media items"""
        media_items = get_media_items()
        self.assertIsNotNone(media_items)
        if media_items:  # If we have records
            self.assertIsInstance(media_items[0], Media)
            # Verify the fields match our schema
            first_item = media_items[0]
            self.assertTrue(hasattr(first_item, 'video_id'))
            self.assertTrue(hasattr(first_item, 'author_id'))
            self.assertTrue(hasattr(first_item, 'video_path'))
            self.assertTrue(hasattr(first_item, 'cover_path'))

    def test_get_first_media_item(self):
        """Test fetching single media item"""
        media_item = get_first_media_item()
        if media_item:  # If we have a record
            self.assertIsInstance(media_item, Media)
            self.assertIsNotNone(media_item.video_id)
            self.assertIsNotNone(media_item.video_path)

    def test_database_connection(self):
        """Test basic database connectivity"""
        try:
            result = self.db.execute(text("SELECT 1"))
            self.assertEqual(result.scalar(), 1)
        except Exception as e:
            self.fail(f"Database connection failed: {str(e)}")

    @classmethod
    def tearDownClass(cls):
        cls.test_db.close()

    def tearDown(self):
        self.db.close()

if __name__ == '__main__':
    unittest.main()
