import os
import json

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SESSION_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs', 'session.json'))
ENV_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))

def generate_database_url(user, password, host, port, db_name, schema):
    return f"postgresql://{user}:{password}@{host}:{port}/{db_name}?schema={schema}"

def load_session():
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, "r") as f:
            return json.load(f)
    return {}

def save_session(session):
    os.makedirs(os.path.dirname(SESSION_FILE), exist_ok=True)
    serializable_session = {
        k: str(v) if isinstance(v, (os.PathLike)) else v
        for k, v in session.items()
    }
    with open(SESSION_FILE, "w") as f:
        json.dump(serializable_session, f, indent=4)

def get_or_prompt(session_key, prompt_text, default, options=None):
    session = load_session()
    if session_key in session and session[session_key]:
        return session[session_key]

    print(f"\n{prompt_text}")
    if options:
        for i, option in enumerate(options, 1):
            print(f"  {i}. {option}")
        print("  0. Enter custom path")

    choice = input(f"Select (Default: {default}): ").strip()

    if not choice:
        value = default
    elif options and choice.isdigit():
        choice = int(choice)
        if 1 <= choice <= len(options):
            value = options[choice - 1]
        elif choice == 0:
            value = input("Enter custom path: ").strip()
        else:
            print("⚠️ Invalid choice. Using default.")
            value = default
    else:
        value = choice or default

    session[session_key] = value
    save_session(session)
    return value

def write_env(session, dict, path=ENV_FILE):
    """Write updated environment variables and rebuild DATABASE_URL from session data."""
    user = session.get("DB_USER", "postgres")
    password = session.get("DB_PASSWORD", "password")
    host = session.get("DB_HOST", "localhost")
    port = session.get("DB_PORT", "5432")
    db = session.get("DB_NAME", "postgres")
    schema = session.get("DB_SCHEMA", "public")

    # Always rebuild and store DATABASE_URL in session
    session["DATABASE_URL"] = f"postgresql://{user}:{password}@{host}:{port}/{db}?schema={schema}"

    try:
        with open(path, "w") as f:
            f.write(f"DB_USER={user}\n")
            f.write(f"DB_PASSWORD={password}\n")
            f.write(f"DB_NAME={db}\n")
            f.write(f"DB_SCHEMA={schema}\n")
            f.write(f"DB_HOST={host}\n")
            f.write(f"DB_PORT={port}\n")
            f.write(f"DATABASE_URL={session['DATABASE_URL']}\n")
        print(f"✅ .env file refreshed at {path}")
    except Exception as e:
        print(f"❌ Failed to write .env file: {e}")

def save_env(data):
    with open(ENV_FILE, "w") as f:
        for key, value in data.items():
            f.write(f"{key}={value}\n")

def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    os.environ[key] = value

def move_logs_and_session():
    log_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs'))
    session_path = os.path.join(log_dir, "session.json")
    if os.path.exists(session_path):
        print(f"🧹 Cleanup complete: logs and session.json moved to /logs/")

def print_stage_header(title):
    print("\n" + "="*40)
    print(f"🔹 {title}")
    print("="*40)

def list_subdirectories(base_path="."):
    try:
        return [
            d for d in os.listdir(base_path)
            if os.path.isdir(os.path.join(base_path, d))
        ]
    except FileNotFoundError:
        return []

def prompt_for_directory(prompt, default_dirs):
    if isinstance(default_dirs, str):
        default_dirs = [default_dirs]

    print(f"\n{prompt}")
    for idx, d in enumerate(default_dirs, 1):
        print(f"  {idx}. {d}")
    print("  0. Enter custom path")

    choice = input(f"Select (Default: {default_dirs[0]}): ").strip()
    if not choice:
        return default_dirs[0]
    if choice == "0":
        return input("Enter custom path: ").strip()
    try:
        idx = int(choice)
        return default_dirs[idx - 1]
    except (ValueError, IndexError):
        print("Invalid choice. Using default.")
        return default_dirs[0]

def normalize_dataframe(df):
    df.columns = [col.strip().lower() for col in df.columns]
    for col in df.columns:
        if "id" in col:
            df[col] = df[col].astype(str)
    return df

def smart_prompt(prompt, default, options=None):
    print(f"\n{prompt}")
    if options:
        for i, option in enumerate(options, 1):
            print(f"  {i}. {option}")
        print(f"  0. Enter custom path")
    choice = input(f"Select (Default: {default}): ").strip()
    if not choice:
        return default
    if options and choice.isdigit():
        choice = int(choice)
        if 1 <= choice <= len(options):
            return options[choice - 1]
        elif choice == 0:
            return input("Enter custom path: ").strip()
    return choice