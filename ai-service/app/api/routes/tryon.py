from fastapi import APIRouter, UploadFile, File, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from uuid import uuid4
from loguru import logger

from app.services.image_processor import ImageProcessor
from app.services.model_service import ModelService
from app.services.storage_service import StorageService

router = APIRouter()

# Initialize services
image_processor = ImageProcessor()
model_service = ModelService()
storage_service = StorageService()


class TryOnRequest(BaseModel):
    user_image_url: str
    product_image_urls: List[str]


class TryOnResponse(BaseModel):
    success: bool
    job_id: str
    result_image_url: Optional[str] = None
    status: str = "processing"
    error: Optional[str] = None


class TryOnStatusResponse(BaseModel):
    job_id: str
    status: str
    result_image_url: Optional[str] = None
    error: Optional[str] = None


# In-memory job storage (use Redis in production)
jobs = {}


@router.post("/generate", response_model=TryOnResponse)
async def generate_tryon(
    request: TryOnRequest,
    background_tasks: BackgroundTasks
):
    """
    Generate a virtual try-on image.
    
    - **user_image_url**: URL to the user's photo
    - **product_image_urls**: List of product image URLs to try on
    """
    job_id = str(uuid4())
    
    # Store job
    jobs[job_id] = {
        "status": "processing",
        "result_image_url": None,
        "error": None,
    }
    
    # Process in background
    background_tasks.add_task(
        process_tryon,
        job_id,
        request.user_image_url,
        request.product_image_urls,
    )
    
    return TryOnResponse(
        success=True,
        job_id=job_id,
        status="processing",
    )


@router.post("/generate-sync", response_model=TryOnResponse)
async def generate_tryon_sync(request: TryOnRequest):
    """
    Generate a virtual try-on image synchronously (slower but immediate result).
    """
    job_id = str(uuid4())
    
    try:
        result_url = await process_tryon_sync(
            request.user_image_url,
            request.product_image_urls,
        )
        
        return TryOnResponse(
            success=True,
            job_id=job_id,
            status="completed",
            result_image_url=result_url,
        )
    except Exception as e:
        logger.error(f"Try-on generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{job_id}", response_model=TryOnStatusResponse)
async def get_tryon_status(job_id: str):
    """Get the status of a try-on generation job."""
    if job_id not in jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = jobs[job_id]
    return TryOnStatusResponse(
        job_id=job_id,
        status=job["status"],
        result_image_url=job["result_image_url"],
        error=job["error"],
    )


async def process_tryon(
    job_id: str,
    user_image_url: str,
    product_image_urls: List[str],
):
    """Background task to process try-on generation."""
    try:
        logger.info(f"Processing try-on job: {job_id}")
        
        # Download images
        user_image = await image_processor.download_image(user_image_url)
        product_images = [
            await image_processor.download_image(url)
            for url in product_image_urls
        ]
        
        # Preprocess
        user_image = image_processor.preprocess(user_image)
        product_images = [image_processor.preprocess(img) for img in product_images]
        
        # Generate try-on (placeholder - implement actual model)
        result_image = model_service.generate_tryon(user_image, product_images)
        
        # Upload result
        result_url = await storage_service.upload_image(
            result_image,
            f"tryon-results/{job_id}.jpg"
        )
        
        # Update job
        jobs[job_id] = {
            "status": "completed",
            "result_image_url": result_url,
            "error": None,
        }
        
        logger.info(f"Try-on job completed: {job_id}")
        
    except Exception as e:
        logger.error(f"Try-on job failed: {job_id} - {e}")
        jobs[job_id] = {
            "status": "failed",
            "result_image_url": None,
            "error": str(e),
        }


async def process_tryon_sync(
    user_image_url: str,
    product_image_urls: List[str],
) -> str:
    """Synchronous try-on processing."""
    # Download images
    user_image = await image_processor.download_image(user_image_url)
    product_images = [
        await image_processor.download_image(url)
        for url in product_image_urls
    ]
    
    # Preprocess
    user_image = image_processor.preprocess(user_image)
    product_images = [image_processor.preprocess(img) for img in product_images]
    
    # Generate try-on
    result_image = model_service.generate_tryon(user_image, product_images)
    
    # Upload result
    result_url = await storage_service.upload_image(
        result_image,
        f"tryon-results/{uuid4()}.jpg"
    )
    
    return result_url
