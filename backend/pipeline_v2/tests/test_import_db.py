import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

import unittest
from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine, MetaData, inspect
import os
import tempfile
import shutil

# Import the components we need to test
from stages.import_db import create_engine_and_metadata, insert_data, run
from core.table_definitions import define_tables
from utils import load_session, save_session

class TestImportDB(unittest.TestCase):
    def setUp(self):
        """Set up test environment before each test"""
        # Create a temporary directory for test files
        self.test_dir = tempfile.mkdtemp()
        self.test_db_path = Path(self.test_dir) / "test.db"
        self.test_excel_path = Path(self.test_dir) / "test_data.xlsx"
        
        # Create test database URL
        self.test_db_url = f"sqlite:///{self.test_db_path}"
        
        # Create a test Excel file with minimal test data
        test_data = {
            'consolidated': pd.DataFrame({
                'c_videos_id': ['test_video_1', 'test_video_2'],
                'c_videos_authorid': ['author_1', 'author_2'],
                'c_authors_uniqueids': ['user1', 'user2'],
                'c_texts_text_content': ['text1', 'text2']
            })
        }
        
        # Save test Excel file
        with pd.ExcelWriter(self.test_excel_path) as writer:
            for sheet_name, df in test_data.items():
                df.to_excel(writer, sheet_name=sheet_name, index=False)
        
        # Set up test session
        self.test_session = {
            'DATABASE_URL': self.test_db_url,
            'xlsx_file': str(self.test_excel_path),
            'DB_SCHEMA': 'main',  # SQLite default schema
            'LOCAL_MEDIA_DIR': self.test_dir,
            'src_root': self.test_dir,  # <-- Added to fix test failure
        }
        save_session(self.test_session)

        # Create dummy video and cover files for each test record
        for author_id, video_id in zip(['author_1', 'author_2'], ['test_video_1', 'test_video_2']):
            video_dir = Path(self.test_dir) / "Following" / author_id / "videos"
            cover_dir = Path(self.test_dir) / "Following" / author_id / "covers"
            video_dir.mkdir(parents=True, exist_ok=True)
            cover_dir.mkdir(parents=True, exist_ok=True)
            (video_dir / f"{video_id}.mp4").touch()
            (cover_dir / f"{video_id}.jpg").touch()

    def tearDown(self):
        """Clean up test environment after each test"""
        # Remove temporary directory and all its contents
        shutil.rmtree(self.test_dir)

    def test_create_engine_and_metadata(self):
        """Test engine and metadata creation"""
        engine, metadata = create_engine_and_metadata(self.test_db_url, 'main')
        self.assertIsNotNone(engine)
        self.assertIsNotNone(metadata)
        self.assertEqual(metadata.schema, 'main')

    def test_table_creation(self):
        """Test if all required tables are created"""
        engine, metadata = create_engine_and_metadata(self.test_db_url, 'main')
        tables = define_tables(metadata)
        metadata.create_all(engine)
        
        # Check if all tables exist
        inspector = inspect(engine)
        table_names = inspector.get_table_names()
        
        expected_tables = ['videos', 'authors', 'texts', 'consolidated', 'media']
        for table in expected_tables:
            self.assertIn(table, table_names, f"Table {table} was not created")

    def test_data_import(self):
        """Test if data is correctly imported from Excel"""
        # Run the import process
        run()
        
        # Connect to the database and verify data
        engine = create_engine(self.test_db_url)
        
        # Check consolidated table
        df = pd.read_sql('SELECT * FROM consolidated', engine)
        self.assertEqual(len(df), 2)  # Should have 2 test records
        
        # Check media table
        df = pd.read_sql('SELECT * FROM media', engine)
        self.assertEqual(len(df), 2)  # Should have corresponding media records
        
        # Verify media paths are correct (should be relative)
        first_record = df.iloc[0]
        expected_video_path = "author_1/videos/test_video_1.mp4"
        self.assertEqual(first_record['video_path'], expected_video_path)

    def test_error_handling(self):
        """Test error handling for missing Excel file"""
        # Save session with non-existent Excel file
        bad_session = self.test_session.copy()
        bad_session['xlsx_file'] = 'nonexistent.xlsx'
        save_session(bad_session)
        
        # Run should handle the missing file gracefully
        with self.assertLogs(level='ERROR') as log:
            run()
            self.assertIn('Excel file not found', log.output[0])

if __name__ == '__main__':
    unittest.main()
