import pytest

def test_list_media(client):
    """Test listing media files"""
    response = client.get("/api/v1/media")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # Verify response structure if there are items
    if len(data) > 0:
        assert "id" in data[0]
        assert "filename" in data[0]

def test_get_media_details(client):
    """Test getting specific media details"""
    # First get list of media
    list_response = client.get("/api/v1/media")
    assert list_response.status_code == 200
    media_list = list_response.json()
    
    if len(media_list) > 0:
        # Test with first media item
        media_id = media_list[0]["id"]
        response = client.get(f"/api/v1/media/{media_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == media_id
        assert "filename" in data
        assert "metadata" in data

def test_get_nonexistent_media(client):
    """Test getting details for non-existent media"""
    response = client.get("/api/v1/media/nonexistent-id")
    assert response.status_code == 404
