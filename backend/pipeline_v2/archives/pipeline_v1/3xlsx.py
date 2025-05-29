import json
import pandas as pd
import os
import logging
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import load_session, save_session, smart_prompt, get_or_prompt

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
    with pd.ExcelWriter(output_file) as writer:
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

def smart_prompt(prompt, default, options=None):
    print(f"\n{prompt}")
    if options:
        for i, option in enumerate(options, 1):
            print(f" {i}. {option}")
        print(f" 0. Enter Custom Path")
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

if __name__ == "__main__":
    session = load_session()

    base_output = get_or_prompt("output_directory", "Select output base directory", "assets")
    decoded_dir = session.get("decoded_directory", os.path.join(base_output, "decoded_sections"))
    xlsx_dir = os.path.join(base_output, "xlsx_files")
    os.makedirs(xlsx_dir, exist_ok=True)

    output_file = get_or_prompt("output_file", "Enter the output Excel file name", "data.xlsx")
    output_file_path = os.path.join(xlsx_dir, output_file)

    session["xlsx_file"] = output_file_path
    save_session(session)

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