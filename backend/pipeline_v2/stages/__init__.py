"""
📦 Stages Package
Only expose explicitly safe modules for import.
"""

from .copy_appdata import run as stage_0_run
from .generate_md import run as stage_1_run
from .decode import run as stage_2_run
from .generate_md import append_file_content
from .xlsx import run as stage_3_run
from .append_consolidated import run as stage_4_run
from .import_db import run as stage_5_run
from .prisma_sync import run as stage_6_run

# Expose modules explicitly to prevent circular import issues
__all__ = [
    'stage_0_run',
    'stage_1_run',
    'stage_2_run',
    'append_file_content',
    'stage_3_run',
    'stage_4_run',
    'stage_5_run',
    'stage_6_run'
]
