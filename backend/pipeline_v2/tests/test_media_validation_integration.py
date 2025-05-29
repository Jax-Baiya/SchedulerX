import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))
import os
import tempfile
import json
from shared.media_utils import validation, metadata

def test_decode_and_xlsx_shared_validation():
    # Create a fake video file
    with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp:
        tmp.write(b'\x00' * 1024 * 1024)  # 1MB
        tmp.flush()
        video_path = tmp.name
    # Create a fake decoded section
    decoded_section = [{"file_path": video_path}]
    # Simulate decode.py logic
    for item in decoded_section:
        assert validation.validate_file_size(item["file_path"], 500)
        assert validation.validate_file_type(item["file_path"], ["video/mp4"])
        meta = metadata.extract_metadata(item["file_path"])
        assert isinstance(meta, dict)
    # Simulate xlsx.py logic
    data = [{"file_path": video_path}]
    for item in data:
        assert validation.validate_file_size(item["file_path"], 500)
        assert validation.validate_file_type(item["file_path"], ["video/mp4"])
        meta = metadata.extract_metadata(item["file_path"])
        assert isinstance(meta, dict)
    os.remove(video_path)

if __name__ == "__main__":
    test_decode_and_xlsx_shared_validation()