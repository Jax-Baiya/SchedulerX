from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from ..dependencies import get_db
from ..services.media import get_media_list, get_media_detail
from backend.api.middleware.auth import get_current_user

from pydantic import BaseModel

router = APIRouter()

class MediaOut(BaseModel):
    """
    Media output schema for API responses.
    """
    id: int
    filename: str
    path: str
    size: Optional[int]
    created_at: Optional[str]
    # Add more fields as needed

    class Config:
        orm_mode = True

@router.get("/media", response_model=List[MediaOut], summary="List media files", description="Paginated list of media files.")
def list_media(
    skip: int = Query(0, ge=0, description="Number of items to skip for pagination"),
    limit: int = Query(20, ge=1, le=100, description="Max number of items to return"),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    """
    Get a paginated list of media files.
    """
    media_list = get_media_list(db, skip=skip, limit=limit)
    return media_list

@router.get("/media/{media_id}", response_model=MediaOut, summary="Get media details", description="Get details for a single media file by ID.")
def get_media(media_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """
    Get details for a single media file by ID.
    """
    media = get_media_detail(db, media_id)
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return media
