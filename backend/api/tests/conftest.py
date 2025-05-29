import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../')))

import pytest
import shutil
from pathlib import Path
from fastapi.testclient import TestClient
from backend.api.main import app
from backend.pipeline_v2.utils.session_tools import load_session, save_session
from unittest.mock import patch

# Bootstrap FIRST before any other imports
from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

# Now we can safely import the app and other modules
from backend.api.main import app
from backend.pipeline_v2.utils.session_tools import load_session, save_session

@pytest.fixture(scope="function")
def test_env(tmp_path):
    """Set up test environment with mock data structure"""
    # Create test directories
    test_root = tmp_path / "test_data"
    test_root.mkdir()
    appdata_dir = test_root / ".appdata"
    appdata_dir.mkdir()
    
    # Create mock .appdata contents
    (appdata_dir / "config.json").write_text("{}")
    
    # Create assets directory
    assets_dir = tmp_path / "assets"
    assets_dir.mkdir()
    
    yield {
        "test_root": str(test_root),
        "assets_dir": str(assets_dir)
    }
    
    # Cleanup
    shutil.rmtree(test_root)
    shutil.rmtree(assets_dir)

@pytest.fixture
def mock_session(test_env):
    """Mock session data fixture with proper test paths"""
    test_session = {
        "src_root": test_env["test_root"],
        "dst_root": test_env["assets_dir"],
        "run_mode": "step"
    }
    save_session(test_session)
    yield test_session
    # Cleanup
    if Path("session.json").exists():
        Path("session.json").unlink()

@pytest.fixture
def mock_stages():
    """Mock pipeline stages"""
    with patch('backend.api.services.pipeline_runner.stage_0_run') as mock_stage_0, \
         patch('backend.api.services.pipeline_runner.stage_1_run') as mock_stage_1:
        
        # Configure mock returns
        mock_stage_0.return_value = {"status": "success", "stage": 0}
        mock_stage_1.return_value = {"status": "success", "stage": 1}
        
        yield {
            0: mock_stage_0,
            1: mock_stage_1
        }

@pytest.fixture
def client():
    """Test client fixture"""
    return TestClient(app)

@pytest.fixture
def mock_session():
    """Mock session data fixture"""
    test_session = {
        "src_root": "/test/data",
        "dst_root": "assets",
        "run_mode": "step"
    }
    # Save mock session
    save_session(test_session)
    yield test_session
    # Cleanup: restore original session
    original_session = load_session()
    save_session(original_session)
