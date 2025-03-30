import os
os.makedirs("logs", exist_ok=True)
import json
import logging
import subprocess
from datetime import datetime
from utils import save_env, prepare_env, load_session, save_session

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s", filename="logs/master_log.log", filemode="w")
dashboard_log = "logs/dashboard_log.txt"

# def load_session():
#     session_file = "session.json"
#     if os.path.exists(session_file):
#         with open(session_file, "r") as f:
#             return json.load(f)
#     return {}

# def save_session(data):
#     with open("session.json", "w") as f:
#         json.dump(data, f, indent=4)

def run_script(script_name, args=None):
    try:
        logging.info(f"Starting execution of {script_name} with args {args}...")
        start_time = datetime.now()
        command = ["python3", script_name]
        if args:
            command.extend(args)
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        logging.info(f"Successfully executed {script_name} in {duration:.2f} seconds.")
        return script_name, True, result.stdout, duration
    except subprocess.CalledProcessError as e:
        logging.error(f"Failed to execute {script_name}. Exit code: {e.returncode}")
        return script_name, False, e.stderr, 0

def append_to_dashboard_log(step, success, message, duration):
    with open(dashboard_log, "a") as log_file:
        log_file.write(f"Step: {step}\nSuccess: {success}\nMessage: {message}\nDuration: {duration:.2f} seconds\n")
        log_file.write("───────────────────────────────────────\n")

def prompt_user(prompt, default):
    user_input = input(f"{prompt} (Default: {default}): ").strip()
    return user_input if user_input else default

def ensure_env_from_session(session):
    env_path = ".env"
    if not os.path.exists(env_path):
        db_env_keys = ["db_user", "db_password", "db_name", "db_schema"]
        db_values = {key.upper(): session.get(key, f"default_{key}") for key in db_env_keys}
        db_values["DATABASE_URL"] = f"postgresql://{db_values['DB_USER']}:{db_values['DB_PASSWORD']}@localhost:5432/{db_values['DB_NAME']}?schema={db_values['DB_SCHEMA']}"
        save_env(db_values)

def main():
    session = load_session()

    try:
        # Prompt user for key values
        source_dir = session.get("source_directory") or input("Enter the source directory (contains `.appdata`) (Default: /path/to/your/.appdata/folder): ") or "/path/to/your/.appdata/folder"
        destination_dir = session.get("destination_directory") or input("Enter the destination directory (project workspace) (Default: assets): ") or "assets"
        output_dir = session.get("output_directory") or input("Enter the output directory (Default: assets): ") or "assets"
        xlsx_file_name = session.get("xlsx_file_name") or input("Enter the output Excel file name (Default: data.xlsx): ") or "data.xlsx"
        markdown_path = session.get("markdown_file") or input("Enter the input markdown file path (Default: assets/summary.md): ") or "assets/summary.md"

        # Update session
        session.update({
            "source_directory": source_dir,
            "destination_directory": destination_dir,
            "output_directory": output_dir,
            "xlsx_file": os.path.join(output_dir, "xlsx_files", xlsx_file_name),
            "xlsx_file_name": xlsx_file_name,
            "markdown_file": markdown_path
        })

        save_session(session)
        session = prepare_env(session)

        # Pipeline stages
        stages = [
            ("0copy_appdata.py", []),
            ("1generate_md.py", []),
            ("2decode.py", []),
            ("3xlsx.py", []),
            ("4append_consolidated.py", []),
            ("5import_db.py", []),
        ]

        passed = 0
        failed = 0

        for idx, (script, args) in enumerate(stages, 1):
            logging.info(f"Starting Stage {idx}: {script}")
            print(f"Running Stage {idx}: {script}")
            result = subprocess.run(["python3", script] + args)
            if result.returncode == 0:
                logging.info(f"✅ Stage {idx} ({script}) completed successfully.")
                passed += 1
            else:
                logging.error(f"❌ Stage {idx} ({script}) failed.")
                failed += 1
                print(f"Stage {idx} failed. Aborting execution.")
                break

        print("\nExecution Summary:")
        print(f"Total Passed: {passed}")
        print(f"Total Failed: {failed}")

        print("Master controller script execution completed. Check master_log.log and dashboard_log.txt for details.")

        # Optional cleanup
        try:
            subprocess.run(["python3", "cleanup.py"], check=True)
            print("🧹 Cleanup complete: logs and session.json moved to /logs/")
        except Exception as e:
            print(f"⚠️ Cleanup skipped: {e}")

    except KeyboardInterrupt:
        print("\nExecution interrupted by user. Exiting.")
    except Exception as e:
        logging.exception(f"Unhandled exception: {e}")
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()