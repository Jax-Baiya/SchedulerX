from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.following import Following

router = APIRouter()

class FollowingOut(BaseModel):
    user_id: str
    following_id: str
    created_at: Optional[str]
    class Config:
        orm_mode = True

class FollowingIn(BaseModel):
    created_at: Optional[str]

@router.get("/following", response_model=List[FollowingOut], summary="List following", description="List/search following.")
def list_following(
    search: Optional[str] = Query(None, description="Search by user_id or following_id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Following)
    if search:
        query = query.filter((Following.user_id.ilike(f"%{search}%")) | (Following.following_id.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/following/{user_id}/{following_id}", response_model=FollowingOut, summary="Get following by IDs")
def get_following(user_id: str, following_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    following = db.query(Following).filter(Following.user_id == user_id, Following.following_id == following_id).first()
    if not following:
        raise HTTPException(status_code=404, detail="Following not found")
    return following

@router.post("/following", response_model=FollowingOut, summary="Create following")
def create_following(following: FollowingIn, user_id: str = Body(...), following_id: str = Body(...), db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Following(user_id=user_id, following_id=following_id, **following.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/following/{user_id}/{following_id}", response_model=FollowingOut, summary="Update following")
def update_following(user_id: str, following_id: str, following: FollowingIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Following).filter(Following.user_id == user_id, Following.following_id == following_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Following not found")
    for k, v in following.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/following/{user_id}/{following_id}", summary="Delete following")
def delete_following(user_id: str, following_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Following).filter(Following.user_id == user_id, Following.following_id == following_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Following not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
