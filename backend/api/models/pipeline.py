from pydantic import BaseModel, Field, field_validator
from typing import Optional, Dict, Any, List
from enum import Enum
from fastapi import HTTPException

class RunMode(str, Enum):
    AUTO = "auto"
    STEP = "step"

class PipelineConfig(BaseModel):
    stages: List[int] = Field(...)  # Make stages required
    src_profile: Optional[str] = Field(
        default=None,
        description="Source profile for data location"
    )
    output_directory: str = Field(
        default="assets",
        description="Directory for pipeline outputs"
    )
    run_mode: str = Field(  # Changed from RunMode to str to handle validation ourselves
        default=RunMode.STEP.value,
        description="Pipeline execution mode"
    )
    options: Dict[str, Any] = Field(
        default_factory=dict,
        description="Additional pipeline options"
    )

    @field_validator("stages")
    def validate_stages(cls, v):
        valid_stages = range(7)  # 0-6
        for stage in v:
            if stage not in valid_stages:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid stage number: {stage}"
                )
        return v

    @field_validator("run_mode")
    def validate_run_mode(cls, v):
        try:
            RunMode(v)
            return v
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid run mode: {v}"
            )

class StageResult(BaseModel):
    stage_number: int
    success: bool
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    execution_time: float

class PipelineResponse(BaseModel):
    success: bool
    message: str
    execution_time: float
    stages_completed: List[int]
    stages_failed: List[int]
    data: Dict[str, StageResult]
