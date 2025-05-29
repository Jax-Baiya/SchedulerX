from pydantic import BaseModel, Field
from typing import Optional
from pathlib import Path

class SessionConfig(BaseModel):
    src_root: Path = Field(..., description="Source directory path")
    dst_root: Path = Field(default="assets", description="Destination directory path")
    run_mode: str = Field(default="step", description="Pipeline execution mode")
    src_profile: Optional[str] = Field(default=None, description="Source profile identifier")
    test_mode: bool = Field(default=True, description="Testing mode flag")
    input_file_path: Optional[Path] = Field(default=None, description="Input file path")
    decoded_directory: Optional[Path] = Field(default=None, description="Decoded sections directory")
    xlsx_file: Optional[Path] = Field(default=None, description="Excel file path")

    class Config:
        arbitrary_types_allowed = True 