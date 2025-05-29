# # utils.py has been modularized into file_ops.py, data_tools.py, and time_tools.py\n")

# ["file_ops.py", "data_tools.py", "time_tools.py", "utils.py (modularized)"]
# import os
# import json
# from pathlib import Path


# PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
# SESSION_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs', 'session.json'))
# # ENV_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
# # Dynamically locate the root-level .env file
# BASE_DIR = Path(__file__).resolve().parents[2]  # from /backend/api/config.py → /SchedulerX
# ENV_FILE = BASE_DIR / ".env"

# def build_database_url(session):
#     user = session.get("DB_USER", "postgres")
#     password = session.get("DB_PASSWORD", "password")
#     host = session.get("DB_HOST", "localhost")
#     port = session.get("DB_PORT", "5432")
#     db = session.get("DB_NAME", "postgres")

#     # Supabase-specific adjustment
#     if "pooler.supabase.com" in host:
#         user = f"{user}.{session.get('PROJECT_REF')}"
#         db = "postgres"  # Required for poolers
#         # Skip schema param for pooler
#         return f"postgresql://{user}:{password}@{host}:{port}/{db}"
#     else:
#         schema = session.get("DB_SCHEMA", "public")
#         return f"postgresql://{user}:{password}@{host}:{port}/{db}?schema={schema}"

# def prepare_pipeline_paths(session):
#     base_dst = session.get("dst_root", "assets")
#     session["dst_root"] = base_dst
#     session["input_file_path"] = os.path.join(base_dst, "summary.md")
#     session["decoded_directory"] = os.path.join(base_dst, "decoded_sections")
#     session["xlsx_file"] = os.path.join(base_dst, "xlsx_files", "data.xlsx")

#     os.makedirs(os.path.join(base_dst, "xlsx_files"), exist_ok=True)
#     save_session(session)
#     return session

# def generate_database_url(user, password, host, port, db_name, schema):
#     return f"postgresql://{user}:{password}@{host}:{port}/{db_name}?schema={schema}"

# def load_session():
#     if os.path.exists(SESSION_FILE):
#         with open(SESSION_FILE, "r") as f:
#             return json.load(f)
#     return {}

# def save_session(session):
#     os.makedirs(os.path.dirname(SESSION_FILE), exist_ok=True)
#     serializable_session = {
#         k: str(v) if isinstance(v, (os.PathLike)) else v
#         for k, v in session.items()
#     }
#     with open(SESSION_FILE, "w") as f:
#         json.dump(serializable_session, f, indent=4)

# def get_or_prompt(session_key, prompt_text, default, options=None):
#     session = load_session()
#     if session_key in session and session[session_key]:
#         return session[session_key]

#     print(f"\n{prompt_text}")
#     if options:
#         for i, option in enumerate(options, 1):
#             print(f"  {i}. {option}")
#         print("  0. Enter custom path")

#     choice = input(f"Select (Default: {default}): ").strip()

#     if not choice:
#         value = default
#     elif options and choice.isdigit():
#         choice = int(choice)
#         if 1 <= choice <= len(options):
#             value = options[choice - 1]
#         elif choice == 0:
#             value = input("Enter custom path: ").strip()
#         else:
#             print("⚠️ Invalid choice. Using default.")
#             value = default
#     else:
#         value = choice or default

#     session[session_key] = value
#     save_session(session)
#     return value

# def write_env(session, dict, path=ENV_FILE):
#     db_type = session.get("DB_TYPE", "local")  # local or remote
#     pooler_type = session.get("POOLER_TYPE", "")
#     user = session.get("DB_USER", "postgres")
#     password = session.get("DB_PASSWORD", "password")
#     host = session.get("DB_HOST", "localhost")
#     port = session.get("DB_PORT", "5432")
#     db = session.get("DB_NAME", "postgres")
#     schema = session.get("DB_SCHEMA", "public")
#     project_ref = session.get("PROJECT_REF", "")

#     # Build connection string
#     session["DATABASE_URL"] = build_database_url(session)

#     try:
#         with open(path, "w") as f:
#             f.write(f"DB_TYPE={db_type}\n")
#             f.write(f"POOLER_TYPE={pooler_type}\n")
#             f.write(f"DB_USER={user}\n")
#             f.write(f"DB_PASSWORD={password}\n")
#             f.write(f"DB_NAME={db}\n")
#             f.write(f"DB_SCHEMA={schema}\n")
#             f.write(f"DB_HOST={host}\n")
#             f.write(f"DB_PORT={port}\n")
#             f.write(f"PROJECT_REF={project_ref}\n")
#             f.write(f"DATABASE_URL={session['DATABASE_URL']}\n")
#         print(f"✅ .env file refreshed at {path}")
#     except Exception as e:
#         print(f"❌ Failed to write .env file: {e}")


# def save_env(data):
#     with open(ENV_FILE, "w") as f:
#         for key, value in data.items():
#             f.write(f"{key}={value}\n")

# def load_env():
#     if os.path.exists(ENV_FILE):
#         with open(ENV_FILE, "r") as f:
#             for line in f:
#                 line = line.strip()
#                 if line and not line.startswith("#"):
#                     key, value = line.split("=", 1)
#                     os.environ[key] = value

# def move_logs_and_session():
#     log_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs'))
#     session_path = os.path.join(log_dir, "session.json")
#     if os.path.exists(session_path):
#         print(f"🧹 Cleanup complete: logs and session.json moved to /logs/")

# def print_stage_header(title):
#     print("\n" + "="*40)
#     print(f"🔹 {title}")
#     print("="*40)

# def list_subdirectories(base_path="."):
#     try:
#         return [
#             d for d in os.listdir(base_path)
#             if os.path.isdir(os.path.join(base_path, d))
#         ]
#     except FileNotFoundError:
#         return []

# def prompt_for_directory(prompt, default_dirs):
#     if isinstance(default_dirs, str):
#         default_dirs = [default_dirs]

#     print(f"\n{prompt}")
#     for idx, d in enumerate(default_dirs, 1):
#         print(f"  {idx}. {d}")
#     print("  0. Enter custom path")

#     choice = input(f"Select (Default: {default_dirs[0]}): ").strip()
#     if not choice:
#         return default_dirs[0]
#     if choice == "0":
#         return input("Enter custom path: ").strip()
#     try:
#         idx = int(choice)
#         return default_dirs[idx - 1]
#     except (ValueError, IndexError):
#         print("Invalid choice. Using default.")
#         return default_dirs[0]

# def normalize_dataframe(df):
#     df.columns = [col.strip().lower() for col in df.columns]
#     for col in df.columns:
#         if "id" in col:
#             df[col] = df[col].astype(str)
#     return df

# def smart_prompt(prompt, default, options=None):
#     print(f"\n{prompt}")
#     if options:
#         for i, option in enumerate(options, 1):
#             print(f"  {i}. {option}")
#         print(f"  0. Enter custom path")
#     choice = input(f"Select (Default: {default}): ").strip()
#     if not choice:
#         return default
#     if options and choice.isdigit():
#         choice = int(choice)
#         if 1 <= choice <= len(options):
#             return options[choice - 1]
#         elif choice == 0:
#             return input("Enter custom path: ").strip()
#     return choice

# def select_src_profile():
#     """Interactive source path selection from .env configuration"""
#     print("\n🔵 Select Source Data Directory:")
    
#     # Load environment variables
#     load_env()
    
#     # Get all defined source paths from .env
#     options = []
#     i = 1
#     while True:
#         path = os.getenv(f"SRC_PATH_{i}", "")
#         if not path:
#             break
#         options.append(path)
#         i += 1
    
#     # If no paths are defined, prompt for custom path
#     if not options:
#         print("⚠️ No source paths defined in .env")
#         while True:
#             custom_path = input("Enter source path: ").strip()
#             if not os.path.exists(custom_path):
#                 print(f"⚠️ Path does not exist: {custom_path}")
#                 retry = input("Do you want to try again? (y/n): ").lower()
#                 if retry != 'y':
#                     raise ValueError(f"❌ Invalid source path: {custom_path}")
#                 continue
#             return custom_path
    
#     # If only one path is defined and we're in auto mode, use it
#     if len(options) == 1 and os.getenv("RUN_MODE") == "auto":
#         print(f"✅ Using default source path: {options[0]}")
#         return options[0]
    
#     # Display options
#     for i, path in enumerate(options, 1):
#         print(f"  [{i}] {path}")
#     print("  [0] Enter custom path")
    
#     while True:
#         choice = input("Select a source path: ").strip()
#         if choice == "0":
#             custom_path = input("Enter custom source path: ").strip()
#             if not os.path.exists(custom_path):
#                 print(f"⚠️ Path does not exist: {custom_path}")
#                 retry = input("Do you want to try again? (y/n): ").lower()
#                 if retry != 'y':
#                     raise ValueError(f"❌ Invalid source path: {custom_path}")
#                 continue
#             return custom_path
#         elif choice.isdigit() and 1 <= int(choice) <= len(options):
#             selected_path = options[int(choice)-1]
#             if not os.path.exists(selected_path):
#                 print(f"⚠️ Selected path does not exist: {selected_path}")
#                 retry = input("Do you want to try again? (y/n): ").lower()
#                 if retry != 'y':
#                     raise ValueError(f"❌ Invalid source path: {selected_path}")
#                 continue
#             return selected_path
#         else:
#             print("⚠️ Invalid choice. Please try again.")

# def select_db_profile():
#     """Interactive database profile selection"""
#     print("\n🔵 Select Database Profile:")
#     print("  [1] Local PostgreSQL")
#     print("  [2] Supabase Session Pooler")
#     print("  [3] Supabase Transaction Pooler")
    
#     while True:
#         choice = input("Enter 1, 2, or 3: ").strip()
#         if choice in ["1", "2", "3"]:
#             return {
#                 "1": "local",
#                 "2": "supabase_session",
#                 "3": "supabase_transaction"
#             }[choice]
#         print("⚠️ Invalid choice. Please enter 1, 2, or 3.")

# # def get_profile_config(profile):
# #     """Get configuration for the selected profile"""
# #     if profile == "local":
# #         return {
# #             "DB_USER": os.getenv("LOCAL_DB_USER"),
# #             "DB_PASSWORD": os.getenv("LOCAL_DB_PASSWORD"),
# #             "DB_HOST": os.getenv("LOCAL_DB_HOST"),
# #             "DB_PORT": os.getenv("LOCAL_DB_PORT"),
# #             "DB_NAME": os.getenv("LOCAL_DB_NAME"),
# #             "DB_SCHEMA": os.getenv("LOCAL_DB_SCHEMA")
# #         }
# #     elif profile == "supabase_session":
# #         return {
# #             "DB_USER": os.getenv("SUPABASE_SESSION_USER"),
# #             "DB_PASSWORD": os.getenv("SUPABASE_SESSION_PASSWORD"),
# #             "DB_HOST": os.getenv("SUPABASE_SESSION_HOST"),
# #             "DB_PORT": os.getenv("SUPABASE_SESSION_PORT"),
# #             "DB_NAME": os.getenv("SUPABASE_SESSION_DB"),
# #             "DB_SCHEMA": os.getenv("SUPABASE_SESSION_SCHEMA"),
# #             "PROJECT_REF": os.getenv("SUPABASE_PROJECT_REF")
# #         }
# #     else:  # supabase_transaction
# #         return {
# #             "DB_USER": os.getenv("SUPABASE_TRANS_USER"),
# #             "DB_PASSWORD": os.getenv("SUPABASE_TRANS_PASSWORD"),
# #             "DB_HOST": os.getenv("SUPABASE_TRANS_HOST"),
# #             "DB_PORT": os.getenv("SUPABASE_TRANS_PORT"),
# #             "DB_NAME": os.getenv("SUPABASE_TRANS_DB"),
# #             "DB_SCHEMA": os.getenv("SUPABASE_TRANS_SCHEMA"),
# #             "PROJECT_REF": os.getenv("SUPABASE_PROJECT_REF")
# #         }

# def get_profile_config(profile):
#     """
#     Dynamically extracts DB connection config from .env based on selected profile.
#     Maps to normalized keys used throughout SchedulerX.
#     """
#     import os

#     keymap = {
#         "local": {
#             "DB_USER": "LOCAL_DB_USER",
#             "DB_PASSWORD": "LOCAL_DB_PASSWORD",
#             "DB_HOST": "LOCAL_DB_HOST",
#             "DB_PORT": "LOCAL_DB_PORT",
#             "DB_NAME": "LOCAL_DB_NAME",
#             "DB_SCHEMA": "LOCAL_DB_SCHEMA",
#         },
#         "supabase_session": {
#             "DB_USER": "SUPABASE_SESSION_USER",
#             "DB_PASSWORD": "SUPABASE_SESSION_PASSWORD",
#             "DB_HOST": "SUPABASE_SESSION_HOST",
#             "DB_PORT": "SUPABASE_SESSION_PORT",
#             "DB_NAME": "SUPABASE_SESSION_DB",
#             "DB_SCHEMA": "SUPABASE_SESSION_SCHEMA",
#             "PROJECT_REF": "SUPABASE_PROJECT_REF"
#         },
#         "supabase_transaction": {
#             "DB_USER": "SUPABASE_TRANS_USER",
#             "DB_PASSWORD": "SUPABASE_TRANS_PASSWORD",
#             "DB_HOST": "SUPABASE_TRANS_HOST",
#             "DB_PORT": "SUPABASE_TRANS_PORT",
#             "DB_NAME": "SUPABASE_TRANS_DB",
#             "DB_SCHEMA": "SUPABASE_TRANS_SCHEMA",
#             "PROJECT_REF": "SUPABASE_PROJECT_REF"
#         }
#     }

#     if profile not in keymap:
#         raise ValueError(f"Unsupported DB_PROFILE: {profile}")

#     config = {}
#     for key, env_var in keymap[profile].items():
#         config[key] = os.getenv(env_var)

#     return config

# # ORIG START

# def update_env_file(profile, config):
#     """Update .env file with new profile configuration"""
#     try:
#         # Read existing .env content
#         with open(ENV_FILE, 'r') as f:
#             lines = f.readlines()
        
#         # Prepare new content
#         new_lines = []
#         db_profile_found = False
#         db_url_found = False
        
#         # First, collect all environment variables
#         env_vars = {}
#         for line in lines:
#             if line.strip() and not line.startswith("#"):
#                 if "=" in line:
#                     key, value = line.split("=", 1)
#                     env_vars[key.strip()] = value.strip()
        
#         # Update with new profile values
#         for key, value in config.items():
#             env_vars[key] = value
        
#         # Write back all lines, updating DB_PROFILE and DATABASE_URL
#         for line in lines:
#             if line.startswith("DB_PROFILE="):
#                 new_lines.append(f"DB_PROFILE={profile}\n")
#                 db_profile_found = True
#             elif line.startswith("DATABASE_URL="):
#                 # Always rebuild DATABASE_URL from current profile values
#                 if profile == "local":
#                     db_url = f"postgresql://{env_vars['LOCAL_DB_USER']}:{env_vars['LOCAL_DB_PASSWORD']}@{env_vars['LOCAL_DB_HOST']}:{env_vars['LOCAL_DB_PORT']}/{env_vars['LOCAL_DB_NAME']}?schema={env_vars['LOCAL_DB_SCHEMA']}"
#                 elif profile == "supabase_session":
#                     db_url = f"postgresql://{env_vars['SUPABASE_SESSION_USER']}:{env_vars['SUPABASE_SESSION_PASSWORD']}@{env_vars['SUPABASE_SESSION_HOST']}:{env_vars['SUPABASE_SESSION_PORT']}/{env_vars['SUPABASE_SESSION_DB']}"
#                 else:  # supabase_transaction
#                     db_url = f"postgresql://{env_vars['SUPABASE_TRANS_USER']}:{env_vars['SUPABASE_TRANS_PASSWORD']}@{env_vars['SUPABASE_TRANS_HOST']}:{env_vars['SUPABASE_TRANS_PORT']}/{env_vars['SUPABASE_TRANS_DB']}"
#                 new_lines.append(f"DATABASE_URL={db_url}\n")
#                 db_url_found = True
#             else:
#                 new_lines.append(line)
        
#         # Add missing entries if not found
#         if not db_profile_found:
#             new_lines.append(f"DB_PROFILE={profile}\n")
#         if not db_url_found:
#             if profile == "local":
#                 db_url = f"postgresql://{env_vars['LOCAL_DB_USER']}:{env_vars['LOCAL_DB_PASSWORD']}@{env_vars['LOCAL_DB_HOST']}:{env_vars['LOCAL_DB_PORT']}/{env_vars['LOCAL_DB_NAME']}?schema={env_vars['LOCAL_DB_SCHEMA']}"
#             elif profile == "supabase_session":
#                 db_url = f"postgresql://{env_vars['SUPABASE_SESSION_USER']}:{env_vars['SUPABASE_SESSION_PASSWORD']}@{env_vars['SUPABASE_SESSION_HOST']}:{env_vars['SUPABASE_SESSION_PORT']}/{env_vars['SUPABASE_SESSION_DB']}"
#             else:  # supabase_transaction
#                 db_url = f"postgresql://{env_vars['SUPABASE_TRANS_USER']}:{env_vars['SUPABASE_TRANS_PASSWORD']}@{env_vars['SUPABASE_TRANS_HOST']}:{env_vars['SUPABASE_TRANS_PORT']}/{env_vars['SUPABASE_TRANS_DB']}"
#             new_lines.append(f"DATABASE_URL={db_url}\n")
        
#         # Write back to file
#         with open(ENV_FILE, 'w') as f:
#             f.writelines(new_lines)
        
#         print(f"✅ Database URL: {db_url}")
#         return True
        
#     except Exception as e:
#         print(f"❌ Error updating .env file: {e}")
#         return False

# def setup_environment():
#     """Setup environment with intelligent .env management"""
#     print_stage_header("SchedulerX Setup")
    
#     # Check if .env exists and has valid DB_PROFILE
#     if os.path.exists(ENV_FILE):
#         with open(ENV_FILE, 'r') as f:
#             env_content = f.read()
#             if "DB_PROFILE=" in env_content:
#                 # Extract current profile
#                 current_profile = None
#                 for line in env_content.split('\n'):
#                     if line.startswith("DB_PROFILE="):
#                         current_profile = line.split('=')[1].strip()
#                         break
                
#                 if current_profile:
#                     print(f"\nCurrent database profile: {current_profile}")
#                     print("\nDo you want to:")
#                     print("  [1] Keep using this profile")
#                     print("  [2] Switch to a different profile")
                    
#                     while True:
#                         choice = input("\nEnter 1 or 2: ").strip()
#                         if choice == "1":
#                             print(f"✅ Continuing with profile: {current_profile}")
#                             return {"DB_PROFILE": current_profile}
#                         elif choice == "2":
#                             break
#                         else:
#                             print("⚠️ Invalid choice. Please enter 1 or 2.")
    
#     # If no valid profile found or user wants to switch
#     print("\nPlease select a database profile to use:")
    
#     profile = select_db_profile()
#     config = get_profile_config(profile)
    
#     if update_env_file(profile, config):
#         print(f"✅ Successfully switched to profile: {profile}")
#         return {"DB_PROFILE": profile}
#     else:
#         raise Exception("Failed to setup environment")