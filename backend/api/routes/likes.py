from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.likes import Like

router = APIRouter()

class LikeOut(BaseModel):
    like_id: str
    user_id: Optional[str]
    media_id: Optional[str]
    created_at: Optional[str]
    class Config:
        orm_mode = True

class LikeIn(BaseModel):
    user_id: Optional[str]
    media_id: Optional[str]
    created_at: Optional[str]

@router.get("/likes", response_model=List[LikeOut], summary="List likes", description="List/search likes.")
def list_likes(
    search: Optional[str] = Query(None, description="Search by user_id or media_id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Like)
    if search:
        query = query.filter((Like.user_id.ilike(f"%{search}%")) | (Like.media_id.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/likes/{like_id}", response_model=LikeOut, summary="Get like by ID")
def get_like(like_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    like = db.query(Like).filter(Like.like_id == like_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    return like

@router.post("/likes", response_model=LikeOut, summary="Create like")
def create_like(like: LikeIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Like(**like.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/likes/{like_id}", response_model=LikeOut, summary="Update like")
def update_like(like_id: str, like: LikeIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Like).filter(Like.like_id == like_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Like not found")
    for k, v in like.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/likes/{like_id}", summary="Delete like")
def delete_like(like_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Like).filter(Like.like_id == like_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
