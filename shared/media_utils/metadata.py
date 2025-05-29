# Shared media metadata extraction utilities for both API and pipeline systems
from typing import Dict, Optional
from PIL import Image
import subprocess
import os

def extract_image_metadata(filepath: str) -> Dict:
    with Image.open(filepath) as img:
        return {
            "width": img.width,
            "height": img.height,
            "format": img.format,
        }

def extract_video_metadata(filepath: str) -> Dict:
    # Requires ffprobe to be installed
    cmd = [
        "ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
        "stream=width,height,duration", "-of", "default=noprint_wrappers=1:nokey=1", filepath
    ]
    try:
        output = subprocess.check_output(cmd, stderr=subprocess.STDOUT).decode().splitlines()
        width, height, duration = output
        return {
            "width": int(width),
            "height": int(height),
            "duration": float(duration)
        }
    except Exception:
        return {}

def extract_metadata(filepath: str) -> Dict:
    ext = os.path.splitext(filepath)[1].lower()
    if ext in [".jpg", ".jpeg", ".png"]:
        return extract_image_metadata(filepath)
    elif ext in [".mp4", ".mov", ".avi"]:
        return extract_video_metadata(filepath)
    return {}

def validate_metadata(metadata: Dict, constraints: Optional[Dict] = None) -> bool:
    # Example: constraints = {"min_width": 100, "max_duration": 600}
    if not constraints:
        return True
    for key, value in constraints.items():
        if key.startswith("min_"):
            field = key[4:]
            if metadata.get(field, 0) < value:
                return False
        elif key.startswith("max_"):
            field = key[4:]
            if metadata.get(field, 0) > value:
                return False
    return True
