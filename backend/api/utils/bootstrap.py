"""
🔧 SchedulerX API Bootstrap Module

Dynamically finds the project root (SchedulerX dir) and sets up import paths for both API and Pipeline.
"""

from pathlib import Path
import sys

def bootstrap_api():
    current = Path(__file__).resolve()
    project_root = None

    # Detect SchedulerX root (has both backend/ and shared/)
    for parent in current.parents:
        if (parent / "backend").exists() and (parent / "shared").exists():
            project_root = parent
            break

    if project_root:
        sys.path.insert(0, str(project_root))
        try:
            from backend.pipeline_v2.utils.bootstrap import bootstrap_project
        except ModuleNotFoundError as e:
            import os
            raise
        bootstrap_project()
    else:
        raise RuntimeError("\u274c Could not locate SchedulerX project root.")
