import time
import asyncio
import logging
from typing import Dict, Any, List
from fastapi import HTTPException

from backend.api.models.pipeline import PipelineConfig, StageResult
from backend.pipeline_v2.utils.session_tools import load_session, save_session
from backend.pipeline_v2.stages import (
    stage_0_run,
    stage_1_run,
    stage_2_run,
    stage_3_run,
    stage_4_run,
    stage_5_run,
    stage_6_run
)

logger = logging.getLogger(__name__)

class PipelineRunner:
    def __init__(self):
        self.stage_map = {
            0: stage_0_run,
            1: stage_1_run,
            2: stage_2_run,
            3: stage_3_run,
            4: stage_4_run,
            5: stage_5_run,
            6: stage_6_run
        }
        self.session = load_session() or {}

    async def _run_stage(self, stage: int) -> Dict[str, Any]:
        """Run a single pipeline stage"""
        stage_func = self.stage_map.get(stage)
        if not stage_func:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid stage number: {stage}"
            )

        try:
            start_time = time.time()
            result = await asyncio.to_thread(stage_func)
            execution_time = time.time() - start_time

            return {
                "stage_number": stage,
                "success": True,
                "result": result,
                "error": None,
                "execution_time": execution_time
            }
        except Exception as e:
            logger.exception(f"Stage {stage} failed")
            return {
                "stage_number": stage,
                "success": False,
                "result": None,
                "error": str(e),
                "execution_time": time.time() - start_time
        }

    async def run(self, config: PipelineConfig) -> Dict[str, Any]:
        """Run the pipeline with the given configuration"""
        start_time = time.time()
        results = {}
        stages_completed = []
        stages_failed = []

        # Update session with config
        self.session.update({
            "run_mode": config.run_mode,
            "src_profile": config.src_profile,
            "dst_root": config.output_directory,
            **config.options
        })
        save_session(self.session)

        try:
            for stage in config.stages:
                    stage_result = await self._run_stage(stage)
                    results[f"stage_{stage}"] = stage_result

                    if stage_result["success"]:
                        stages_completed.append(stage)
                    else:
                        stages_failed.append(stage)
                        break

            return {
                "success": len(stages_failed) == 0,
                "message": "Pipeline execution complete",
                "execution_time": time.time() - start_time,
                "stages_completed": stages_completed,
                "stages_failed": stages_failed,
                "data": results
            }
        except Exception as e:
            logger.exception("Pipeline execution failed")
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

    async def get_status(self) -> Dict[str, Any]:
        """Get current pipeline status from session"""
        return {
            "session_data": self.session,
            "available_stages": list(self.stage_map.keys()),
            "current_mode": self.session.get("run_mode", "step")
                }

    async def _setup_test_environment(self, config: PipelineConfig):
        """Set up test environment with mock data"""
        import os
        from pathlib import Path

        # Create test directories
        test_root = Path("test_assets")
        test_root.mkdir(exist_ok=True)
        
        # Create .appdata directory
        appdata_dir = test_root / ".appdata"
        appdata_dir.mkdir(exist_ok=True)
        
        # Update session with test paths
        self.session.update({
            "src_root": str(test_root),
            "dst_root": config.output_directory,
            "test_mode": True
        })
        save_session(self.session)
