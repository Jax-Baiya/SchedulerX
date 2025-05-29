"""
🧪 Test: Registry Feature Execution

Simulates loading the registry and running enabled features.
This test ensures mapping and execution paths are valid.
"""

import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))

from backend.pipeline_v2.utils.bootstrap import bootstrap_project
bootstrap_project()

from config import ENABLED_FEATURES
from registry import run_enabled_features

def test_feature_execution():
    print("🧪 Testing feature execution via registry...")
    run_enabled_features(ENABLED_FEATURES)

if __name__ == "__main__":
    test_feature_execution()