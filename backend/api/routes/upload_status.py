from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.upload_status import UploadStatus

router = APIRouter()

class UploadStatusOut(BaseModel):
    id: str
    status: Optional[str]
    created_at: Optional[str]
    class Config:
        orm_mode = True

class UploadStatusIn(BaseModel):
    status: Optional[str]
    created_at: Optional[str]

@router.get("/upload_status", response_model=List[UploadStatusOut], summary="List upload status records", description="List/search upload status records.")
def list_upload_status(
    search: Optional[str] = Query(None, description="Search by id or status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(UploadStatus)
    if search:
        query = query.filter((UploadStatus.id.ilike(f"%{search}%")) | (UploadStatus.status.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/upload_status/{id}", response_model=UploadStatusOut, summary="Get upload status by ID")
def get_upload_status(id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    record = db.query(UploadStatus).filter(UploadStatus.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Upload status record not found")
    return record

@router.post("/upload_status", response_model=UploadStatusOut, summary="Create upload status record")
def create_upload_status(record: UploadStatusIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = UploadStatus(**record.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/upload_status/{id}", response_model=UploadStatusOut, summary="Update upload status record")
def update_upload_status(id: str, record: UploadStatusIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(UploadStatus).filter(UploadStatus.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Upload status record not found")
    for k, v in record.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/upload_status/{id}", summary="Delete upload status record")
def delete_upload_status(id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(UploadStatus).filter(UploadStatus.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Upload status record not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
