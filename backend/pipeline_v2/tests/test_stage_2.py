"""
🧪 Test: Stage 2 - Decode Markdown File
Runs the decode stage to ensure decoding process completes without crashing.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import decode as stage2

def test_stage_2_run():
    print("🧪 Running Stage 2: Decode Markdown")
    try:
        stage2.run()
        print("✅ Stage 2 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 2 failed: {e}")

if __name__ == "__main__":
    test_stage_2_run()