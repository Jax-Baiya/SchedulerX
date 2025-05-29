"""
🔧 SchedulerX Bootstrap Module

Dynamically finds the true root of the project by walking up until it finds `.env` or `config.py`.
Then adds that directory to sys.path so all project modules can be imported cleanly.
"""

import sys
from pathlib import Path

def bootstrap_project():
    current = Path(__file__).resolve()
    for parent in current.parents:
        if (parent / ".env").exists() or (parent / "config.py").exists():
            if str(parent) not in sys.path:
                sys.path.insert(0, str(parent))
            break