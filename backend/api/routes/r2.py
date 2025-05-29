from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Query
from typing import List, Optional, Dict, Any
from ..services.r2_service import R2Service
from ..dependencies import get_r2_service
from ..models.r2 import (
    FileValidationConfig, FileMetadata, UploadResponse,
    BatchUploadResponse, PresignedUrlResponse, FileListResponse
)
from backend.api.middleware.auth import get_current_user

router = APIRouter(
    prefix="/r2",
    tags=["r2"],
    responses={
        400: {"description": "Bad Request - Invalid input or validation failed"},
        401: {"description": "Unauthorized - Invalid credentials"},
        403: {"description": "Forbidden - Insufficient permissions"},
        404: {"description": "Not Found - Resource not found"},
        500: {"description": "Internal Server Error - R2 operation failed"}
    }
)

@router.get(
    "/test-connection",
    response_model=Dict[str, bool],
    summary="Test R2 Connection",
    description="Test the connection to Cloudflare R2 and verify bucket existence"
)
async def test_r2_connection(
    r2_service: R2Service = Depends(get_r2_service),
    user: dict = Depends(get_current_user)
) -> Dict[str, bool]:
    """
    Test the R2 connection and bucket existence.
    
    Returns:
        Dict containing connection status and bucket existence
    """
    return await r2_service.test_connection()

@router.post(
    "/upload/multipart",
    response_model=UploadResponse,
    summary="Multipart Upload",
    description="Upload a large file using multipart upload"
)
async def multipart_upload(
    file: UploadFile = File(..., description="File to upload"),
    key: Optional[str] = Query(None, description="Custom key (filename) in bucket"),
    metadata: Optional[str] = Query(None, description="Custom metadata as JSON string to attach"),
    r2_service: R2Service = Depends(get_r2_service),
    user: dict = Depends(get_current_user)
) -> UploadResponse:
    """
    Upload a large file using multipart upload.
    
    Args:
        file: File to upload
        key: Optional custom key (filename) in bucket
        metadata: Optional metadata to attach to the file (JSON string)
        
    Returns:
        UploadResponse with upload details
    """
    import json
    metadata_dict = None
    if metadata:
        try:
            metadata_dict = json.loads(metadata)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid metadata JSON")
    return await r2_service.multipart_upload(file, key, metadata_dict)

@router.post(
    "/upload/batch",
    response_model=BatchUploadResponse,
    summary="Batch Upload",
    description="Upload multiple files in parallel"
)
async def batch_upload(
    files: List[UploadFile] = File(..., description="Files to upload"),
    prefix: Optional[str] = Query(None, description="Prefix for file keys"),
    r2_service: R2Service = Depends(get_r2_service)
) -> BatchUploadResponse:
    """
    Upload multiple files in parallel.
    
    Args:
        files: List of files to upload
        prefix: Optional prefix for file keys
        
    Returns:
        BatchUploadResponse with upload results
    """
    return await r2_service.batch_upload(files, prefix)

@router.get(
    "/files",
    response_model=FileListResponse,
    summary="List Files",
    description="List files in the bucket with optional prefix filtering"
)
async def list_files(
    prefix: Optional[str] = Query(None, description="Prefix to filter files"),
    max_keys: int = Query(1000, description="Maximum number of keys to return"),
    r2_service: R2Service = Depends(get_r2_service)
) -> FileListResponse:
    """
    List files in the bucket.
    
    Args:
        prefix: Optional prefix to filter files
        max_keys: Maximum number of keys to return
        
    Returns:
        FileListResponse with list of files
    """
    return await r2_service.list_files(prefix, max_keys)

@router.delete(
    "/files/{key}",
    response_model=Dict[str, bool],
    summary="Delete File",
    description="Delete a file from the bucket"
)
async def delete_file(
    key: str,  # Path parameter, do not use Query
    r2_service: R2Service = Depends(get_r2_service)
) -> Dict[str, bool]:
    """
    Delete a file from the bucket.
    
    Args:
        key: Key (filename) to delete
        
    Returns:
        Dict indicating success
    """
    success = await r2_service.delete_file(key)
    return {"success": success}

@router.get(
    "/files/{key}/presigned",
    response_model=PresignedUrlResponse,
    summary="Generate Presigned URL",
    description="Generate a presigned URL for temporary access"
)
async def get_presigned_url(
    key: str,  # Path parameter, do not use Query
    expiration: int = Query(3600, description="URL expiration time in seconds"),
    method: str = Query("get_object", description="HTTP method allowed with URL"),
    r2_service: R2Service = Depends(get_r2_service)
) -> PresignedUrlResponse:
    """
    Generate a presigned URL for temporary access.
    
    Args:
        key: Key (filename) to generate URL for
        expiration: URL expiration time in seconds
        method: HTTP method allowed with URL
        
    Returns:
        PresignedUrlResponse with URL and expiration details
    """
    return await r2_service.generate_presigned_url(key, expiration, method)

@router.get(
    "/files/{key}/metadata",
    response_model=FileMetadata,
    summary="Get File Metadata",
    description="Get metadata for a file"
)
async def get_file_metadata(
    key: str,  # Path parameter, do not use Query
    r2_service: R2Service = Depends(get_r2_service)
) -> FileMetadata:
    """
    Get metadata for a file.
    
    Args:
        key: Key (filename) to get metadata for
        
    Returns:
        FileMetadata with file details
    """
    return await r2_service.get_file_metadata(key)