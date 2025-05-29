import os
from .validation import validate_file_size, validate_file_type, validate_file_integrity

def validate(filepath, max_size_mb=100, allowed_types=None, expected_hash=None):
    """Composite validation: size, type, integrity."""
    if not validate_file_size(filepath, max_size_mb):
        return False
    if not validate_file_type(filepath, allowed_types):
        return False
    if not validate_file_integrity(filepath, expected_hash):
        return False
    return True
