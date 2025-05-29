# backend/api/main.py

# Bootstrap FIRST, before any other imports
from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

# Now we can safely import everything else
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.middleware.analytics import AnalyticsMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.openapi.utils import get_openapi
import logging

# Then import routes
from backend.api.routes import run, media, upload, analytics, r2, scheduler, tasks, settings, auth, admin
from backend.api.services.scheduler_job import start_scheduler

app = FastAPI(
    title="SchedulerX API",
    description="API for managing TikTok data pipeline and media operations",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AnalyticsMiddleware)

# Include routers
app.include_router(run.router, prefix="/api/v1", tags=["pipeline"])
app.include_router(media.router, prefix="/api/v1", tags=["media"])
app.include_router(upload.router, prefix="/api/v1", tags=["upload"])
app.include_router(analytics.router, prefix="/api/v1", tags=["analytics"])
app.include_router(r2.router, prefix="/api/v1", tags=["r2"])
app.include_router(scheduler.router, prefix="/api/v1", tags=["scheduler"])
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])
app.include_router(settings.router, prefix="/api/v1", tags=["settings"])
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(admin.router, prefix="/api/v1", tags=["admin"])

# Start the APScheduler background job for scheduled posts
start_scheduler()

@app.get("/")
async def root():
    return {"message": "Welcome to SchedulerX API"}

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.exception(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )

@app.get("/openapi.json", include_in_schema=False)
def custom_openapi():
    return get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
