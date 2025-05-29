"""
🧪 Test: Stage 1 - Generate Markdown Summary
Checks whether stage 1 completes without exceptions.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import generate_md as stage1

def test_stage_1_run():
    print("🧪 Running Stage 1: Generate Markdown Summary")
    try:
        stage1.run()
        print("✅ Stage 1 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 1 failed: {e}")

if __name__ == "__main__":
    test_stage_1_run()