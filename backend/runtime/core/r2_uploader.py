# runtime/core/r2_uploader.py

import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from the correct path
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class R2Uploader:
    def __init__(self):
        # Get environment variables
        self.bucket_name = os.getenv("R2_BUCKET_NAME")
        self.account_id = os.getenv("R2_ACCOUNT_ID")
        self.access_key_id = os.getenv("R2_ACCESS_KEY_ID")
        self.secret_access_key = os.getenv("R2_SECRET_ACCESS_KEY")
        
        # Debug print environment variables (without sensitive data)
        print(f"[DEBUG] Bucket Name: {self.bucket_name}")
        print(f"[DEBUG] Account ID: {self.account_id}")
        print(f"[DEBUG] Access Key ID exists: {bool(self.access_key_id)}")
        print(f"[DEBUG] Secret Key exists: {bool(self.secret_access_key)}")
        
        # Construct endpoint URL
        self.endpoint_url = f"https://{self.account_id}.r2.cloudflarestorage.com"
        
        # Initialize S3 client
        self.s3_client = boto3.client(
            "s3",
            endpoint_url=self.endpoint_url,
            aws_access_key_id=self.access_key_id,
            aws_secret_access_key=self.secret_access_key,
        )

    def upload_file(self, file_path: Path) -> str:
        if not file_path.exists():
            raise FileNotFoundError(f"File {file_path} does not exist.")

        key = file_path.name
        try:
            print(f"[DEBUG] Attempting to upload to bucket: {self.bucket_name}")
            print(f"[DEBUG] Using endpoint: {self.endpoint_url}")
            self.s3_client.upload_file(str(file_path), self.bucket_name, key)
            print(f"[✅] Uploaded {key} to R2.")
            return f"{self.endpoint_url}/{self.bucket_name}/{key}"
        except Exception as e:
            print(f"[❌] Upload failed: {e}")
            return None

# Example standalone run
if __name__ == "__main__":
    uploader = R2Uploader()
    test_file = Path("temp_test_upload.txt")  # Use a local test file
    test_file.write_text("Test content")
    result = uploader.upload_file(test_file)
    print(f"Upload result: {result}")
    test_file.unlink()  # Clean up test file
