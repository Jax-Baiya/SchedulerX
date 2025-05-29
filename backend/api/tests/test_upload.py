import pytest
from pathlib import Path
import tempfile

def test_upload_file_success(client):
    """Test successful file upload"""
    # Create a temporary test file
    with tempfile.NamedTemporaryFile(suffix=".mp4") as tmp_file:
        tmp_file.write(b"test video content")
        tmp_file.seek(0)
        
        files = {"file": ("test.mp4", tmp_file, "video/mp4")}
        response = client.post("/api/v1/upload", files=files)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "uploaded_files" in data
        assert len(data["uploaded_files"]) == 1

def test_upload_invalid_file(client):
    """Test upload with invalid file type"""
    with tempfile.NamedTemporaryFile(suffix=".exe") as tmp_file:
        tmp_file.write(b"invalid content")
        tmp_file.seek(0)
        
        files = {"file": ("test.exe", tmp_file, "application/x-msdownload")}
        response = client.post("/api/v1/upload", files=files)
        
        assert response.status_code == 400
        assert "Invalid file type" in response.json()["detail"]

def test_upload_status(client, mock_session):
    """Test getting upload status"""
    # First create a mock upload in session
    mock_upload_id = "test-123"
    mock_session["uploads"] = [{
        "id": mock_upload_id,
        "status": "completed",
        "filename": "test.mp4"
    }]
    
    response = client.get(f"/api/v1/upload/status/{mock_upload_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == mock_upload_id
    assert data["status"] == "completed"
