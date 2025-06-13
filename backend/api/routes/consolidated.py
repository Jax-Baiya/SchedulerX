from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from ..dependencies import get_db
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from backend.api.models.consolidated import Consolidated

router = APIRouter()

class ConsolidatedOut(BaseModel):
    id: str
    data: Optional[str]
    created_at: Optional[str]
    class Config:
        orm_mode = True

class ConsolidatedIn(BaseModel):
    data: Optional[str]
    created_at: Optional[str]

@router.get("/consolidated", response_model=List[ConsolidatedOut], summary="List consolidated records", description="List/search consolidated records.")
def list_consolidated(
    search: Optional[str] = Query(None, description="Search by id or data"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    query = db.query(Consolidated)
    if search:
        query = query.filter((Consolidated.id.ilike(f"%{search}%")) | (Consolidated.data.ilike(f"%{search}%")))
    return query.offset(skip).limit(limit).all()

@router.get("/consolidated/{id}", response_model=ConsolidatedOut, summary="Get consolidated by ID")
def get_consolidated(id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    record = db.query(Consolidated).filter(Consolidated.id == id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Consolidated record not found")
    return record

@router.post("/consolidated", response_model=ConsolidatedOut, summary="Create consolidated record")
def create_consolidated(record: ConsolidatedIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = Consolidated(**record.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@router.put("/consolidated/{id}", response_model=ConsolidatedOut, summary="Update consolidated record")
def update_consolidated(id: str, record: ConsolidatedIn, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Consolidated).filter(Consolidated.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Consolidated record not found")
    for k, v in record.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/consolidated/{id}", summary="Delete consolidated record")
def delete_consolidated(id: str, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    obj = db.query(Consolidated).filter(Consolidated.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Consolidated record not found")
    db.delete(obj)
    db.commit()
    return {"ok": True}
