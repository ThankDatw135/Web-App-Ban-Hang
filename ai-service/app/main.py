from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from loguru import logger

from app.api.routes import tryon, health
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting AI Try-On Service...")
    logger.info(f"   Environment: {settings.ENVIRONMENT}")
    logger.info(f"   Model Path: {settings.MODEL_PATH}")
    yield
    # Shutdown
    logger.info("👋 Shutting down AI Try-On Service...")


app = FastAPI(
    title="Luxury Fashion AI Try-On",
    description="AI-powered virtual try-on service for luxury fashion platform",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(tryon.router, prefix="/api/v1/tryon", tags=["try-on"])


@app.get("/")
async def root():
    return {
        "name": "Luxury Fashion AI Try-On Service",
        "version": "1.0.0",
        "status": "running",
    }
