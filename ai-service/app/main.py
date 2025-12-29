from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import tryon
import uvicorn

app = FastAPI(
    title="Luxury Fashion AI Service",
    description="AI Try-On Service for Luxury Fashion Platform",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(tryon.router, prefix="/api/v1/tryon", tags=["Try-On"])

@app.get("/")
async def root():
    return {"message": "Luxury Fashion AI Service", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
