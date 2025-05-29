"""
Stage 0: Copy App Data
---------------------
This stage copies the .appdata folder to the assets/ directory.
This is the first stage in the pipeline and ensures all necessary data
is available for subsequent stages.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import shutil

from utils import (
    print_stage_header,
    load_session,
    save_session,
    prepare_pipeline_paths
)
from utils.run_mode import get_run_mode_manager
from config import SRC_PROFILE

def copy_appdata_folder(src_root, dst_root):
    src_path = os.path.join(src_root, ".appdata")
    dst_path = os.path.join(dst_root, ".appdata")

    if not os.path.exists(src_path):
        print(f"❌ Source path not found: {src_path}")
        return

    if os.path.exists(dst_path):
        print(f"⚠️ Existing .appdata found in {dst_root}. Overwriting...")
        shutil.rmtree(dst_path)

    shutil.copytree(src_path, dst_path)
    print(f"✅ Copied .appdata from {src_path} → {dst_path}")

def run():
    print_stage_header("Copy App Data")

    session = load_session()

    # Use run mode manager to get source path
    run_mode_manager = get_run_mode_manager()
    src_root = run_mode_manager.select_src_path(stage=0)
    # dst_root = "assets"  # Hardcoded as in original
    # Use prepare_pipeline_paths to set up output paths
    session["src_root"] = src_root
    # session["dst_root"] = dst_root
    prepare_pipeline_paths(session)  # Generates and stores pipeline file paths
    dst_root = session["dst_root"]
    copy_appdata_folder(src_root, dst_root)
    save_session(session)

if __name__ == "__main__":
    run()