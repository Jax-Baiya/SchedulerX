from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..dependencies import get_db
from ..models.scheduled_post import ScheduledPost, PostStatus
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class ScheduledPostOut(BaseModel):
    """
    Scheduled post output schema for API responses.
    """
    id: int
    platform: str
    media_path: str
    caption: str = None
    scheduled_time: datetime
    status: PostStatus
    result: dict = None
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

@router.get("/scheduler", response_model=List[ScheduledPostOut], summary="List scheduled posts", description="Get all scheduled posts.")
def list_scheduled_posts(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """
    Get all scheduled posts.
    """
    return db.query(ScheduledPost).all()

@router.post("/scheduler", response_model=ScheduledPostOut, summary="Create scheduled post", description="Create a new scheduled post.")
def create_scheduled_post(post: ScheduledPostOut, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """
    Create a new scheduled post.
    """
    db_post = ScheduledPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@router.get("/scheduler/{post_id}", response_model=ScheduledPostOut, summary="Get scheduled post", description="Get a scheduled post by ID.")
def get_scheduled_post(post_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """
    Get a scheduled post by ID.
    """
    post = db.query(ScheduledPost).filter(ScheduledPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Scheduled post not found")
    return post

@router.delete("/scheduler/{post_id}", summary="Delete scheduled post", description="Delete a scheduled post by ID.")
def delete_scheduled_post(post_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """
    Delete a scheduled post by ID.
    """
    post = db.query(ScheduledPost).filter(ScheduledPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Scheduled post not found")
    db.delete(post)
    db.commit()
    return {"message": "Deleted"}
