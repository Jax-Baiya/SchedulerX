from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.api.middleware.auth import get_current_user
from pydantic import BaseModel
from ..dependencies import get_db
from ..models.setting import Setting

router = APIRouter()

class SettingsOut(BaseModel):
    key: str
    value: str
    class Config:
        orm_mode = True

@router.get("/settings", response_model=list[SettingsOut], summary="List all settings", description="Get all user/system settings.")
def get_settings(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Get all settings."""
    return db.query(Setting).all()

@router.put("/settings/{key}", response_model=SettingsOut, summary="Update a setting", description="Update a user/system setting by key.")
def update_setting(key: str, setting: SettingsOut, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    """Update a setting by key."""
    db_setting = db.query(Setting).filter(Setting.key == key).first()
    if not db_setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    db_setting.value = setting.value
    db.commit()
    db.refresh(db_setting)
    return db_setting
