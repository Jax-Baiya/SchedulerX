from fastapi import APIRouter, Depends
from backend.api.middleware.auth import get_current_user

router = APIRouter()

@router.get("/")
async def get_analytics(user: dict = Depends(get_current_user)):
    """
    Get analytics data
    """
    return {"message": "Analytics endpoint - To be implemented"}

@router.get("/summary")
async def get_analytics_summary(user: dict = Depends(get_current_user)):
    """
    Get analytics summary
    """
    return {"message": "Analytics summary endpoint - To be implemented"}
