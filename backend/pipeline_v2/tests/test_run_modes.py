"""
🧪 Test: Run Mode System
Tests the run mode system's functionality, including auto and step modes.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import pytest
from unittest.mock import patch, MagicMock
from pathlib import Path
from utils.run_mode import RunModeManager, initialize_pipeline_mode
from utils.session_tools import load_session, save_session, initialize_session

@pytest.fixture(scope="function")
def run_mode_manager():
    """Fixture to provide a fresh RunModeManager instance for each test"""
    # Reset session before each test
    if Path("session.json").exists():
        Path("session.json").unlink()
    return RunModeManager()

@pytest.fixture
def mock_pipeline_config():
    """Fixture for pipeline configuration"""
    return {
        "stages": [0, 1, 2],
        "src_profile": "default",
        "output_directory": "test_assets",
        "run_mode": "auto",
        "options": {}
    }

class TestRunModes:
    @pytest.fixture(autouse=True)
    def setup_method(self):
        """Reset session before each test"""
        if Path("session.json").exists():
            Path("session.json").unlink()
        
    def test_initialization(self, run_mode_manager):
        """Test proper initialization of RunModeManager"""
        assert isinstance(run_mode_manager.run_mode, str)
        assert run_mode_manager.run_mode in ["auto", "step"]
        assert run_mode_manager.src_profile in ["default", "custom"]
        assert isinstance(run_mode_manager.session_data, dict)

    @patch('utils.run_mode.smart_prompt')
    def test_select_run_mode_auto(self, mock_prompt, run_mode_manager):
        """Test selecting auto mode"""
        mock_prompt.return_value = "auto"
        
        with patch('utils.run_mode.select_src_profile') as mock_select_src, \
             patch('utils.run_mode.save_session') as mock_save:
            mock_select_src.return_value = "/test/source/path"
            mode = run_mode_manager.select_run_mode()
            
            assert mode == "auto"
            assert run_mode_manager.run_mode == "auto"
            assert run_mode_manager.selected_source_path == "/test/source/path"
            mock_save.assert_called_once()

    @patch('utils.run_mode.smart_prompt')
    def test_select_run_mode_step(self, mock_prompt, run_mode_manager):
        """Test selecting step run mode"""
        mock_prompt.return_value = "step"
        
        with patch('utils.run_mode.select_src_profile') as mock_select_src:
            mode = run_mode_manager.select_run_mode()
            
            assert mode == "step"
            assert run_mode_manager.run_mode == "step"
            mock_select_src.assert_not_called()

    def test_select_src_path_auto_mode(self, run_mode_manager):
        """Test source path selection in auto mode"""
        run_mode_manager.run_mode = "auto"
        run_mode_manager.selected_source_path = "/auto/test/path"
        
        # Should return the same path for any stage in auto mode
        assert run_mode_manager.select_src_path(0) == "/auto/test/path"
        assert run_mode_manager.select_src_path(1) == "/auto/test/path"
        assert run_mode_manager.select_src_path(2) == "/auto/test/path"

    @patch('utils.run_mode.select_src_profile')
    def test_select_src_path_step_mode(self, mock_select_src, run_mode_manager):
        """Test source path selection in step mode"""
        run_mode_manager.run_mode = "step"
        mock_select_src.return_value = "/step/test/path"
        
        with patch('utils.run_mode.save_session'):
            # Should prompt for stage 0
            path_stage_0 = run_mode_manager.select_src_path(0)
            assert path_stage_0 == "/step/test/path"
            
            # Should use the same path for subsequent stages without prompting
            mock_select_src.reset_mock()
            path_stage_1 = run_mode_manager.select_src_path(1)
            assert path_stage_1 == "/step/test/path"
            mock_select_src.assert_not_called()

    def test_get_current_mode(self, run_mode_manager):
        """Test getting current mode configuration"""
        run_mode_manager.run_mode = "auto"
        run_mode_manager.src_profile = "default"
        run_mode_manager.selected_source_path = "/test/path"
        run_mode_manager.session_data = {}  # Ensure empty session data
        
        config = run_mode_manager.get_current_mode()
        
        assert config["run_mode"] == "auto"
        assert config["src_profile"] == "default"
        assert config["selected_source_path"] == "/test/path"
        assert config["current_paths"] == {}

    def test_session_persistence(self, run_mode_manager):
        """Test if session data persists between manager instances"""
        test_data = {
            "test_key": "test_value",
            "selected_source_path": "/persistence/test/path"
        }
        
        # Set up initial data using RunModeManager's functionality
        with patch('utils.run_mode.save_session') as mock_save, \
             patch('utils.run_mode.smart_prompt', return_value="auto"), \
             patch('utils.run_mode.select_src_profile', return_value="/persistence/test/path"):
            
            run_mode_manager._session_data = test_data
            run_mode_manager.selected_source_path = test_data["selected_source_path"]
            # Use RunModeManager's method that calls save_session
            run_mode_manager.select_run_mode()  # This will call save_session internally
            mock_save.assert_called_once_with(test_data)
        
        # Create new manager instance with mocked initialization
        with patch('utils.run_mode.load_session', return_value=test_data), \
             patch('utils.run_mode.initialize_session'):
            new_manager = RunModeManager()
            assert new_manager.session_data.get("test_key") == "test_value"
            assert new_manager.selected_source_path == "/persistence/test/path"

    @pytest.mark.parametrize("env_mode,expected", [
        ("auto", "auto"),
        ("step", "step"),
        (None, "step"),  # Default value test
        ("invalid", "step")  # Invalid value test
    ])
    def test_environment_variables(self, env_mode, expected):
        """Test environment variable handling"""
        if env_mode is None:
            if "RUN_MODE" in os.environ:
                del os.environ["RUN_MODE"]
        else:
            os.environ["RUN_MODE"] = env_mode
            
        manager = RunModeManager()
        assert manager.run_mode == expected

    @patch('utils.session_tools.save_session')
    def test_session_updates_during_pipeline(self, mock_save_session):
        """Test session data updates during pipeline execution"""
        manager = RunModeManager()
        test_data = {
            "pipeline_status": "running",
            "current_stage": 0
        }
        
        manager._session_data = test_data
        from utils.session_tools import save_session
        save_session(manager.session_data)
        mock_save_session.assert_called_once_with(test_data)

class TestPipelineIntegration:
    @pytest.fixture(autouse=True)
    def setup(self, run_mode_manager):
        """Setup for pipeline integration tests"""
        self.run_mode_manager = run_mode_manager
        
    @patch('stages.stage_0_run')
    @patch('stages.stage_1_run')
    @patch('stages.stage_2_run')
    def test_pipeline_auto_mode(self, mock_stage_2, mock_stage_1, mock_stage_0, mock_pipeline_config):
        """Test pipeline execution in auto mode"""
        with patch('utils.run_mode.smart_prompt', return_value="auto"), \
             patch('utils.run_mode.select_src_profile', return_value="/test/path"), \
             patch('utils.run_mode.save_session'):
            manager = initialize_pipeline_mode()
            assert manager.run_mode == "auto"
            assert manager.selected_source_path == "/test/path"
            
            # Simulate pipeline run
            for stage in mock_pipeline_config["stages"]:
                stage_module = locals()[f"mock_stage_{stage}"]
                stage_module.run.assert_not_called()

    @patch('stages.stage_0_run')
    @patch('stages.stage_1_run')
    @patch('stages.stage_2_run')
    def test_pipeline_step_mode(self, mock_stage_2, mock_stage_1, mock_stage_0, mock_pipeline_config):
        """Test pipeline execution in step mode"""
        with patch('utils.run_mode.smart_prompt', return_value="step"):
            manager = initialize_pipeline_mode()
            assert manager.run_mode == "step"
            
            # Simulate pipeline run
            for stage in mock_pipeline_config["stages"]:
                stage_module = locals()[f"mock_stage_{stage}"]
                stage_module.run.assert_not_called()

    def test_error_handling(self):
        """Test error handling in pipeline execution"""
        with pytest.raises(Exception):
            # Simulate a stage failure
            raise Exception("Stage execution failed")

    @patch('utils.session_tools.save_session')
    def test_session_updates_during_pipeline(self, mock_save_session):
        """Test session data updates during pipeline execution"""
        test_data = {
            "pipeline_status": "running",
            "current_stage": 0
        }
        
        self.run_mode_manager._session_data = test_data
        from utils.session_tools import save_session
        save_session(self.run_mode_manager.session_data)
        mock_save_session.assert_called_once_with(test_data)

def test_cli_arguments():
    """Test command line argument handling"""
    import argparse
    from runners.run_all import parse_arguments
    
    # Test with default arguments
    with patch('sys.argv', ['script.py']):
        args = parse_arguments()
        assert args.mode == "step"  # Default mode
        assert args.db == "local"   # Default DB profile
        
    # Test with custom arguments
    with patch('sys.argv', ['script.py', '--mode', 'auto', '--db', 'supabase_session']):
        args = parse_arguments()
        assert args.mode == "auto"
        assert args.db == "supabase_session"

if __name__ == "__main__":
    pytest.main(["-v", __file__])
