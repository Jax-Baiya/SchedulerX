# backend/runtime/phase2_core_runner.py

import os
from pathlib import Path
import boto3
import requests
from dotenv import load_dotenv
from pprint import pprint

# Load env
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

# ENV VARS
R2_ACCESS_KEY = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
R2_BUCKET = os.getenv("R2_BUCKET_NAME")
R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
R2_ENDPOINT = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
LOCAL_MEDIA_DIR = Path(os.getenv("LOCAL_MEDIA_DIR"))
PINTEREST_TOKEN = os.getenv("PINTEREST_ACCESS_TOKEN")
PINTEREST_CLIENT_ID = os.getenv("PINTEREST_CLIENT_ID")

# Boto3 client for R2
s3_client = boto3.client(
    "s3",
    endpoint_url=R2_ENDPOINT,
    aws_access_key_id=R2_ACCESS_KEY,
    aws_secret_access_key=R2_SECRET_KEY
)

def upload_file_to_r2(file_path: Path):
    key = file_path.name
    try:
        s3_client.upload_file(str(file_path), R2_BUCKET, key)
        print(f"[✅] Uploaded: {key}")
        return f"{R2_ENDPOINT}/{R2_BUCKET}/{key}"
    except Exception as e:
        print(f"[❌] Upload failed: {e}")
        return None# runtime/phase2_core_runner.py

from db_session import get_db
from media_model import Media
from r2_client import upload_to_r2
from pinterest_stub import post_to_pinterest_stub
from pathlib import Path
import os

from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).parent / ".env")

LOCAL_MEDIA_DIR = Path(os.getenv("LOCAL_MEDIA_DIR"))
R2_BUCKET = os.getenv("R2_BUCKET_NAME")

def main():
    db = next(get_db())

    media_item = db.query(Media).first()
    if not media_item:
        print("[⚠️] No media found in DB.")
        return

    file_path = LOCAL_MEDIA_DIR / media_item.filename
    if not file_path.exists():
        print(f"[❌] File not found: {file_path}")
        return

    print(f"[🎯] Selected: {file_path.name}")
    uploaded_url = upload_to_r2(file_path, R2_BUCKET)
    if uploaded_url:
        tags = media_item.tags.split(",") if media_item.tags else []
        post_to_pinterest_stub(
            media_url=uploaded_url,
            title=media_item.title,
            description=media_item.description,
            tags=tags
        )

if __name__ == "__main__":
    main()


def stub_post_to_pinterest(media_url: str, filename: str):
    # Mock call – replace with actual Pinterest API when ready
    payload = {
        "title": filename,
        "media_url": media_url,
        "board_id": "1234567890",  # Placeholder
        "access_token": PINTEREST_TOKEN,
    }
    try:
        # Simulate a POST
        response = requests.post("https://httpbin.org/post", json=payload)
        print(f"[📌] Pinterest Stub Response:")
        pprint(response.json())
    except Exception as e:
        print(f"[❌] Pinterest post failed: {e}")

def main():
    if not LOCAL_MEDIA_DIR.exists():
        print(f"[❌] LOCAL_MEDIA_DIR does not exist: {LOCAL_MEDIA_DIR}")
        return

    # Select the first media file (jpg or mp4)
    candidates = list(LOCAL_MEDIA_DIR.glob("*.jpg")) + list(LOCAL_MEDIA_DIR.glob("*.mp4"))
    if not candidates:
        print(f"[⚠️] No media files found in {LOCAL_MEDIA_DIR}")
        return

    selected_file = candidates[0]
    print(f"[🎯] Selected file: {selected_file.name}")

    uploaded_url = upload_file_to_r2(selected_file)
    if uploaded_url:
        stub_post_to_pinterest(uploaded_url, selected_file.stem)

if __name__ == "__main__":
    main()
