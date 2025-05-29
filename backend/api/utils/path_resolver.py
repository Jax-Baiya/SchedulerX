import os
import platform
from pathlib import Path
from typing import Union, Optional, Dict
import logging

logger = logging.getLogger(__name__)

def is_wsl_path(path: str) -> bool:
    """Check if a path is in WSL format (/mnt/c/...)"""
    return path.startswith("/mnt/") and len(path) > 6 and path[5] == '/'

def wsl_to_windows(path: str) -> str:
    """Convert a WSL path (/mnt/c/Users/...) to a Windows path (C:\\Users\\...)"""
    if path.startswith("/mnt/") and len(path) > 6:
        drive_letter = path[5].upper()
        sub_path = path[6:].replace("/", "\\")
        return f"{drive_letter}:{sub_path}"
    return path

def windows_to_wsl(path: str) -> str:
    """Convert a Windows path (C:\\Users\\...) to a WSL path (/mnt/c/Users/...)"""
    if ":" in path:
        drive_letter, rest = path.split(":", 1)
        rest = rest.replace("\\", "/")
        return f"/mnt/{drive_letter.lower()}{rest}"
    return path

def normalize_path(path: Union[str, Path]) -> str:
    """Normalize a path to the current OS format"""
    if isinstance(path, Path):
        path = str(path)
    
    system = platform.system()
    if system == "Windows" and path.startswith("/mnt/"):
        return wsl_to_windows(path)
    elif system in ("Linux", "Darwin") and ":" in path:
        return windows_to_wsl(path)
    return path

def validate_path(path: Union[str, Path]) -> bool:
    """Check if the file exists and is accessible"""
    try:
        resolved = Path(normalize_path(path))
        return resolved.exists() and os.access(resolved, os.R_OK)
    except Exception as e:
        logger.error(f"Error validating path {path}: {str(e)}")
        return False

def resolve_media_path(relative_path: Union[str, Path], base_dir: Union[str, Path]) -> Path:
    """Resolve a relative media path using the base directory"""
    if isinstance(relative_path, str):
        relative_path = Path(relative_path)
    if isinstance(base_dir, str):
        base_dir = Path(base_dir)
    
    return (base_dir / relative_path).resolve()

def get_relative_path(full_path: Union[str, Path], base_dir: Union[str, Path]) -> Path:
    """Convert a full path to a relative path from the base directory"""
    if isinstance(full_path, str):
        full_path = Path(full_path)
    if isinstance(base_dir, str):
        base_dir = Path(base_dir)
    
    try:
        return full_path.relative_to(base_dir)
    except ValueError:
        logger.error(f"Path {full_path} is not relative to {base_dir}")
        return full_path

def ensure_path_exists(path: Union[str, Path]) -> bool:
    """Ensure a directory exists, create if it doesn't"""
    try:
        Path(path).mkdir(parents=True, exist_ok=True)
        return True
    except Exception as e:
        logger.error(f"Error creating directory {path}: {str(e)}")
        return False

def is_docker() -> bool:
    """Check if the current environment is running inside Docker"""
    docker_env = os.path.exists('/.dockerenv')
    cgroup = False
    
    try:
        with open('/proc/1/cgroup', 'rt') as f:
            cgroup = 'docker' in f.read()
    except Exception:
        pass
    
    return docker_env or cgroup

def docker_host_to_container_path(host_path: str, mapping: Dict[str, str]) -> str:
    """
    Convert a host path to its corresponding container path using the provided mapping.
    
    Args:
        host_path: The path on the host system
        mapping: Dictionary mapping host path prefixes to container path prefixes
        
    Returns:
        The corresponding container path
    """
    normalized = normalize_path(host_path)
    for host_prefix, container_prefix in mapping.items():
        if normalized.startswith(host_prefix):
            return normalized.replace(host_prefix, container_prefix, 1)
    return normalized

def check_permissions(
    path: Union[str, Path], 
    read: bool = True, 
    write: bool = False, 
    execute: bool = False
) -> Dict[str, bool]:
    """
    Check specific permissions for a given path.
    
    Args:
        path: Path to check
        read: Check read permission
        write: Check write permission
        execute: Check execute permission
        
    Returns:
        Dictionary with permission check results
    """
    try:
        normalized = Path(normalize_path(path))
        result = {
            "exists": normalized.exists(),
            "read": False,
            "write": False,
            "execute": False
        }
        
        if result["exists"]:
            if read:
                result["read"] = os.access(normalized, os.R_OK)
            if write:
                result["write"] = os.access(normalized, os.W_OK)
            if execute:
                result["execute"] = os.access(normalized, os.X_OK)
                
        return result
    except Exception as e:
        logger.error(f"Error checking permissions for {path}: {str(e)}")
        return {
            "exists": False,
            "read": False,
            "write": False,
            "execute": False
        }

def sanitize_path(path: Union[str, Path], base_dir: Optional[Union[str, Path]] = None) -> str:
    """
    Sanitize and validate a path, optionally ensuring it's within a base directory.
    
    Args:
        path: Path to sanitize
        base_dir: Optional base directory the path must be within
        
    Returns:
        Sanitized absolute path
        
    Raises:
        ValueError: If path traversal is detected or path is outside base_dir
    """
    try:
        # Convert to Path object and resolve
        p = Path(normalize_path(path)).resolve()
        
        # Check for base directory constraint
        if base_dir is not None:
            base = Path(normalize_path(base_dir)).resolve()
            try:
                p.relative_to(base)
            except ValueError:
                raise ValueError(f"Path {p} is outside base directory {base}")
        
        # Additional security checks
        if '..' in p.parts:
            raise ValueError(f"Path traversal detected in {path}")
            
        # Check if path exists and is accessible
        if not validate_path(p):
            logger.warning(f"Path {p} does not exist or is not accessible")
            
        return str(p)
    except Exception as e:
        logger.error(f"Error sanitizing path {path}: {str(e)}")
        raise 