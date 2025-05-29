from fastapi import APIRouter, Depends, HTTPException, status, Body
from typing import List
from sqlalchemy.orm import Session
from enum import Enum
from datetime import datetime

from ..models.upload import UploadRequest, UploadResponse
from ..models.media import MediaUpload, UploadState
from ..services.r2_uploader import R2UploadService
from ..dependencies import get_upload_service, get_db
from ..services.social.pinterest import pinterest_service
from ..services.social.base import SocialPostStatus
from ..services.social.instagram import instagram_service
from ..services.social.tiktok import tiktok_service
from backend.api.middleware.auth import get_current_user

router = APIRouter(prefix="/upload", tags=["upload"])

class PinterestPostStatus(str, Enum):
    PENDING = "pending"
    VALIDATING = "validating"
    SCHEDULED = "scheduled"
    POSTED = "posted"
    FAILED = "failed"

# In-memory simulation store (replace with DB in production)
pinterest_posts = {}

@router.post("/", response_model=UploadResponse)
async def upload_files(
    request: UploadRequest,
    upload_service: R2UploadService = Depends(get_upload_service),
    user: dict = Depends(get_current_user)
):
    """
    Upload files to R2 and update metadata
    """
    result = await upload_service.upload_files(
        files=request.files,
        destination=request.destination,
        media_metadata=request.media_metadata
    )
    return UploadResponse(**result)

@router.get("/status/{upload_id}")
async def get_upload_status(
    upload_id: str,
    upload_service: R2UploadService = Depends(get_upload_service),
    user: dict = Depends(get_current_user)
):
    """
    Get status of a specific upload
    """
    session_data = upload_service.session.get_data()
    uploads = session_data.get("uploads", [])
    
    for upload in uploads:
        if upload.get("id") == upload_id:
            return upload
            
    raise HTTPException(status_code=404, detail="Upload not found")

@router.get("/status/db/{upload_id}")
def get_upload_status_db(
    upload_id: int,
    db: Session = Depends(get_db)
):
    """
    Get upload status and metadata from the database by upload_id
    """
    record = db.query(MediaUpload).filter_by(id=upload_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Upload not found in DB")
    return {
        "id": record.id,
        "file_path": record.file_path,
        "destination": record.destination,
        "status": record.status.value,
        "error_message": record.error_message,
        "r2_url": record.r2_url,
        "mime_type": record.mime_type,
        "file_size": record.file_size,
        "duration": record.duration,
        "width": record.width,
        "height": record.height,
        "media_metadata": record.media_metadata,
        "timestamp": record.timestamp,
    }

@router.get("/status/db/{upload_id}/details")
def get_upload_status_db_details(
    upload_id: int,
    db: Session = Depends(get_db)
):
    """
    Get upload status, metadata, and analytics for a given upload_id
    """
    record = db.query(MediaUpload).filter_by(id=upload_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Upload not found in DB")
    return {
        "id": record.id,
        "file_path": record.file_path,
        "destination": record.destination,
        "status": record.status.value,
        "error_message": record.error_message,
        "r2_url": record.r2_url,
        "mime_type": record.mime_type,
        "file_size": record.file_size,
        "duration": record.duration,
        "width": record.width,
        "height": record.height,
        "media_metadata": record.media_metadata,
        "timestamp": record.timestamp,
        # Analytics fields (example, can be expanded)
        "process_time": record.media_metadata.get("process_time") if record.media_metadata else None,
        "request_count": record.media_metadata.get("request_count") if record.media_metadata else None,
    }

@router.get("/batch/status/{destination}")
def get_batch_upload_status(
    destination: str,
    db: Session = Depends(get_db)
):
    """
    Get progress and status for all uploads to a given destination (batch).
    """
    records = db.query(MediaUpload).filter_by(destination=destination).all()
    if not records:
        raise HTTPException(status_code=404, detail="No uploads found for this destination")
    return [
        {
            "id": r.id,
            "file_path": r.file_path,
            "status": r.status.value,
            "error_message": r.error_message,
            "r2_url": r.r2_url,
            "mime_type": r.mime_type,
            "file_size": r.file_size,
            "duration": r.duration,
            "width": r.width,
            "height": r.height,
            "media_metadata": r.media_metadata,
            "timestamp": r.timestamp,
        }
        for r in records
    ]

@router.get("/errors/{destination}")
def get_upload_errors(
    destination: str,
    db: Session = Depends(get_db)
):
    """
    Get all failed uploads and error messages for a given destination.
    """
    records = db.query(MediaUpload).filter_by(destination=destination, status=UploadState.FAILED).all()
    return [
        {
            "id": r.id,
            "file_path": r.file_path,
            "error_message": r.error_message,
            "timestamp": r.timestamp,
        }
        for r in records
    ]

@router.get("/status/summary/{destination}")
def get_upload_status_summary(
    destination: str,
    db: Session = Depends(get_db)
):
    """
    Get a summary of upload statuses (counts by state) for a given destination.
    """
    from ..models.media import UploadState
    records = db.query(MediaUpload).filter_by(destination=destination).all()
    summary = {state.value: 0 for state in UploadState}
    for r in records:
        summary[r.status.value] += 1
    return summary

# --- Social Media Integration (modularized) ---
@router.post("/social/pinterest/simulate")
def pinterest_simulate_post(
    content: dict = Body(...),
    schedule_time: datetime = None
):
    return pinterest_service.simulate_post(content, schedule_time)

@router.get("/social/pinterest/simulate/status/{post_id}")
def pinterest_post_status(post_id: str):
    post = pinterest_service.get_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "error": post["error"], "retries": post["retries"]}

@router.post("/social/pinterest/simulate/process/{post_id}")
def pinterest_post_process(post_id: str):
    post = pinterest_service.process_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}

@router.post("/social/pinterest/simulate/retry/{post_id}")
def pinterest_post_retry(post_id: str):
    post = pinterest_service.retry_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "retries": post["retries"], "error": post["error"]}

@router.post("/social/pinterest/simulate/cleanup/{post_id}")
def pinterest_post_cleanup(post_id: str):
    post = pinterest_service.cleanup_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}

# --- Instagram Integration (modularized) ---
@router.post("/social/instagram/simulate")
def instagram_simulate_post(content: dict = Body(...), schedule_time: datetime = None):
    return instagram_service.simulate_post(content, schedule_time)

@router.get("/social/instagram/simulate/status/{post_id}")
def instagram_post_status(post_id: str):
    post = instagram_service.get_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "error": post["error"], "retries": post["retries"]}

@router.post("/social/instagram/simulate/process/{post_id}")
def instagram_post_process(post_id: str):
    post = instagram_service.process_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}

@router.post("/social/instagram/simulate/retry/{post_id}")
def instagram_post_retry(post_id: str):
    post = instagram_service.retry_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "retries": post["retries"], "error": post["error"]}

@router.post("/social/instagram/simulate/cleanup/{post_id}")
def instagram_post_cleanup(post_id: str):
    post = instagram_service.cleanup_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}

# --- TikTok Integration (modularized) ---
@router.post("/social/tiktok/simulate")
def tiktok_simulate_post(content: dict = Body(...), schedule_time: datetime = None):
    return tiktok_service.simulate_post(content, schedule_time)

@router.get("/social/tiktok/simulate/status/{post_id}")
def tiktok_post_status(post_id: str):
    post = tiktok_service.get_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "error": post["error"], "retries": post["retries"]}

@router.post("/social/tiktok/simulate/process/{post_id}")
def tiktok_post_process(post_id: str):
    post = tiktok_service.process_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}

@router.post("/social/tiktok/simulate/retry/{post_id}")
def tiktok_post_retry(post_id: str):
    post = tiktok_service.retry_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"], "retries": post["retries"], "error": post["error"]}

@router.post("/social/tiktok/simulate/cleanup/{post_id}")
def tiktok_post_cleanup(post_id: str):
    post = tiktok_service.cleanup_post(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"post_id": post_id, "status": post["status"]}
