from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from backend.api.middleware.auth import get_current_user
import psutil
import os
import platform

router = APIRouter()

@router.get("/admin/health", summary="Health check", description="Get API health status.")
def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

@router.get("/admin/stats", summary="System stats", description="Get server resource usage and stats.")
def system_stats(user: dict = Depends(get_current_user)):
    """Get server resource usage and stats."""
    mem = psutil.virtual_memory()
    cpu = psutil.cpu_percent(interval=0.5)
    return {
        "platform": platform.platform(),
        "cpu_percent": cpu,
        "memory": {
            "total": mem.total,
            "available": mem.available,
            "percent": mem.percent,
            "used": mem.used,
            "free": mem.free
        },
        "pid": os.getpid()
    }

@router.get("/admin/openapi", summary="OpenAPI schema", description="Get the OpenAPI schema for the API.")
def get_openapi_schema():
    """Return the OpenAPI schema for the API."""
    from fastapi.openapi.utils import get_openapi
    from backend.api.main import app
    return get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
