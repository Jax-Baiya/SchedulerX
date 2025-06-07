"""
📊 Stage 3: Convert JSON to Excel
Cleans and consolidates decoded JSON files into structured Excel sheets.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import json
import pandas as pd
import os
import logging
from shared.media_utils import validation, metadata

from utils import (
    load_session,
    save_session,
    get_or_prompt,
    smart_prompt,
    prepare_pipeline_paths,
    get_run_mode_manager,
    print_stage_header
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def parse_following_data(data):
    official_authors = data.get("officialAuthorList", [])
    started = data.get("started", [])
    not_interested = data.get("notInterested", [])

    author_items = data.get("authorItems", {})
    last_run = data.get("lastRun", {})

    records = []
    for author_id, details in author_items.items():
        run_info = last_run.get(author_id, {})
        records.append({
            "author_id": str(author_id),
            "official": author_id in official_authors,
            "started": author_id in started,
            "not_interested": author_id in not_interested,
            "infolder": ", ".join(details.get("inFolder", [])),
            "disappeared": ", ".join(details.get("disappeared", [])),
            "last_run_start": run_info.get("start"),
            "last_run_finish": run_info.get("finish"),
            "last_run_bottom": run_info.get("bottom"),
            "last_run_firstadded": run_info.get("firstAdded")
        })

    return pd.DataFrame(records)

def load_and_clean_json(file_path, table_name):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

            # Enforce shared validation/metadata for videos
            if table_name == "videos":
                for item in data if isinstance(data, list) else []:
                    file_path = item.get("file_path")
                    if file_path and os.path.exists(file_path):
                        if not validation.validate_file_size(file_path, 500):
                            logging.warning(f"File too large: {file_path}")
                        if not validation.validate_file_type(file_path, ["video/mp4", "video/quicktime", "video/x-msvideo"]):
                            logging.warning(f"Invalid file type: {file_path}")
                        item["media_metadata"] = metadata.extract_metadata(file_path)

            if table_name == "following":
                df = parse_following_data(data)

            elif table_name == "bookmarks":
                if isinstance(data, int):
                    logging.warning(f"Bookmarks data is an integer ({data}), converting to empty DataFrame.")
                    return pd.DataFrame()
                df = pd.DataFrame(data if isinstance(data, list) else [data])

            elif table_name == "likes":
                df = pd.DataFrame(data if isinstance(data, list) else [data])

            elif table_name == "texts":
                if isinstance(data, dict):
                    df = pd.DataFrame.from_dict(data, orient='index').reset_index()
                    df.rename(columns={'index': 'text_id', 0: 'text_content'}, inplace=True)
                    df['text_content'].fillna("No Content Available", inplace=True)
                else:
                    logging.warning("Texts data is not in expected dict format, converting to empty DataFrame.")
                    return pd.DataFrame()

            elif isinstance(data, dict):
                df = pd.DataFrame.from_dict(data, orient='index').reset_index()
                df.rename(columns={'index': 'id'}, inplace=True)

            elif isinstance(data, list):
                df = pd.DataFrame(data)

            else:
                logging.warning(f"Unexpected data structure in {file_path}")
                return pd.DataFrame()

            df.columns = [f"{table_name}_{col}".lower() for col in df.columns]

            if table_name == "authors":
                for col in df.columns:
                    if "uniqueids" in col or "nicknames" in col:
                        df[col] = df[col].apply(lambda x: x[0] if isinstance(x, list) and x else x)

            if table_name == "videos":
                df.fillna({'videos_size': 'unknown', 'videos_itemmute': False}, inplace=True)

            for col in df.columns:
                if "id" in col:
                    df[col] = df[col].astype(str)

            return df

    except Exception as e:
        logging.error(f"Error loading {file_path}: {e}")
        return pd.DataFrame()

def consolidate_and_save_cleaned(file_paths, output_file):
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        for table_name, path in file_paths.items():
            if os.path.exists(path):
                df = load_and_clean_json(path, table_name)
                if not df.empty:
                    df.to_excel(writer, sheet_name=table_name[:31], index=False)
                    logging.info(f"Processed and saved {table_name}")
                else:
                    logging.warning(f"No data or empty DataFrame for {table_name}, skipped.")
            else:
                logging.warning(f"{table_name} file does not exist at {path}")

    logging.info(f"All cleaned data saved to {output_file}")

def run():
    print_stage_header("Processing Excel Files")
    
    session = load_session()
    run_mode_manager = get_run_mode_manager()

    # Use prepare_pipeline_paths to set up output paths
    prepare_pipeline_paths(session)
    base_output = session["dst_root"]
    decoded_dir = session["decoded_directory"]
    xlsx_dir = os.path.join(base_output, "xlsx_files")
    os.makedirs(xlsx_dir, exist_ok=True)

    # Always use options['xlsx_file'] if provided (from API/frontend)
    output_file = None
    if "options" in session and isinstance(session["options"], dict):
        output_file = session["options"].get("xlsx_file")
    if not output_file:
        output_file = os.path.basename(session.get("xlsx_file", "data.xlsx"))
    if not output_file:
        output_file = "data.xlsx"
    session["xlsx_file"] = os.path.join(xlsx_dir, output_file)
    save_session(session)

    # Only prompt in step mode
    if run_mode_manager.run_mode == "step":
        output_file = smart_prompt(
            "Enter the output Excel file name",
            output_file
        )
        session["xlsx_file"] = os.path.join(xlsx_dir, output_file)
        save_session(session)

    # In auto mode, do NOT prompt; always use session["xlsx_file"]
    output_file_path = session["xlsx_file"]

    file_paths = {
        "authors": os.path.join(decoded_dir, "dba.json"),
        "bookmarks": os.path.join(decoded_dir, "dbb.json"),
        "following": os.path.join(decoded_dir, "dbf.json"),
        "videos": os.path.join(decoded_dir, "dbv.json"),
        "likes": os.path.join(decoded_dir, "Likes.json"),
        "texts": os.path.join(decoded_dir, "Texts.json")
    }

    consolidate_and_save_cleaned(file_paths, output_file_path)
    logging.info(f"✅ Consolidated data saved to: {output_file_path}")

if __name__ == "__main__":
    run()