import os
import json

SESSION_FILE = os.path.join("logs", "session.json")
ENV_FILE = ".env"

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

def get_or_prompt(session_key, prompt_text, default, options=None):
    session = load_session()
    if session_key in session and session[session_key]:
        return session[session_key]  # ✅ Use existing value immediately

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

def load_session():
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, "r") as f:
            return json.load(f)
    return {}

def save_session(data):
    with open(SESSION_FILE, "w") as f:
        json.dump(data, f, indent=4)

def load_env():
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    os.environ[key] = value

def save_env(data):
    with open(ENV_FILE, "w") as f:
        for key, value in data.items():
            f.write(f"{key}={value}\n")


def prepare_env(session, output_dir="assets"):
    from utils import get_or_prompt
    env_path = "./.env"
    db_user = session.get("db_user") or get_or_prompt("db_user", "Enter DB username", "postgres")
    db_password = session.get("db_password") or get_or_prompt("db_password", "Enter DB password", "password")
    db_name = session.get("db_name") or get_or_prompt("db_name", "Enter DB name", "postgres")
    db_schema = session.get("db_schema") or get_or_prompt("db_schema", "Enter DB schema", "public")

    session.update({
        "db_user": db_user,
        "db_password": db_password,
        "db_name": db_name,
        "db_schema": db_schema
    })

    db_url = f"postgresql://{db_user}:{db_password}@localhost:5432/{db_name}?schema={db_schema}"
    env_vars = {
        "DB_USER": db_user,
        "DB_PASSWORD": db_password,
        "DB_NAME": db_name,
        "DB_SCHEMA": db_schema,
        "DATABASE_URL": db_url
    }

    os.makedirs(output_dir, exist_ok=True)
    with open("./.env", "w") as f:
        for key, value in env_vars.items():
            f.write(f"{key}={value}\n")

    print(f"✅ .env file created at {env_path}")
    return session