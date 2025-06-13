from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.authors import Author

router = APIRouter()

class AuthorOut(BaseModel):
    author_id: str
    unique_id: Optional[str]
    nickname: Optional[str]
    follower_count: Optional[int]
    heart_count: Optional[int]
    video_count: Optional[int]
    signature: Optional[str]
    private_account: Optional[bool]
    class Config:
        orm_mode = True

class AuthorIn(BaseModel):
    unique_id: Optional[str]
    nickname: Optional[str]
    follower_count: Optional[int]
    heart_count: Optional[int]
    video_count: Optional[int]
    signature: Optional[str]
    private_account: Optional[bool]

@router.get("/authors", response_model=List[AuthorOut], summary="List authors", description="List/search authors.")
def list_authors(
    search: Optional[str] = Query(None, description="Search by nickname or unique_id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Author)
    if search:
        query = query.filter((Author.nickname.ilike(f"%{search}%")) | (Author.unique_id.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/authors/{author_id}", response_model=AuthorOut, summary="Get author by ID")
def get_author(author_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    author = db.query(Author).filter(Author.author_id == author_id).first()
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

@router.post("/authors", response_model=AuthorOut, summary="Create author")
def create_author(author: AuthorIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Author(**author.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/authors/{author_id}", response_model=AuthorOut, summary="Update author")
def update_author(author_id: str, author: AuthorIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Author).filter(Author.author_id == author_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Author not found")
    for k, v in author.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/authors/{author_id}", summary="Delete author")
def delete_author(author_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Author).filter(Author.author_id == author_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Author not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
