from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.videos import Video

router = APIRouter()

class VideoOut(BaseModel):
    video_id: str
    author_id: Optional[str]
    video_path: Optional[str]
    cover_path: Optional[str]
    title: Optional[str]
    description: Optional[str]
    tags: Optional[str]
    upload_status: Optional[str]
    class Config:
        orm_mode = True

class VideoIn(BaseModel):
    author_id: Optional[str]
    video_path: Optional[str]
    cover_path: Optional[str]
    title: Optional[str]
    description: Optional[str]
    tags: Optional[str]
    upload_status: Optional[str]

@router.get("/videos", response_model=List[VideoOut], summary="List videos", description="List/search videos.")
def list_videos(
    search: Optional[str] = Query(None, description="Search by title or description"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Video)
    if search:
        query = query.filter((Video.title.ilike(f"%{search}%")) | (Video.description.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/videos/{video_id}", response_model=VideoOut, summary="Get video by ID")
def get_video(video_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    video = db.query(Video).filter(Video.video_id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video

@router.post("/videos", response_model=VideoOut, summary="Create video")
def create_video(video: VideoIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Video(**video.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/videos/{video_id}", response_model=VideoOut, summary="Update video")
def update_video(video_id: str, video: VideoIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Video).filter(Video.video_id == video_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Video not found")
    for k, v in video.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/videos/{video_id}", summary="Delete video")
def delete_video(video_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Video).filter(Video.video_id == video_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Video not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
