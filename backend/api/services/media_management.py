"""
Media Management Module for SchedulerX
Handles file validation (size, type, integrity) as the first step of business logic.
"""
import os
import mimetypes
import hashlib
from typing import Optional, List

def validate_file_size(filepath: str, max_size_mb: int = 100) -> bool:
    """Check if file size is within allowed limit (default 100MB)."""
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    return size_mb <= max_size_mb

def validate_file_type(filepath: str, allowed_types: Optional[List[str]] = None) -> bool:
    """Check if file type is allowed (by MIME type)."""
    if allowed_types is None:
        allowed_types = ['video/mp4', 'image/jpeg', 'image/png']
    mime_type, _ = mimetypes.guess_type(filepath)
    return mime_type in allowed_types

def validate_file_integrity(filepath: str, expected_md5: Optional[str] = None) -> bool:
    """Check file integrity by comparing MD5 hash (if provided)."""
    if not expected_md5:
        return True  # No hash to check
    hash_md5 = hashlib.md5()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest() == expected_md5

# DEPRECATED: Use SchedulerX.shared.media_utils.validation and metadata instead.
