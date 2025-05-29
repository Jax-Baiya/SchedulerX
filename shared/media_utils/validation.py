# Shared media validation utilities for both API and pipeline systems
import os
import mimetypes
import hashlib
from typing import List, Optional

def validate_file_size(filepath: str, max_size_mb: int) -> bool:
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    return size_mb <= max_size_mb

def validate_file_type(filepath: str, allowed_types: Optional[List[str]]) -> bool:
    mime_type, _ = mimetypes.guess_type(filepath)
    return mime_type in allowed_types if allowed_types else True

def validate_file_integrity(filepath: str, expected_hash: Optional[str]) -> bool:
    if not expected_hash:
        return True
    hash_md5 = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest() == expected_hash
