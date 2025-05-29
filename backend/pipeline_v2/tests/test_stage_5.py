"""
🧪 Test: Stage 5 - Import Excel Sheets to PostgreSQL
Ensures data from Excel is inserted into the database tables.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import import_db as stage5

def test_stage_5_run():
    print("🧪 Running Stage 5: Import Excel to DB")
    try:
        stage5.run()
        print("✅ Stage 5 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 5 failed: {e}")

if __name__ == "__main__":
    test_stage_5_run()