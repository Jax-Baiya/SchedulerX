"""
📁 File Operations Utilities
Handles directory validation and file type resolution.
"""

import os

import os

def prepare_pipeline_paths(session):
    base_dst = session.get("dst_root", "backend/pipeline_v2/assets")
    session["dst_root"] = base_dst
    session["input_file_path"] = os.path.join(base_dst, "summary.md")
    session["decoded_directory"] = os.path.join(base_dst, "decoded_sections")
    session["xlsx_file"] = os.path.join(base_dst, "xlsx_files", "data.xlsx")

    os.makedirs(os.path.join(base_dst, "xlsx_files"), exist_ok=True)
    from .session_tools import save_session
    save_session(session)
    return session

def normalize_dataframe(df):
    df.columns = [col.strip().lower() for col in df.columns]
    for col in df.columns:
        if "id" in col:
            df[col] = df[col].astype(str)
    return df

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def resolve_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    return {
        '.mp4': 'video',
        '.jpg': 'image',
        '.json': 'metadata',
    }.get(ext, 'unknown')