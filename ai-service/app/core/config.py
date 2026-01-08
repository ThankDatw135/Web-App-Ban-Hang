from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
    # AI Model
    MODEL_PATH: str = "/models"
    MAX_IMAGE_SIZE: int = 2048
    
    # Storage (S3-compatible)
    STORAGE_BUCKET: str = ""
    STORAGE_ACCESS_KEY: str = ""
    STORAGE_SECRET_KEY: str = ""
    STORAGE_ENDPOINT: str = ""
    STORAGE_REGION: str = "us-east-1"
    
    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
