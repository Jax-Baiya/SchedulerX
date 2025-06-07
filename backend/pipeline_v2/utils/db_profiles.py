"""
📦 Database Profile Configuration
Manages database profiles and their configurations in a centralized way.
"""

from typing import Dict, List, Optional, Set
from dataclasses import dataclass
from pathlib import Path
import re
from dotenv import load_dotenv
import os

@dataclass
class DBProfile:
    name: str
    display_name: str
    env_prefix: str
    is_supabase: bool = False
    is_transaction: bool = False

class DBProfileManager:
    def __init__(self):
        self.profiles: Dict[str, DBProfile] = {}
        self._load_env()
        self._initialize_profiles()
        self._auto_detect_profiles()

    def _load_env(self):
        """Load environment variables from .env file"""
        # Always load .env from project root
        project_root = Path(__file__).resolve().parents[1]
        dotenv_path = project_root / ".env"
        load_dotenv(dotenv_path=dotenv_path, override=True)

    def _get_env_variables(self) -> Set[str]:
        """Get all environment variables from .env"""
        return set(os.environ.keys())

    def _detect_profile_type(self, prefix: str) -> tuple[bool, bool]:
        """Detect if a profile is Supabase and/or Transaction type"""
        is_supabase = "SUPABASE" in prefix
        is_transaction = "TRANS" in prefix
        return is_supabase, is_transaction

    def _get_profile_number(self, prefix: str) -> int:
        """Extract profile number from prefix (e.g., LOCAL_2_ -> 2)"""
        match = re.search(r'_(\d+)_', prefix)
        return int(match.group(1)) if match else 1

    def _auto_detect_profiles(self):
        """Automatically detect and add new database profiles from environment variables"""
        env_vars = self._get_env_variables()
        
        # Patterns to match different types of profiles
        patterns = {
            'local': r'^LOCAL_(\d+)?_DB_',
            'supabase_session': r'^SUPABASE_(\d+)?_SESSION_',
            'supabase_transaction': r'^SUPABASE_(\d+)?_TRANS_'
        }

        for profile_type, pattern in patterns.items():
            # Find all matching prefixes
            prefixes = set()
            for var in env_vars:
                match = re.match(pattern, var)
                if match:
                    num = match.group(1) or "1"
                    if profile_type == 'local':
                        prefixes.add(f"LOCAL_{num}_")
                    elif profile_type == 'supabase_session':
                        prefixes.add(f"SUPABASE_{num}_SESSION_")
                    elif profile_type == 'supabase_transaction':
                        prefixes.add(f"SUPABASE_{num}_TRANS_")

            # Create profiles for each detected prefix
            for prefix in prefixes:
                profile_num = self._get_profile_number(prefix)
                is_supabase, is_transaction = self._detect_profile_type(prefix)
                
                # Generate profile name and display name
                if profile_type == 'local':
                    name = f"local_{profile_num}" if profile_num > 1 else "local"
                    display_name = f"Local PostgreSQL {profile_num}" if profile_num > 1 else "Local PostgreSQL"
                elif profile_type == 'supabase_session':
                    name = f"supabase_session_{profile_num}" if profile_num > 1 else "supabase_session"
                    display_name = f"Supabase Session Pooler {profile_num}" if profile_num > 1 else "Supabase Session Pooler"
                else:  # supabase_transaction
                    name = f"supabase_transaction_{profile_num}" if profile_num > 1 else "supabase_transaction"
                    display_name = f"Supabase Transaction Pooler {profile_num}" if profile_num > 1 else "Supabase Transaction Pooler"

                # Only add if profile doesn't exist
                if name not in self.profiles:
                    self.profiles[name] = DBProfile(
                        name=name,
                        display_name=display_name,
                        env_prefix=prefix,
                        is_supabase=is_supabase,
                        is_transaction=is_transaction
                    )

    def _initialize_profiles(self):
        """Initialize default profiles"""
        # Default profiles will be added if they don't exist after auto-detection
        default_profiles = {
            "local": DBProfile(
                name="local",
                display_name="Local PostgreSQL",
                env_prefix="LOCAL_"
            ),
            "supabase_session": DBProfile(
                name="supabase_session",
                display_name="Supabase Session Pooler",
                env_prefix="SUPABASE_SESSION_",
                is_supabase=True
            ),
            "supabase_transaction": DBProfile(
                name="supabase_transaction",
                display_name="Supabase Transaction Pooler",
                env_prefix="SUPABASE_TRANS_",
                is_supabase=True,
                is_transaction=True
            )
        }

        # Add default profiles if they don't exist
        for name, profile in default_profiles.items():
            if name not in self.profiles:
                self.profiles[name] = profile

    def get_profile(self, name: str) -> Optional[DBProfile]:
        return self.profiles.get(name)

    def list_profiles(self) -> List[DBProfile]:
        return list(self.profiles.values())

    def build_connection_url(self, profile: DBProfile) -> str:
        """Builds the database connection URL for a given profile."""
        if profile.is_supabase:
            user = os.getenv(f"{profile.env_prefix}USER", "").split(".")[0]
            password = os.getenv(f"{profile.env_prefix}PASSWORD", "")
            host = os.getenv(f"{profile.env_prefix}HOST", "")
            port = os.getenv(f"{profile.env_prefix}PORT", "6543" if profile.is_transaction else "5432")
            project_ref = os.getenv("SUPABASE_2_PROJECT_REF" if "2" in profile.name else "SUPABASE_PROJECT_REF", "")
            return f"postgresql://{user}.{project_ref}:{password}@{host}:{port}/postgres"
        else:
            user = os.getenv(f"{profile.env_prefix}DB_USER", "postgres")
            password = os.getenv(f"{profile.env_prefix}DB_PASSWORD", "")
            host = os.getenv(f"{profile.env_prefix}DB_HOST", "localhost")
            port = os.getenv(f"{profile.env_prefix}DB_PORT", "5432")
            db = os.getenv(f"{profile.env_prefix}DB_NAME", "postgres")
            schema = os.getenv(f"{profile.env_prefix}DB_SCHEMA", "public")
            return f"postgresql://{user}:{password}@{host}:{port}/{db}?schema={schema}"

    def validate_profile(self, profile: DBProfile) -> tuple[bool, list[str]]:
        """Validates that all required environment variables are set for a profile."""
        missing = []
        
        if profile.is_supabase:
            required = [
                f"{profile.env_prefix}USER",
                f"{profile.env_prefix}PASSWORD",
                f"{profile.env_prefix}HOST",
                f"{profile.env_prefix}PORT",
                "SUPABASE_2_PROJECT_REF" if "2" in profile.name else "SUPABASE_PROJECT_REF"
            ]
        else:
            required = [
                f"{profile.env_prefix}DB_USER",
                f"{profile.env_prefix}DB_PASSWORD",
                f"{profile.env_prefix}DB_HOST",
                f"{profile.env_prefix}DB_PORT",
                f"{profile.env_prefix}DB_NAME",
                f"{profile.env_prefix}DB_SCHEMA"
            ]

        for key in required:
            if not os.getenv(key):
                missing.append(key)

        return len(missing) == 0, missing

# Create a singleton instance
db_profile_manager = DBProfileManager()
