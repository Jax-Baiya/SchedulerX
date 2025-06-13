from fastapi import APIRouter, Query, HTTPException, Request
from fastapi.responses import JSONResponse
from backend.pipeline_v2.utils.db_profiles import db_profile_manager, DBProfileManager
import os
from dotenv import load_dotenv
from pathlib import Path

router = APIRouter(tags=["db_profiles"])

def reload_db_profiles():
    # Always reload .env and re-initialize DB profiles
    dotenv_path = Path(__file__).resolve().parents[3] / "pipeline_v2" / ".env"
    load_dotenv(dotenv_path=dotenv_path, override=True)
    # Re-instantiate the manager to force re-detection
    return DBProfileManager()

ACTIVE_PROFILE_PATH = Path(__file__).resolve().parents[3] / "pipeline_v2" / "active_db_profile.txt"

@router.get("/db-profiles", summary="List available DB profiles")
def list_db_profiles():
    manager = reload_db_profiles()
    return [
        {"name": p.name, "display_name": p.display_name}
        for p in manager.list_profiles()
    ]

@router.get("/db-profiles/debug", summary="Debug: List all DB profiles with env_prefix")
def debug_db_profiles():
    manager = reload_db_profiles()
    return [
        {"name": p.name, "display_name": p.display_name, "env_prefix": p.env_prefix, "is_supabase": p.is_supabase, "is_transaction": p.is_transaction}
        for p in manager.list_profiles()
    ]

@router.get("/validate-output-dir", summary="Validate output directory")
def validate_output_dir(path: str = Query(..., description="Output directory path to validate")):
    if not os.path.exists(path):
        try:
            os.makedirs(path, exist_ok=True)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Directory does not exist and could not be created: {e}")
    if not os.access(path, os.W_OK):
        raise HTTPException(status_code=400, detail="Directory is not writable")
    return {"valid": True, "message": "Directory is valid and writable"}

@router.post("/db-profiles/select", summary="Set the active DB profile")
async def set_active_db_profile(request: Request):
    data = await request.json()
    profile_name = data.get("profile_name")
    if not profile_name:
        raise HTTPException(status_code=400, detail="profile_name is required")
    manager = reload_db_profiles()
    profile = manager.get_profile(profile_name)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    # Save the active profile name to a file
    with open(ACTIVE_PROFILE_PATH, "w") as f:
        f.write(profile_name)
    return {"active_profile": profile_name}

@router.get("/db-profiles/current", summary="Get the currently active DB profile")
def get_active_db_profile():
    if not ACTIVE_PROFILE_PATH.exists():
        return {"active_profile": None}
    with open(ACTIVE_PROFILE_PATH, "r") as f:
        profile_name = f.read().strip()
    return {"active_profile": profile_name}
