from fastapi import APIRouter, Depends, HTTPException
from ..models.session import SessionConfig
from ..dependencies import get_session_service, logger
from ..services.session_service import SessionService

router = APIRouter()

@router.get("/session", response_model=SessionConfig)
async def get_session(
    session_service: SessionService = Depends(get_session_service)
):
    """Get current session configuration"""
    try:
        session_data = session_service.get_session()
        return SessionConfig(**session_data)
    except Exception as e:
        logger.error(f"Failed to get session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve session")

@router.put("/session", response_model=SessionConfig)
async def update_session(
    config: SessionConfig,
    session_service: SessionService = Depends(get_session_service)
):
    """Update session configuration"""
    try:
        updated_data = session_service.update_session(config)
        return SessionConfig(**updated_data)
    except Exception as e:
        logger.error(f"Failed to update session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update session")

@router.delete("/session")
async def reset_session(
    session_service: SessionService = Depends(get_session_service)
):
    """Reset session to default values"""
    try:
        session_service.reset_session()
        return {"message": "Session reset successfully"}
    except Exception as e:
        logger.error(f"Failed to reset session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to reset session") 