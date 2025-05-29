import pytest
from pathlib import Path
import os
from backend.api.utils.path_resolver import (
    is_wsl_path,
    wsl_to_windows,
    windows_to_wsl,
    normalize_path,
    validate_path,
    resolve_media_path,
    get_relative_path,
    is_docker,
    docker_host_to_container_path,
    check_permissions,
    sanitize_path
)

def test_is_wsl_path():
    assert is_wsl_path("/mnt/c/Users/test")
    assert not is_wsl_path("C:\\Users\\test")
    assert not is_wsl_path("/home/user/test")

def test_wsl_to_windows():
    wsl_path = "/mnt/c/Users/test/file.txt"
    windows_path = wsl_to_windows(wsl_path)
    assert windows_path == "C:\\Users\\test\\file.txt"

def test_windows_to_wsl():
    windows_path = "C:\\Users\\test\\file.txt"
    wsl_path = windows_to_wsl(windows_path)
    assert wsl_path == "/mnt/c/Users/test/file.txt"

def test_normalize_path():
    # Test Windows path
    win_path = "C:\\Users\\test\\file.txt"
    norm_path = normalize_path(win_path)
    assert norm_path == str(Path(win_path))

    # Test WSL path
    wsl_path = "/mnt/c/Users/test/file.txt"
    norm_path = normalize_path(wsl_path)
    assert norm_path == str(Path(wsl_path))

    # Test relative path
    rel_path = "test/file.txt"
    norm_path = normalize_path(rel_path)
    assert norm_path == str(Path(rel_path))

def test_validate_path(tmp_path):
    # Create a test file
    test_file = tmp_path / "test.txt"
    test_file.write_text("test")
    
    # Test existing file
    assert validate_path(str(test_file))
    
    # Test non-existent file
    assert not validate_path(str(tmp_path / "nonexistent.txt"))

def test_resolve_media_path(tmp_path):
    base_dir = tmp_path / "media"
    base_dir.mkdir()
    
    # Create test media structure
    author_dir = base_dir / "Following" / "author123"
    author_dir.mkdir(parents=True)
    
    video_dir = author_dir / "videos"
    video_dir.mkdir()
    cover_dir = author_dir / "covers"
    cover_dir.mkdir()
    
    video_file = video_dir / "video123.mp4"
    cover_file = cover_dir / "video123.jpg"
    
    video_file.write_text("test video")
    cover_file.write_text("test cover")
    
    # Test resolving relative paths
    rel_video_path = "author123/videos/video123.mp4"
    rel_cover_path = "author123/covers/video123.jpg"
    
    resolved_video = resolve_media_path(rel_video_path, str(base_dir))
    resolved_cover = resolve_media_path(rel_cover_path, str(base_dir))
    
    assert Path(resolved_video).exists()
    assert Path(resolved_cover).exists()
    assert Path(resolved_video).read_text() == "test video"
    assert Path(resolved_cover).read_text() == "test cover"

def test_get_relative_path(tmp_path):
    base_dir = tmp_path / "media"
    base_dir.mkdir()
    
    # Create test file
    test_file = base_dir / "test.txt"
    test_file.write_text("test")
    
    # Test getting relative path
    rel_path = get_relative_path(str(test_file), str(base_dir))
    assert rel_path == "test.txt"
    
    # Test with nested path
    nested_dir = base_dir / "nested"
    nested_dir.mkdir()
    nested_file = nested_dir / "file.txt"
    nested_file.write_text("test")
    
    rel_path = get_relative_path(str(nested_file), str(base_dir))
    assert rel_path == "nested/file.txt"

def test_is_docker(monkeypatch):
    # Test when .dockerenv exists
    monkeypatch.setattr(os.path, 'exists', lambda x: x == '/.dockerenv')
    assert is_docker() is True
    
    # Test when .dockerenv doesn't exist but cgroup contains docker
    def mock_open(*args, **kwargs):
        class MockFile:
            def __init__(self): pass
            def read(self): return "some text with docker in it"
            def __enter__(self): return self
            def __exit__(self, *args): pass
        return MockFile()
    
    monkeypatch.setattr(os.path, 'exists', lambda x: False)
    monkeypatch.setattr('builtins.open', mock_open)
    assert is_docker() is True
    
    # Test when neither condition is true
    def mock_open_no_docker(*args, **kwargs):
        class MockFile:
            def __init__(self): pass
            def read(self): return "some text without the word"
            def __enter__(self): return self
            def __exit__(self, *args): pass
        return MockFile()
    
    monkeypatch.setattr('builtins.open', mock_open_no_docker)
    assert is_docker() is False

def test_docker_host_to_container_path():
    mapping = {
        "/host/data": "/data",
        "/host/media": "/media"
    }
    
    # Test matching paths
    assert docker_host_to_container_path("/host/data/file.txt", mapping) == "/data/file.txt"
    assert docker_host_to_container_path("/host/media/video.mp4", mapping) == "/media/video.mp4"
    
    # Test non-matching path
    assert docker_host_to_container_path("/other/path/file.txt", mapping) == "/other/path/file.txt"

def test_check_permissions(tmp_path):
    # Create test file with specific permissions
    test_file = tmp_path / "test.txt"
    test_file.write_text("test")
    
    # Create test directory
    test_dir = tmp_path / "test_dir"
    test_dir.mkdir()
    
    # Test read-only file
    os.chmod(test_file, 0o444)  # r--r--r--
    perms = check_permissions(test_file)
    assert perms["exists"] is True
    assert perms["read"] is True
    assert perms["write"] is False
    assert perms["execute"] is False
    
    # Test executable directory
    os.chmod(test_dir, 0o755)  # rwxr-xr-x
    perms = check_permissions(test_dir, read=True, write=True, execute=True)
    assert perms["exists"] is True
    assert perms["read"] is True
    assert perms["write"] is True
    assert perms["execute"] is True
    
    # Test non-existent path
    perms = check_permissions(tmp_path / "nonexistent.txt")
    assert perms["exists"] is False
    assert perms["read"] is False
    assert perms["write"] is False
    assert perms["execute"] is False

def test_sanitize_path(tmp_path):
    # Create test directory structure
    base_dir = tmp_path / "base"
    base_dir.mkdir()
    sub_dir = base_dir / "sub"
    sub_dir.mkdir()
    test_file = sub_dir / "test.txt"
    test_file.write_text("test")
    
    # Test valid paths
    assert sanitize_path(test_file) == str(test_file.resolve())
    assert sanitize_path(test_file, base_dir) == str(test_file.resolve())
    
    # Test path traversal
    with pytest.raises(ValueError, match="Path traversal detected"):
        sanitize_path(base_dir / ".." / "outside.txt")
    
    # Test path outside base directory
    outside_file = tmp_path / "outside.txt"
    outside_file.write_text("test")
    with pytest.raises(ValueError, match="outside base directory"):
        sanitize_path(outside_file, base_dir)
    
    # Test non-existent path
    nonexistent = base_dir / "nonexistent.txt"
    # Should not raise but log a warning
    sanitize_path(nonexistent)