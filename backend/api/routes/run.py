from backend.api.utils.bootstrap import bootstrap_api
bootstrap_api()

import logging
from fastapi import APIRouter, HTTPException
from backend.api.models.pipeline import PipelineConfig, PipelineResponse, RunMode
from backend.api.services.pipeline_runner import PipelineRunner
from backend.pipeline_v2.utils.run_mode import get_run_mode_manager

logger = logging.getLogger(__name__)
router = APIRouter(tags=["pipeline"])

@router.post("/run", response_model=PipelineResponse)
async def trigger_pipeline(config: PipelineConfig):
    """Trigger the TikTok data pipeline with specified configuration"""
    try:
        runner = PipelineRunner()
        result = await runner.run(config)
        return PipelineResponse(
            success=result["success"],
            message=result["message"],
            execution_time=result["execution_time"],
            stages_completed=result["stages_completed"],
            stages_failed=result["stages_failed"],
            data=result["data"]
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.exception("Pipeline execution failed")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/run/status")
async def get_pipeline_status():
    """Get current pipeline status and session data"""
    try:
        runner = PipelineRunner()
        return await runner.get_status()
    except Exception as e:
        logger.exception("Failed to get pipeline status")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
