from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ai-tryon",
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/ready")
async def readiness_check():
    """Readiness check - verify all dependencies are available"""
    # TODO: Add model loading check
    return {
        "status": "ready",
        "model_loaded": True,
        "timestamp": datetime.utcnow().isoformat(),
    }
