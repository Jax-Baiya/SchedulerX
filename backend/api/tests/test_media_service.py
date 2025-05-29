import pytest
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.api.services.media import MediaService
from backend.api.models.media import Base, Media

@pytest.fixture
def db_session(tmp_path):
    # Create in-memory SQLite database for testing
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

@pytest.fixture
def media_service(db_session, tmp_path):
    # Create test media directory structure
    base_dir = tmp_path / "media"
    base_dir.mkdir()
    
    # Create test media files
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
    
    # Create test media record
    media = Media(
        video_id="video123",
        author_id="author123",
        video_path="author123/videos/video123.mp4",
        cover_path="author123/covers/video123.jpg",
        title="Test Video",
        description="Test Description"
    )
    db_session.add(media)
    db_session.commit()
    
    return MediaService(db_session)

def test_get_media_paths(media_service):
    paths = media_service.get_media_paths("video123")
    assert "video" in paths
    assert "cover" in paths
    assert paths["video"].exists()
    assert paths["cover"].exists()
    assert paths["video"].read_text() == "test video"
    assert paths["cover"].read_text() == "test cover"

def test_validate_media_files(media_service):
    assert media_service.validate_media_files("video123")
    
    # Test with non-existent video_id
    assert not media_service.validate_media_files("nonexistent")

def test_list_media(media_service):
    media_list = media_service.list_media()
    assert len(media_list) == 1
    media = media_list[0]
    assert media["video_id"] == "video123"
    assert media["author_id"] == "author123"
    assert media["title"] == "Test Video"
    assert media["description"] == "Test Description"
    assert media["exists"]
    
    # Test filtering by author_id
    filtered_list = media_service.list_media(author_id="author123")
    assert len(filtered_list) == 1
    
    empty_list = media_service.list_media(author_id="nonexistent")
    assert len(empty_list) == 0

def test_get_media_details(media_service):
    details = media_service.get_media_details("video123")
    assert details is not None
    assert details["video_id"] == "video123"
    assert details["author_id"] == "author123"
    assert details["title"] == "Test Video"
    assert details["description"] == "Test Description"
    assert details["exists"]
    assert "relative_paths" in details
    assert details["relative_paths"]["video"] == "author123/videos/video123.mp4"
    assert details["relative_paths"]["cover"] == "author123/covers/video123.jpg"
    
    # Test with non-existent video_id
    assert media_service.get_media_details("nonexistent") is None