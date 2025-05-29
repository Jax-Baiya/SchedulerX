import os
import shutil
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import load_session, save_session, smart_prompt, get_or_prompt

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def move_logs_and_session():
    log_dir = "logs"
    ensure_dir(log_dir)

    for filename in os.listdir("."):
        if filename.endswith(".log") or filename == "session.json":
            shutil.move(filename, os.path.join(log_dir, filename))
            print(f"Moved {filename} → {log_dir}/")

if __name__ == "__main__":
    move_logs_and_session()