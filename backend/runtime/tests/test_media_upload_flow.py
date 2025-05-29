import unittest
from unittest.mock import Mock, patch
from pathlib import Path
from core.media_upload_flow import MediaUploadFlow, UploadStatus
from core.db_access import init_db, get_first_media_item
from models.media import Media

class TestMediaUploadFlow(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        init_db()
        cls.flow = MediaUploadFlow()

    def test_validate_media_file(self):
        # Test with non-existent file
        self.assertFalse(self.flow.validate_media_file(Path("/nonexistent/path")))
        
        # Test with existing file (create temp file)
        temp_file = Path("temp_test.txt")
        temp_file.write_text("test content")
        self.assertTrue(self.flow.validate_media_file(temp_file))
        temp_file.unlink()  # Clean up

    @patch('core.r2_uploader.R2Uploader.upload_file')
    def test_upload_with_retry(self, mock_upload):
        # Mock successful upload
        mock_upload.return_value = "https://example.com/test.mp4"
        
        media_item = get_first_media_item()
        if not media_item:
            self.skipTest("No media items in database")
        
        result = self.flow.upload_single_media(media_item)
        self.assertTrue(result['success'])
        self.assertIsNotNone(result['video_url'])
        
        # Verify status was updated
        self.assertEqual(media_item.upload_status, UploadStatus.COMPLETED)

    @patch('core.r2_uploader.R2Uploader.upload_file')
    def test_upload_failure(self, mock_upload):
        # Mock failed upload
        mock_upload.return_value = None
        
        media_item = get_first_media_item()
        if not media_item:
            self.skipTest("No media items in database")
        
        result = self.flow.upload_single_media(media_item)
        self.assertFalse(result['success'])
        self.assertIn('errors', result)
        
        # Verify status was updated
        self.assertEqual(media_item.upload_status, UploadStatus.FAILED)

if __name__ == '__main__':
    unittest.main()
