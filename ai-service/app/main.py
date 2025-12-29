from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Luxury Fashion AI Service",
    description="AI Try-On Service for Luxury Fashion Platform",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Luxury Fashion AI Service", "status": "running"}

@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "ai-tryon"}

# Import routes here
# from app.routes import tryon
# app.include_router(tryon.router, prefix="/api/v1/tryon", tags=["tryon"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
