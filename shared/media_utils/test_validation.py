import os
import tempfile
from shared.media_utils import validation

def test_validate_file_size_small():
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(b'a' * 1024 * 1024)  # 1MB
        tmp.flush()
        assert validation.validate_file_size(tmp.name, 2)  # 2MB limit
    os.remove(tmp.name)

def test_validate_file_size_large():
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(b'a' * 3 * 1024 * 1024)  # 3MB
        tmp.flush()
        assert not validation.validate_file_size(tmp.name, 2)  # 2MB limit
    os.remove(tmp.name)

def test_validate_file_type():
    with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
        tmp.write(b'\xff\xd8\xff')  # JPEG header
        tmp.flush()
        assert validation.validate_file_type(tmp.name, ['image/jpeg'])
        assert not validation.validate_file_type(tmp.name, ['video/mp4'])
    os.remove(tmp.name)

def test_validate_file_integrity():
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(b'hello world')
        tmp.flush()
        import hashlib
        expected_hash = hashlib.md5(b'hello world').hexdigest()
        assert validation.validate_file_integrity(tmp.name, expected_hash)
        assert not validation.validate_file_integrity(tmp.name, 'bad_hash')
    os.remove(tmp.name)
