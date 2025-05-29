"""
🗂️ Session Tools
Handles loading and saving user session data.
"""

import os
import json
from pathlib import Path

SESSION_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'session', 'session.json'))

def load_session():
    """
    Load session data from file. If file doesn't exist or is invalid,
    return empty dict and create a new valid session file.
    """
    try:
        if os.path.exists(SESSION_FILE):
            with open(SESSION_FILE, "r") as f:
                    content = f.read().strip()
                    if content:  # Only try to parse if file is not empty
                        return json.loads(content)
    except (json.JSONDecodeError, IOError) as e:
        print(f"⚠️ Warning: Could not load session file ({str(e)})")
        print("Creating new session...")
    
    # If we get here, either file doesn't exist, is empty, or is invalid
    # Create a new session file with empty dict
    save_session({})
    return {}

def save_session(session):
    """
    Save session data to file, ensuring the directory exists
    and the data is serializable.
    """
    try:
        os.makedirs(os.path.dirname(SESSION_FILE), exist_ok=True)
        serializable_session = {
                k: str(v) if isinstance(v, (os.PathLike, Path)) else v
                for k, v in session.items()
            }
        with open(SESSION_FILE, "w") as f:
            json.dump(serializable_session, f, indent=4)
    except Exception as e:
        print(f"⚠️ Warning: Could not save session ({str(e)})")

# Add this simple class to match the API's expectations
class SessionData:
    def __init__(self):
        self._data = None
    
    def get_data(self):
        if self._data is None:
            self._data = load_session()
        return self._data
    
    def save_data(self, data):
        self._data = data
        save_session(data)

# Add this function for API compatibility
def get_session_data():
    return SessionData()

def move_logs_and_session():
    """Move session.json from logs to session directory if needed."""
    log_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs'))
    old_session_path = os.path.join(log_dir, "session.json")
    
    if os.path.exists(old_session_path):
        try:
            # Ensure session directory exists
            os.makedirs(os.path.dirname(SESSION_FILE), exist_ok=True)
            
            # Try to load old session data
            with open(old_session_path, 'r') as f:
                old_data = json.load(f)
            
            # Save to new location
            save_session(old_data)
            
            # Remove old file
            os.remove(old_session_path)
            print(f"🧹 Cleanup complete: session.json moved from /logs/ to /session/")
        except Exception as e:
            print(f"⚠️ Warning: Could not move old session file ({str(e)})")

def initialize_session():
    """
    Initialize session system, ensuring a valid session file exists.
    Should be called at startup.
    """
    # First try to move old session if it exists
    move_logs_and_session()
    
    # Then ensure we have a valid session file
    if not os.path.exists(SESSION_FILE):
        save_session({})
        print("✅ New session initialized")
    else:
        # Validate existing session
        try:
            with open(SESSION_FILE, 'r') as f:
                json.load(f)
        except json.JSONDecodeError:
            print("⚠️ Existing session file is invalid, creating new session")
            save_session({})