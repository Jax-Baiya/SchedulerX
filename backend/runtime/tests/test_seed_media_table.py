# backend/runtime/tests/test_seed_media_table.py

import unittest
from sqlalchemy import create_engine, MetaData, Table
from dotenv import load_dotenv
from pathlib import Path
import os

class TestSeedMediaTable(unittest.TestCase):
    def setUp(self):
        load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")
        db_url = os.getenv("DATABASE_URL") or "sqlite:///../pipeline_v2/assets/xlsx_files/media.db"
        self.engine = create_engine(db_url)
        self.metadata = MetaData()
        self.metadata.reflect(bind=self.engine)
        self.media_table = self.metadata.tables.get('media')

    def test_media_table_exists(self):
        self.assertIsNotNone(self.media_table, "Media table does not exist!")

    def test_media_table_has_records(self):
        with self.engine.connect() as conn:
            result = conn.execute(self.media_table.select())
            rows = result.fetchall()
            self.assertGreater(len(rows), 0, "Media table is empty!")
            # Optional: check basic fields exist
            first_row = rows[0]
            self.assertIn('video_id', first_row.keys())
            self.assertIn('author_id', first_row.keys())

if __name__ == "__main__":
    unittest.main()
