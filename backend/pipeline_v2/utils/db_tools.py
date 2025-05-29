"""
🛢️ DB Tools
Handles database URL construction and environment file updates.
"""

import os
from pathlib import Path
from .session_tools import save_session
from .db_profiles import db_profile_manager

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ENV_FILE = Path(__file__).resolve().parents[1] / ".env"

def build_database_url(session):
    user = session.get("DB_USER", "postgres")
    password = session.get("DB_PASSWORD", "password")
    host = session.get("DB_HOST", "localhost")
    port = session.get("DB_PORT", "5432")
    db = session.get("DB_NAME", "postgres")

    if "pooler.supabase.com" in host:
        user = f"{user}.{session.get('PROJECT_REF')}"
        db = "postgres"
        return f"postgresql://{user}:{password}@{host}:{port}/{db}"
    else:
        schema = session.get("DB_SCHEMA", "public")
        return f"postgresql://{user}:{password}@{host}:{port}/{db}?schema={schema}"

def generate_database_url(user, password, host, port, db_name, schema):
    return f"postgresql://{user}:{password}@{host}:{port}/{db_name}?schema={schema}"

def write_env(session, dict, path=ENV_FILE):
    db_type = session.get("DB_TYPE", "local")
    pooler_type = session.get("POOLER_TYPE", "")
    user = session.get("DB_USER", "postgres")
    password = session.get("DB_PASSWORD", "password")
    host = session.get("DB_HOST", "localhost")
    port = session.get("DB_PORT", "5432")
    db = session.get("DB_NAME", "postgres")
    schema = session.get("DB_SCHEMA", "public")
    project_ref = session.get("PROJECT_REF", "")

    session["DATABASE_URL"] = build_database_url(session)

    try:
        with open(path, "w") as f:
            f.write(f"DB_TYPE={db_type}\\n")
            f.write(f"POOLER_TYPE={pooler_type}\\n")
            f.write(f"DB_USER={user}\\n")
            f.write(f"DB_PASSWORD={password}\\n")
            f.write(f"DB_NAME={db}\\n")
            f.write(f"DB_SCHEMA={schema}\\n")
            f.write(f"DB_HOST={host}\\n")
            f.write(f"DB_PORT={port}\\n")
            f.write(f"PROJECT_REF={project_ref}\\n")
            f.write(f"DATABASE_URL={session['DATABASE_URL']}\\n")
        print(f"✅ .env file refreshed at {path}")
    except Exception as e:
        print(f"❌ Failed to write .env file: {e}")

def save_env(data):
    with open(ENV_FILE, "w") as f:
        for key, value in data.items():
            f.write(f"{key}={value}\\n")

def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    os.environ[key] = value

def select_db_profile():
    """Interactive database profile selection"""
    print("\n🔵 Select Database Profile:")
    profiles = db_profile_manager.list_profiles()
    for i, profile in enumerate(profiles, 1):
        print(f"  [{i}] {profile.display_name}")
    
    while True:
        try:
            choice = int(input(f"Enter 1-{len(profiles)}: ").strip())
            if 1 <= choice <= len(profiles):
                return profiles[choice - 1].name
        except ValueError:
            pass
        print(f"⚠️ Invalid choice. Please enter 1-{len(profiles)}.")

def get_profile_config(profile_name):
    """Gets the configuration for a selected profile."""
    profile = db_profile_manager.get_profile(profile_name)
    if not profile:
        raise ValueError(f"Unsupported DB_PROFILE: {profile_name}")
    
    is_valid, missing = db_profile_manager.validate_profile(profile)
    if not is_valid:
        raise ValueError(f"Missing required environment variables: {', '.join(missing)}")
    
    return {
        "DATABASE_URL": db_profile_manager.build_connection_url(profile)
    }