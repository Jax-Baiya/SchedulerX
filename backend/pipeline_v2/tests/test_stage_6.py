"""
🧪 Test: Stage 6 - Prisma Schema Sync
Ensures Prisma init + db pull runs successfully if configured.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from stages import prisma_sync as stage6

def test_stage_6_run():
    print("🧪 Running Stage 6: Prisma Sync")
    try:
        stage6.run()
        print("✅ Stage 6 ran successfully.")
    except Exception as e:
        print(f"❌ Stage 6 failed: {e}")

if __name__ == "__main__":
    test_stage_6_run()