# runtime/tests/test_config_loader.py

import unittest
from core.config_loader import Config

class TestConfigLoader(unittest.TestCase):
    def setUp(self):
        self.config = Config()

    def test_local_media_dir_loaded(self):
        self.assertIsNotNone(self.config.LOCAL_MEDIA_DIR)

    def test_r2_bucket_name_loaded(self):
        self.assertIsNotNone(self.config.R2_BUCKET_NAME)

    def test_database_url_loaded(self):
        self.assertTrue(self.config.DATABASE_URL.startswith("sqlite") or self.config.DATABASE_URL.startswith("postgresql"))

if __name__ == "__main__":
    unittest.main()
