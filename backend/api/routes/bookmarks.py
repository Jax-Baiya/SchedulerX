from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.bookmarks import Bookmark

router = APIRouter()

class BookmarkOut(BaseModel):
    bookmark_id: str
    user_id: Optional[str]
    media_id: Optional[str]
    created_at: Optional[str]
    class Config:
        orm_mode = True

class BookmarkIn(BaseModel):
    user_id: Optional[str]
    media_id: Optional[str]
    created_at: Optional[str]

@router.get("/bookmarks", response_model=List[BookmarkOut], summary="List bookmarks", description="List/search bookmarks.")
def list_bookmarks(
    search: Optional[str] = Query(None, description="Search by user_id or media_id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Bookmark)
    if search:
        query = query.filter((Bookmark.user_id.ilike(f"%{search}%")) | (Bookmark.media_id.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/bookmarks/{bookmark_id}", response_model=BookmarkOut, summary="Get bookmark by ID")
def get_bookmark(bookmark_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    bookmark = db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return bookmark

@router.post("/bookmarks", response_model=BookmarkOut, summary="Create bookmark")
def create_bookmark(bookmark: BookmarkIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Bookmark(**bookmark.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/bookmarks/{bookmark_id}", response_model=BookmarkOut, summary="Update bookmark")
def update_bookmark(bookmark_id: str, bookmark: BookmarkIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    for k, v in bookmark.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/bookmarks/{bookmark_id}", summary="Delete bookmark")
def delete_bookmark(bookmark_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Bookmark).filter(Bookmark.bookmark_id == bookmark_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
