from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.texts import Text

router = APIRouter()

class TextOut(BaseModel):
    text_id: str
    content: Optional[str]
    author_id: Optional[str]
    created_at: Optional[str]
    class Config:
        orm_mode = True

class TextIn(BaseModel):
    content: Optional[str]
    author_id: Optional[str]
    created_at: Optional[str]

@router.get("/texts", response_model=List[TextOut], summary="List texts", description="List/search texts.")
def list_texts(
    search: Optional[str] = Query(None, description="Search by content or author_id"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Text)
    if search:
        query = query.filter((Text.content.ilike(f"%{search}%")) | (Text.author_id.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/texts/{text_id}", response_model=TextOut, summary="Get text by ID")
def get_text(text_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    text = db.query(Text).filter(Text.text_id == text_id).first()
    if not text:
        raise HTTPException(status_code=404, detail="Text not found")
    return text

@router.post("/texts", response_model=TextOut, summary="Create text")
def create_text(text: TextIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Text(**text.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/texts/{text_id}", response_model=TextOut, summary="Update text")
def update_text(text_id: str, text: TextIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Text).filter(Text.text_id == text_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Text not found")
    for k, v in text.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/texts/{text_id}", summary="Delete text")
def delete_text(text_id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Text).filter(Text.text_id == text_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Text not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
