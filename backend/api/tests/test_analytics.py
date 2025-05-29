import pytest

def test_get_analytics(client):
    """Test getting analytics data"""
    response = client.get("/api/v1/analytics")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data

def test_get_analytics_summary(client):
    """Test getting analytics summary"""
    response = client.get("/api/v1/analytics/summary")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
