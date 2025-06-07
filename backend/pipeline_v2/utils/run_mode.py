"""
🔄 SchedulerX: Run Mode Manager

Handles the pipeline's execution mode (auto vs step) and associated source profile selection.
"""

from typing import Literal, Optional, Dict
from pathlib import Path
import os
from .prompt import smart_prompt, select_src_profile
from .session_tools import load_session, save_session, initialize_session

RunModeType = Literal["auto", "step"]
SrcProfileType = Literal["default", "custom"]

class RunModeManager:
    def __init__(self):
        # Initialize session system first
        initialize_session()
        
        # Load existing session data
        self._session_data = load_session() or {}
        
        # Get run mode from environment and validate it
        run_mode = os.getenv("RUN_MODE", "step")
        self.run_mode = "step" if run_mode not in ["auto", "step"] else run_mode
        
        self.src_profile = os.getenv("SRC_PROFILE", "default")
        self.selected_source_path = self._session_data.get("selected_source_path")
        
    @property
    def session_data(self):
        return self._session_data

    @session_data.setter
    def session_data(self, value):
        self._session_data = value
        if value and "selected_source_path" in value:
            self.selected_source_path = value["selected_source_path"]

    def select_run_mode(self) -> RunModeType:
        """Prompt user to select run mode."""
        modes = ["auto", "step"]
        prompt = "Select run mode:"
        choice = smart_prompt(prompt, "step", modes)
        self.run_mode = choice
        
        # If auto mode, immediately get the source path to use for all stages
        if self.run_mode == "auto":
            self.selected_source_path = select_src_profile()
            # Save to session for persistence
            self._session_data["selected_source_path"] = self.selected_source_path
            save_session(self._session_data)
            
        return choice

    def select_src_path(self, stage: int = 0) -> str:
        """
        Get source path based on run mode and stage.
        Always prefer session/config values if present (for API-driven runs).
    
    Args:
            stage: Pipeline stage number
    
    Returns:
            Selected source path
        """
        # Prefer src_root from session if set
        src_root = self._session_data.get("src_root")
        if src_root:
            return src_root
        # Fallback: selected_source_path/session
        if self.selected_source_path:
            return self.selected_source_path
        # Fallback: src_profile (if it's a path)
        if self.src_profile and os.path.exists(self.src_profile):
            return self.src_profile
        # If still missing, only prompt in CLI/step mode
        if self.run_mode == "auto":
            return self.selected_source_path or self._session_data.get("selected_source_path")
        else:
            # In step mode, only prompt for stage 0 or if no path is selected yet
            if stage == 0 or not self.selected_source_path:
                self.selected_source_path = select_src_profile()
                self._session_data[f"stage_{stage}_path"] = self.selected_source_path
                save_session(self._session_data)
            return self.selected_source_path

    def get_current_mode(self) -> Dict[str, str]:
        """Get current run mode configuration."""
        return {
            "run_mode": self.run_mode,
            "src_profile": self.src_profile,
            "selected_source_path": self.selected_source_path,
            "current_paths": self._session_data
        }

# Global instance
run_mode_manager = RunModeManager()

def initialize_pipeline_mode() -> RunModeManager:
    """Initialize and return the run mode manager."""
    manager = get_run_mode_manager()
    manager.select_run_mode()  # This will also select source path if in auto mode
    return manager

def get_run_mode_manager() -> RunModeManager:
    """Get the global run mode manager instance."""
    return run_mode_manager

def get_stage_path(stage: int) -> str:
    """Helper function to get path for a specific stage."""
    manager = get_run_mode_manager()
    return manager.select_src_path(stage)
