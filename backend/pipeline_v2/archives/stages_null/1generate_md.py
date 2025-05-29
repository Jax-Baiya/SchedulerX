import os
from pathlib import Path
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import load_session, save_session, smart_prompt, get_or_prompt, prepare_pipeline_paths

# Dynamically find the root path
PROJECT_ROOT = Path(__file__).resolve().parents[2]

def list_directory_options(base_path):
    try:
        items = sorted([f for f in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, f))])
    except FileNotFoundError:
        items = []
    return items

def prompt_for_path(title, default_path, base_path="."):
    print(f"\n{title}")
    options = list_directory_options(base_path)
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

def append_file_content(filepath, output_file):
    with open(output_file, "a", encoding="utf-8") as out:
        out.write(f"### {filepath}\n")
        out.write("```\n")
        with open(filepath, "r", encoding="utf-8", errors="ignore") as infile:
            out.write(infile.read())
        out.write("\n```\n\n")

def generate_markdown(appdata_dir, output_file):
    if os.path.exists(output_file):
        open(output_file, "w").close()  # Clear the output file

    if os.path.isdir(appdata_dir):
        for filename in sorted(os.listdir(appdata_dir)):
            file_path = os.path.join(appdata_dir, filename)
            if os.path.isfile(file_path):
                with open(output_file, "a", encoding="utf-8") as out:
                    out.write(f"### {filename}\n")
                    out.write("```\n")
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
                        out.write(infile.read())
                    out.write("\n```\n\n")
                # append_file_content(file_path, output_file)

    print(f"\n✅ Markdown summary written to: {output_file}")

if __name__ == "__main__":
    session = load_session()

    output_dir = session.get("output_directory", str(PROJECT_ROOT / "backend" / "assets"))
    # appdata_dir = Path(output_dir,".appdata")
    # output_file = Path(output_dir, "summary.md")
    output_file = session["input_file_path"]
    appdata_dir = os.path.join(session["dst_root"], ".appdata")

    session["input_file_path"] = str(output_file)  # Also store in session and💥 Ensure it's a string!
    save_session(session)

    generate_markdown(appdata_dir, output_file)
    print(f"\n✅ Markdown summary written to: {output_file}")