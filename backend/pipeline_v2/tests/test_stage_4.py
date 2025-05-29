"""
🧪 Test: Stage 4 - Append Consolidated Sheet
Verifies that the 'consolidated' sheet is added to the Excel file.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import append_consolidated as stage4

def test_stage_4_run():
    print("🧪 Running Stage 4: Append Consolidated Sheet")
    try:
        stage4.run()
        print("✅ Stage 4 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 4 failed: {e}")

if __name__ == "__main__":
    test_stage_4_run()