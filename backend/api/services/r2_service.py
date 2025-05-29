from typing import Optional, Dict, List
import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException
from pathlib import Path
import logging
from ..config import settings

logger = logging.getLogger(__name__)

class R2Service:
    """Service for interacting with Cloudflare R2 storage"""
    
    def __init__(self):
        self.bucket_name = settings.R2_BUCKET_NAME
        self.account_id = settings.R2_ACCOUNT_ID
        self.access_key_id = settings.R2_ACCESS_KEY_ID
        self.secret_access_key = settings.R2_SECRET_ACCESS_KEY
        self.endpoint_url = f"https://{self.account_id}.r2.cloudflarestorage.com"
        
        # Initialize S3 client
        self.client = boto3.client(
            "s3",
            endpoint_url=self.endpoint_url,
            aws_access_key_id=self.access_key_id,
            aws_secret_access_key=self.secret_access_key,
            region_name="auto"
        )
    
    async def test_connection(self) -> Dict[str, bool]:
        """
        Test the R2 connection by attempting to list buckets
        
        Returns:
            Dict containing connection status and bucket existence
        """
        try:
            # Try to list buckets to test credentials
            self.client.list_buckets()
            
            # Try to access specified bucket
            self.client.head_bucket(Bucket=self.bucket_name)
            
            return {
                "connection_status": True,
                "bucket_exists": True
            }
        except ClientError as e:
            error_code = e.response.get('Error', {}).get('Code', '')
            if error_code == '404':
                return {
                    "connection_status": True,
                    "bucket_exists": False
                }
            elif error_code in ['403', '401']:
                return {
                    "connection_status": False,
                    "bucket_exists": False
                }
            raise HTTPException(
                status_code=500,
                detail=f"R2 connection test failed: {str(e)}"
            )
    
    async def upload_file(
        self,
        file_path: Path,
        key: Optional[str] = None,
        metadata: Optional[Dict] = None
    ) -> str:
        """
        Upload a single file to R2
        
        Args:
            file_path: Path to the file to upload
            key: Optional custom key (filename in bucket)
            metadata: Optional metadata to attach to the file
            
        Returns:
            URL of the uploaded file
        """
        if not file_path.exists():
            raise HTTPException(
                status_code=400,
                detail=f"File not found: {file_path}"
            )
        
        try:
            # Use filename as key if not specified
            key = key or file_path.name
            
            # Prepare upload parameters
            upload_params = {
                "Bucket": self.bucket_name,
                "Key": key,
                "Body": file_path.open('rb')
            }
            
            # Add metadata if provided
            if metadata:
                upload_params["Metadata"] = metadata
            
            # Perform upload
            self.client.upload_file(
                str(file_path),
                self.bucket_name,
                key,
                ExtraArgs=upload_params
            )
            
            return f"{self.endpoint_url}/{self.bucket_name}/{key}"
            
        except ClientError as e:
            logger.error(f"Failed to upload {file_path}: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Upload failed: {str(e)}"
            ) 