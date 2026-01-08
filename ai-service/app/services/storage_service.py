from PIL import Image
import io
from uuid import uuid4
from loguru import logger

from app.core.config import settings


class StorageService:
    """Cloud storage service for uploading and managing images."""
    
    def __init__(self):
        self.bucket = settings.STORAGE_BUCKET
        self.client = None
        self._init_client()
    
    def _init_client(self):
        """Initialize the storage client."""
        if not settings.STORAGE_ACCESS_KEY:
            logger.warning("Storage credentials not configured, using local storage")
            return
        
        try:
            import boto3
            self.client = boto3.client(
                's3',
                endpoint_url=settings.STORAGE_ENDPOINT or None,
                aws_access_key_id=settings.STORAGE_ACCESS_KEY,
                aws_secret_access_key=settings.STORAGE_SECRET_KEY,
                region_name=settings.STORAGE_REGION,
            )
            logger.info("Storage client initialized")
        except Exception as e:
            logger.error(f"Failed to initialize storage client: {e}")
    
    async def upload_image(
        self, 
        image: Image.Image, 
        key: str,
        content_type: str = "image/jpeg"
    ) -> str:
        """Upload an image to storage and return the URL."""
        # Convert image to bytes
        buffer = io.BytesIO()
        image.save(buffer, format="JPEG", quality=90)
        buffer.seek(0)
        
        if self.client and self.bucket:
            try:
                self.client.upload_fileobj(
                    buffer,
                    self.bucket,
                    key,
                    ExtraArgs={"ContentType": content_type}
                )
                
                # Generate URL
                if settings.STORAGE_ENDPOINT:
                    url = f"{settings.STORAGE_ENDPOINT}/{self.bucket}/{key}"
                else:
                    url = f"https://{self.bucket}.s3.{settings.STORAGE_REGION}.amazonaws.com/{key}"
                
                return url
            except Exception as e:
                logger.error(f"Failed to upload to S3: {e}")
                raise
        else:
            # Placeholder: return a mock URL
            logger.warning("Using placeholder storage URL")
            return f"https://storage.example.com/{key}"
    
    async def delete_image(self, key: str) -> bool:
        """Delete an image from storage."""
        if not self.client or not self.bucket:
            return True
        
        try:
            self.client.delete_object(Bucket=self.bucket, Key=key)
            return True
        except Exception as e:
            logger.error(f"Failed to delete from S3: {e}")
            return False
