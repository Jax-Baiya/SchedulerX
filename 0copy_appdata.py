import os
import shutil
from utils import get_or_prompt, load_session, save_session

def copy_appdata(src_root, dst_root):
    src_path = os.path.join(src_root, ".appdata")
    dst_path = os.path.join(dst_root, ".appdata")

    if not os.path.exists(src_path):
        print(f"❌ Source path not found: {src_path}")
        return

    if os.path.exists(dst_path):
        print(f"⚠️ Existing .appdata found in {dst_root}. Overwriting...")
        shutil.rmtree(dst_path)

    shutil.copytree(src_path, dst_path)
    print(f"✅ Copied .appdata from {src_path} → {dst_path}")

if __name__ == "__main__":
    session = load_session()

    src_root = get_or_prompt("src_root", "Enter the source root path", "/mnt/c/Users/jaxba/AlexNova/data")
    dst_root = get_or_prompt("dst_root", "Enter the destination root path", "assets")

    session["src_root"] = src_root
    session["dst_root"] = dst_root
    save_session(session)

    copy_appdata(src_root, dst_root)
