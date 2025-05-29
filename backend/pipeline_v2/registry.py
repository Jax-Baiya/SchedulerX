"""
📇 SchedulerX: Feature Registry

Maps feature names (used in config.ENABLED_FEATURES) to their actual `run()` callable.
This enables dynamic loading and execution of optional plugins.
"""

from features import auto_tagging, analytics
# from features import upload_to_r2  # Removed: now handled by backend/api

FEATURES = {
    # "upload_to_r2": upload_to_r2.run,  # Removed from pipeline_v2
    "auto_tagging": auto_tagging.run,
    "analytics": analytics.run,
}

def run_enabled_features(enabled):
    for name in enabled:
        func = FEATURES.get(name)
        if func:
            print(f"🔌 Running feature: {name}")
            try:
                func()
            except Exception as e:
                print(f"❌ Error in feature '{name}': {e}")
        else:
            print(f"⚠️ Feature '{name}' is not registered.")