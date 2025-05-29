"""
🧪 Test: Pipeline Run API
------------------------
Tests for the pipeline run API endpoints and run mode functionality.
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))

import pytest
from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from backend.api.main import app
from backend.api.models.pipeline import RunMode

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_session():
    return {
        "src_root": "/test/data",
        "dst_root": "assets",
        "run_mode": "step"
    }

def test_trigger_pipeline_success(client, mock_session):
    """Test successful pipeline execution"""
    config = {
        "stages": [0],
        "run_mode": "step",
        "output_directory": "assets",
        "options": {"test_mode": True}
    }

    mock_result = {
        "stage_number": 0,
        "success": True,
        "result": {"status": "success"},
        "error": None,
        "execution_time": 0.1
    }

    # Mock both filesystem and stage execution
    with patch('utils.run_mode.smart_prompt', return_value="step"), \
         patch('utils.run_mode.select_src_profile', return_value="/test/path"), \
         patch('os.path.exists', return_value=True), \
         patch('shutil.copytree'), \
         patch('shutil.rmtree'), \
         patch('pipeline_v2.stages.stage_0_run', return_value=mock_result):
        response = client.post("/api/v1/run", json=config)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["stages_completed"] == [0]
        assert data["stages_failed"] == []

def test_trigger_pipeline_auto_mode(client, mock_session):
    """Test pipeline execution in auto mode"""
    config = {
        "stages": [0, 1],
        "run_mode": "auto",
        "output_directory": "assets",
        "options": {"test_mode": True}
    }

    mock_results = [
        {
            "stage_number": 0,
            "success": True,
            "result": {"status": "success"},
            "error": None,
            "execution_time": 0.1
        },
        {
            "stage_number": 1,
            "success": True,
            "result": {"status": "success"},
            "error": None,
            "execution_time": 0.1
        }
    ]

    with patch('utils.run_mode.smart_prompt', return_value="auto"), \
         patch('utils.run_mode.select_src_profile', return_value="/auto/test/path"), \
         patch('os.path.exists', return_value=True), \
         patch('shutil.copytree'), \
         patch('shutil.rmtree'), \
         patch('pipeline_v2.stages.stage_0_run', return_value=mock_results[0]), \
         patch('pipeline_v2.stages.stage_1_run', return_value=mock_results[1]):
        response = client.post("/api/v1/run", json=config)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["stages_completed"] == [0, 1]
        assert data["stages_failed"] == []

def test_trigger_pipeline_invalid_stage(client, mock_session):
    """Test pipeline execution with invalid stage number"""
    config = {
        "stages": [999],  # Invalid stage number
        "run_mode": "step"
    }

    response = client.post("/api/v1/run", json=config)
    assert response.status_code == 400
    assert "Invalid stage number" in response.json()["detail"]

def test_get_pipeline_status(client, mock_session):
    """Test getting pipeline status"""
    response = client.get("/api/v1/run/status")
    assert response.status_code == 200
    data = response.json()
    assert "session_data" in data
    assert "available_stages" in data
    assert "current_mode" in data

def test_run_mode_persistence(client, mock_session):
    """Test that run mode persists between pipeline runs"""
    # First run in auto mode
    config_auto = {
        "stages": [0],
        "run_mode": "auto",
        "output_directory": "assets"
    }

    mock_result = {
        "stage_number": 0,
        "success": True,
        "result": {"status": "success"},
        "error": None,
        "execution_time": 0.1
    }

    with patch('utils.run_mode.smart_prompt', return_value="auto"), \
         patch('utils.run_mode.select_src_profile', return_value="/test/path"), \
         patch('os.path.exists', return_value=True), \
         patch('shutil.copytree'), \
         patch('shutil.rmtree'), \
         patch('pipeline_v2.stages.stage_0_run', return_value=mock_result):
        response = client.post("/api/v1/run", json=config_auto)
        assert response.status_code == 200

        # Check that run mode persisted
        status_response = client.get("/api/v1/run/status")
        assert status_response.status_code == 200
        assert status_response.json()["current_mode"] == "auto"

def test_run_mode_step_by_step(client, mock_session):
    """Test step-by-step execution mode"""
    config = {
        "stages": [0, 1],
        "run_mode": "step",
        "output_directory": "assets"
    }

    mock_results = [
        {
            "stage_number": 0,
            "success": True,
            "result": {"status": "success"},
            "error": None,
            "execution_time": 0.1
        },
        {
            "stage_number": 1,
            "success": True,
            "result": {"status": "success"},
            "error": None,
            "execution_time": 0.1
        }
    ]

    with patch('utils.run_mode.smart_prompt', return_value="step"), \
         patch('utils.run_mode.select_src_profile') as mock_select_src, \
         patch('os.path.exists', return_value=True), \
         patch('shutil.copytree'), \
         patch('shutil.rmtree'), \
         patch('pipeline_v2.stages.stage_0_run', return_value=mock_results[0]), \
         patch('pipeline_v2.stages.stage_1_run', return_value=mock_results[1]):
        # Set different paths for each stage
        mock_select_src.side_effect = ["/path/stage0", "/path/stage1"]

        response = client.post("/api/v1/run", json=config)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["stages_completed"] == [0, 1]
        assert data["stages_failed"] == []

def test_invalid_run_mode(client, mock_session):
    """Test handling of invalid run mode"""
    config = {
        "stages": [0],
        "run_mode": "invalid_mode",
        "output_directory": "assets"
    }

    response = client.post("/api/v1/run", json=config)
    assert response.status_code == 400
    assert "Invalid run mode" in response.json()["detail"]
