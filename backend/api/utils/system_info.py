import platform
import os
import sys
from pathlib import Path
from typing import Dict, Any
from ..config import settings

def get_system_info() -> Dict[str, Any]:
    """
    Get system information and environment details
    
    Returns:
        Dict containing system metadata
    """
    return {
        "os": {
            "system": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "machine": platform.machine(),
            "processor": platform.processor(),
            "is_64bits": sys.maxsize > 2**32,
            "is_wsl": "microsoft-standard" in platform.uname().release.lower()
        },
        "python": {
            "version": platform.python_version(),
            "implementation": platform.python_implementation(),
            "compiler": platform.python_compiler()
        },
        "paths": {
            "media_dir": str(settings.LOCAL_MEDIA_DIR),
            "pipeline_dir": str(settings.PIPELINE_V2_PATH),
            "runtime_dir": str(settings.RUNTIME_PATH),
            "log_file": settings.LOG_FILE
        },
        "environment": {
            "debug": settings.DEBUG,
            "api_host": settings.API_HOST,
            "api_port": settings.API_PORT
        }
    }

def is_wsl() -> bool:
    """Check if running under Windows Subsystem for Linux"""
    return "microsoft-standard" in platform.uname().release.lower()

def normalize_path(path: str) -> Path:
    """
    Normalize path based on current environment
    
    Args:
        path: Path string to normalize
    
    Returns:
        Normalized Path object
    """
    # Convert to Path object
    path_obj = Path(path)
    
    # Handle WSL paths
    if is_wsl() and path.startswith("/mnt/"):
        # Convert /mnt/c/... to C:/...
        drive = path[5].upper()
        rest = path[7:]
        path_obj = Path(f"{drive}:/{rest}")
    
    return path_obj

def validate_file_access(path: Path) -> bool:
    """
    Validate file/directory exists and is accessible
    
    Args:
        path: Path to validate
    
    Returns:
        True if path exists and is accessible
    """
    try:
        if path.exists():
            # Check read access
            if path.is_file():
                return os.access(path, os.R_OK)
            # Check read & execute for directories
            return os.access(path, os.R_OK | os.X_OK)
        return False
    except Exception:
        return False 