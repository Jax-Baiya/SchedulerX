"""
🗣️ Prompt Tools
Handles CLI interaction: smart prompts, directory selection, DB profile selection.
"""

import os
from .session_tools import load_session, save_session
from .db_tools import load_env, select_db_profile

def list_xlsx_files(base_path):
    try:
        return [f for f in os.listdir(base_path) if f.endswith('.xlsx')]
    except FileNotFoundError:
        return []

def prompt_for_xlsx_file(prompt, default_path, base_path="."):
    print(f"\\n{prompt}")
    options = list_xlsx_files(base_path)
    options_display = [f"{i + 1}. {opt}" for i, opt in enumerate(options)]
    if options_display:
        for line in options_display:
            print(f"  {line}")
    print("  0. Enter custom path")

    default_name = os.path.basename(default_path)
    selection = input(f"Select (Default: {default_name}): ").strip()

    if selection == "":
        return default_path
    elif selection == "0":
        return input("Enter custom path: ").strip()
    else:
        try:
            idx = int(selection) - 1
            return os.path.join(base_path, options[idx])
        except (IndexError, ValueError):
            print("⚠️ Invalid selection. Using default.")
            return default_path

def get_or_prompt(session_key, prompt_text, default, options=None):
    session = load_session()
    if session_key in session and session[session_key]:
        return session[session_key]

    print(f"\\n{prompt_text}")
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

def smart_prompt(prompt, default, options=None):
    print(f"\\n{prompt}")
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

def prompt_for_directory(prompt, default_dirs):
    if isinstance(default_dirs, str):
        default_dirs = [default_dirs]

    print(f"\\n{prompt}")
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

def list_subdirectories(base_path="."):
    try:
        return [
            d for d in os.listdir(base_path)
            if os.path.isdir(os.path.join(base_path, d))
        ]
    except FileNotFoundError:
        return []

def select_src_profile():
    print("\\n🔵 Select Source Data Directory:")
    load_env()

    options = []
    i = 1
    while True:
        path = os.getenv(f"SRC_PATH_{i}", "")
        if not path:
            break
        options.append(path)
        i += 1

    if not options:
        print("⚠️ No source paths defined in .env")
        while True:
            custom_path = input("Enter source path: ").strip()
            if not os.path.exists(custom_path):
                print(f"⚠️ Path does not exist: {custom_path}")
                retry = input("Do you want to try again? (y/n): ").lower()
                if retry != 'y':
                    raise ValueError(f"❌ Invalid source path: {custom_path}")
                continue
            return custom_path

    if len(options) == 1 and os.getenv("RUN_MODE") == "auto":
        print(f"✅ Using default source path: {options[0]}")
        return options[0]

    for i, path in enumerate(options, 1):
        print(f"  [{i}] {path}")
    print("  [0] Enter custom path")

    while True:
        choice = input("Select a source path: ").strip()
        if choice == "0":
            custom_path = input("Enter custom source path: ").strip()
            if not os.path.exists(custom_path):
                print(f"⚠️ Path does not exist: {custom_path}")
                retry = input("Do you want to try again? (y/n): ").lower()
                if retry != 'y':
                    raise ValueError(f"❌ Invalid source path: {custom_path}")
                continue
            return custom_path
        elif choice.isdigit() and 1 <= int(choice) <= len(options):
            selected_path = options[int(choice)-1]
            if not os.path.exists(selected_path):
                print(f"⚠️ Selected path does not exist: {selected_path}")
                retry = input("Do you want to try again? (y/n): ").lower()
                if retry != 'y':
                    raise ValueError(f"❌ Invalid source path: {selected_path}")
                continue
            return selected_path
        else:
            print("⚠️ Invalid choice. Please try again.")