import sys
from pathlib import Path
from typing import Dict, Any, Optional
from ..models.session import SessionConfig
from ..dependencies import logger

# Add pipeline_v2 to Python path
pipeline_path = Path(__file__).parent.parent.parent / "pipeline_v2"
sys.path.append(str(pipeline_path))

from utils.session_tools import SessionData, initialize_session

class SessionService:
    def __init__(self):
        self._session_data = None
        initialize_session()  # Ensure session is initialized
    
    @property
    def session_data(self) -> SessionData:
        if self._session_data is None:
            self._session_data = SessionData()
        return self._session_data
    
    def get_session(self) -> Dict[str, Any]:
        """Get current session data"""
        try:
            return self.session_data.get_data()
        except Exception as e:
            logger.error(f"Failed to get session data: {str(e)}")
            return {}
    
    def update_session(self, config: SessionConfig) -> Dict[str, Any]:
        """Update session with new configuration"""
        try:
            current_data = self.get_session()
            # Convert Pydantic model to dict and update current session
            new_data = {**current_data, **config.dict()}
            self.session_data.save_data(new_data)
            logger.info("Session updated successfully")
            return new_data
        except Exception as e:
            logger.error(f"Failed to update session: {str(e)}")
            raise
    
    def reset_session(self) -> Dict[str, Any]:
        """Reset session to default values"""
        try:
            default_session = {}
            self.session_data.save_data(default_session)
            logger.info("Session reset to defaults")
            return default_session
        except Exception as e:
            logger.error(f"Failed to reset session: {str(e)}")
            raise 