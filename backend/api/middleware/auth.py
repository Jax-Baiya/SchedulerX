# backend/api/middleware/auth.py
from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from typing import Optional
from backend.api.config import settings
import os
import requests
from functools import lru_cache

# Use FastAPI's HTTPBearer for extracting the token
bearer_scheme = HTTPBearer()

def get_current_supabase_project_id():
    db_profile = os.getenv("DB_PROFILE", "supabase_session")
    # Normalize profile name for env var lookup
    profile_key = db_profile.upper().replace("-", "_")
    # Try SUPABASE_<PROFILE>_PROJECT_REF first
    env_var = f"SUPABASE_{profile_key}_PROJECT_REF"
    project_ref = os.getenv(env_var)
    if project_ref:
        return project_ref
    # Fallbacks for legacy keys
    if "2" in db_profile:
        return os.getenv("SUPABASE_2_PROJECT_REF")
    return os.getenv("SUPABASE_PROJECT_REF")

def get_supabase_jwks(project_id):
    jwks_url = f"https://{project_id}.supabase.co/auth/v1/keys"
    resp = requests.get(jwks_url)
    resp.raise_for_status()
    return resp.json()["keys"]

# User extraction and validation dependency (Supabase Auth only)
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)) -> dict:
    token = credentials.credentials
    try:
        project_id = get_current_supabase_project_id()
        jwks = get_supabase_jwks(project_id)
        payload = jwt.decode(token, jwks, algorithms=["RS256"], options={"verify_aud": False})
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials (no subject)",
                headers={"WWW-Authenticate": "Bearer"},
            )
        # Optionally, add more user info from payload
        return {"user_id": user_id, **payload}
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Supabase JWT",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Optionally, a middleware class for logging or global enforcement (not required for per-route auth)
