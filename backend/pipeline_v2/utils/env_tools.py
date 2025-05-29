"""
🛠️ SchedulerX: Environment Tools (Auto + Manual Mode)

Supports validation, safe loading, and interactive DB_PROFILE setup with DATABASE_URL generation.
"""

import os
import argparse
from pathlib import Path
from dotenv import load_dotenv
from .db_tools import select_db_profile, get_profile_config
from .db_profiles import db_profile_manager


REQUIRED_KEYS = ["DB_PROFILE", "DATABASE_URL", "SRC_PROFILE", "RUN_MODE", "LOG_LEVEL"]
DEFAULTS = {
    "SRC_PROFILE": "default",
    "RUN_MODE": "step",
    "LOG_LEVEL": "info"
}

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
WARN_LOG_PATH = Path(__file__).resolve().parents[1] / "logs" / "env_warnings.log"

def update_env_file(profile, config):
    """
    Updates the .env file with the provided configuration.
    Creates a backup of the existing .env file if it exists.
    """
    try:
        # Create backup if .env exists
        if ENV_PATH.exists():
            backup_path = ENV_PATH.with_suffix('.env.backup')
            ENV_PATH.rename(backup_path)
            print(f"📦 Created backup: {backup_path}")

        # Write new .env file
        with open(ENV_PATH, 'w') as f:
            f.write("# SchedulerX Environment Configuration\n\n")
            
            # Write DB configuration
            f.write("# Database Configuration\n")
            f.write(f"DB_PROFILE={profile}\n")
            f.write(f"DATABASE_URL={config['DATABASE_URL']}\n\n")
            
            # Write other required keys
            f.write("# Pipeline Configuration\n")
            for key in REQUIRED_KEYS:
                if key not in ['DB_PROFILE', 'DATABASE_URL'] and key in config:
                    f.write(f"{key}={config[key]}\n")
            
            # Write any additional configuration
            f.write("\n# Additional Configuration\n")
            for key, value in config.items():
                if key not in REQUIRED_KEYS and value is not None:
                    f.write(f"{key}={value}\n")
        
        print(f"✅ Successfully wrote configuration to {ENV_PATH}")
        return True
        
    except Exception as e:
        print(f"❌ Error writing .env file: {e}")
        # Restore backup if it exists
        if 'backup_path' in locals() and backup_path.exists():
            backup_path.rename(ENV_PATH)
            print(f"♻️ Restored backup from: {backup_path}")
        return False

def validate_env():
    missing = []
    for key in REQUIRED_KEYS:
        if os.getenv(key) is None:
            missing.append(key)
    return missing

def load_env():
    if not ENV_PATH.exists():
        print("⚠️ .env file not found.")
        return []

    load_dotenv(dotenv_path=ENV_PATH)
    missing = validate_env()
    if missing:
        warn_user(missing)
    return missing

def warn_user(missing_keys):
    msg = (
        "⚠️ WARNING: Missing required keys in .env:\\n"
        + "\\n".join(f" - {key}" for key in missing_keys)
        + "\\nPlease update your .env manually to prevent runtime errors."
    )
    print(msg)
    WARN_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    WARN_LOG_PATH.write_text(msg)
    print(f"🔍 Details saved to: {WARN_LOG_PATH}")

def validate_profile(profile_name):
    """Validates only the selected profile's required fields."""
    profile = db_profile_manager.get_profile(profile_name)
    if not profile:
        print(f"❌ Error: Invalid profile '{profile_name}'")
        return False, []
    
    is_valid, missing = db_profile_manager.validate_profile(profile)
    if not is_valid:
        msg = (
            f"❌ Error: Missing fields for profile '{profile_name}':\n"
            + "\n".join(f" - {key}" for key in missing)
            + f"\nPlease update these fields in your .env file for the '{profile_name}' profile."
        )
        print(msg)
        WARN_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
        WARN_LOG_PATH.write_text(msg)
        return False, missing
    
    return True, []

def build_database_url(profile_name):
    """Builds DATABASE_URL using environment variables for the selected profile."""
    profile = db_profile_manager.get_profile(profile_name)
    if not profile:
        raise ValueError(f"Invalid profile: {profile_name}")
    return db_profile_manager.build_connection_url(profile)

def rebuild_env(force=False):
    print("\n🔧 Rebuilding .env with selected DB_PROFILE...")

    profile = select_db_profile()
    config = get_profile_config(profile)

    if not validate_profile(profile):
        return

    config["DB_PROFILE"] = profile
    config["DATABASE_URL"] = build_database_url(profile)

    for key in REQUIRED_KEYS:
        if key not in config:
            config[key] = DEFAULTS.get(key, "")

    success = update_env_file(profile, config)
    if success:
        print(f"✅ .env rebuilt and saved with DB_PROFILE: {profile}")
    else:
        print("❌ Failed to write .env")

def update_db_settings(profile):
    """
    Updates only DB_PROFILE and DATABASE_URL in .env file.
    Preserves all other settings.
    """
    try:
        # Load existing environment variables
        load_dotenv(dotenv_path=ENV_PATH)
        
        # Validate the selected profile first
        is_valid, missing = validate_profile(profile)
        if not is_valid:
            return False

        # Generate the new DATABASE_URL
        database_url = build_database_url(profile)
        
        # Read existing .env content
        env_content = []
        if ENV_PATH.exists():
            with open(ENV_PATH, 'r') as f:
                env_content = f.readlines()
        
        # Update or add DB settings
        db_profile_found = False
        database_url_found = False
        
        for i, line in enumerate(env_content):
            if line.startswith('DB_PROFILE='):
                env_content[i] = f'DB_PROFILE={profile}\n'
                db_profile_found = True
            elif line.startswith('DATABASE_URL='):
                env_content[i] = f'DATABASE_URL={database_url}\n'
                database_url_found = True
        
        # Add settings if they don't exist
        if not db_profile_found:
            env_content.append(f'DB_PROFILE={profile}\n')
        if not database_url_found:
            env_content.append(f'DATABASE_URL={database_url}\n')
        
        # Write back to file
        with open(ENV_PATH, 'w') as f:
            f.writelines(env_content)
        
        print(f"✅ Updated DB settings for profile: {profile}")
        print(f"📝 DATABASE_URL updated in {ENV_PATH}")
        return True
        
    except Exception as e:
        print(f"❌ Error updating DB settings: {e}")
        return False

def setup_environment(force=False):
    """
    Sets up or updates database configuration.
    Only modifies DB_PROFILE and DATABASE_URL.
    """
    profile = select_db_profile()
    if update_db_settings(profile):
        print("✅ Database configuration updated successfully")
    else:
        print("❌ Failed to update database configuration")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SchedulerX Environment Tool")
    parser.add_argument("--setup", action="store_true", help="Run interactive setup for .env")
    parser.add_argument("--validate", action="store_true", help="Validate existing .env and report missing keys")
    parser.add_argument("--force", action="store_true", help="Force regenerate .env from scratch")

    args = parser.parse_args()

    if args.setup or args.force:
        setup_environment(force=args.force)
    elif args.validate:
        # Load and validate current settings
        load_dotenv(dotenv_path=ENV_PATH)
        profile = os.getenv("DB_PROFILE")
        if profile:
            is_valid, missing = validate_profile(profile)
            if is_valid:
                print(f"✅ Current DB profile '{profile}' is valid")
            else:
                print(f"❌ Current DB profile '{profile}' has missing fields")
        else:
            print("❌ No DB_PROFILE set in .env")
    else:
        setup_environment()