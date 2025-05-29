# runtime/tests/test_r2_uploader.py
# `python3 -m unittest tests/test_r2_uploader.py`

import unittest
from core.r2_uploader import R2Uploader
from pathlib import Path

class TestR2Uploader(unittest.TestCase):
    def setUp(self):
        self.uploader = R2Uploader()

    def test_upload_mock_file(self):
        # Create a small temp file
        temp_file = Path("temp_test_upload.txt")
        temp_file.write_text("SchedulerX R2 Test!")

        uploaded_url = self.uploader.upload_file(temp_file)
        self.assertIsNotNone(uploaded_url)
        self.assertTrue(uploaded_url.startswith("https://"))

        # Cleanup after upload (locally)
        temp_file.unlink()

if __name__ == "__main__":
    unittest.main()
