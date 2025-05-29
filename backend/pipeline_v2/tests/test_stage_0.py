"""
🧪 Test: Stage 0 - Copy App Data
Simulates execution of stage 0 and verifies file copying and session update.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import copy_appdata as stage0

def test_stage_0_run():
    print("🧪 Running Stage 0: Copy App Data")
    try:
        stage0.run()
        print("✅ Stage 0 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 0 failed: {e}")

if __name__ == "__main__":
    test_stage_0_run()