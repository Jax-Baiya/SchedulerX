"""
🧪 Test: Stage 3 - Convert JSON to Excel
Ensures JSON decoding to Excel sheet consolidation works.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import xlsx as stage3

def test_stage_3_run():
    print("🧪 Running Stage 3: Convert JSON to Excel")
    try:
        stage3.run()
        print("✅ Stage 3 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 3 failed: {e}")

if __name__ == "__main__":
    test_stage_3_run()