# runtime/r2_client.py

import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

R2_ENDPOINT = f"https://{os.getenv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com"
s3 = boto3.client(
    "s3",
    endpoint_url=R2_ENDPOINT,
    aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
)

def upload_to_r2(file_path: Path, bucket: str):
    try:
        key = file_path.name
        s3.upload_file(str(file_path), bucket, key)
        return f"{R2_ENDPOINT}/{bucket}/{key}"
    except Exception as e:
        print(f"[❌] Failed to upload: {e}")
        return None
