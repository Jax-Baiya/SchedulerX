"""
🔓 Stage 2: Decode Base64 Sections
Extracts and decodes embedded base64 sections from a markdown file.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import base64
import gzip
import json
import os
import re
import logging
from shared.media_utils import validation, metadata
from utils import (
    load_session,
    save_session,
    print_stage_header,
    get_run_mode_manager,
    prepare_pipeline_paths,
)

logging.basicConfig(filename="decode.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def decode_base64_data(base64_string):
    try:
        compressed_data = base64.b64decode(base64_string)
        try:
            decompressed_data = gzip.decompress(compressed_data).decode("utf-8")
        except gzip.BadGzipFile:
            decompressed_data = compressed_data.decode("utf-8")
        return json.loads(decompressed_data)
    except Exception as e:
        logging.error(f"Decoding failed: {e}")
        return {"error": str(e)}

def extract_base64_sections(file_path):
    pattern = re.compile(r'window\.(\w+)_base64\s*=\s*[\'"]([A-Za-z0-9+/=\s]+)[\'"]\s*;', re.MULTILINE)
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
    matches = [(identifier, base64_data.replace("\n", "").replace(" ", "")) for identifier, base64_data in pattern.findall(content)]
    return matches

def process_file(file_path, output_dir):
    sections = extract_base64_sections(file_path)
    decoded_data = {}

    os.makedirs(output_dir, exist_ok=True)

    for identifier, base64_data in sections:
        decoded_json = decode_base64_data(base64_data)

        # Enforce shared validation/metadata for video sections
        if identifier.lower() == "videos" and isinstance(decoded_json, list):
            for item in decoded_json:
                file_path = item.get("file_path")
                if file_path and os.path.exists(file_path):
                    if not validation.validate_file_size(file_path, 500):
                        logging.warning(f"File too large: {file_path}")
                    if not validation.validate_file_type(file_path, ["video/mp4", "video/quicktime", "video/x-msvideo"]):
                        logging.warning(f"Invalid file type: {file_path}")
                    item["media_metadata"] = metadata.extract_metadata(file_path)

        decoded_data[identifier] = decoded_json

        output_file = os.path.join(output_dir, f"{identifier}.json")
        with open(output_file, "w", encoding="utf-8") as json_file:
            json.dump(decoded_json, json_file, indent=4)

    logging.info(f"Decoded {len(sections)} sections. Output saved to: {output_dir}")
    return decoded_data

def rename_output_files(output_dir):
    renames = {
        "db.json": "Likes.json",
        "dbvd.json": "Texts.json"
    }
    for old, new in renames.items():
        src = os.path.join(output_dir, old)
        dst = os.path.join(output_dir, new)
        if os.path.exists(src):
            os.rename(src, dst)
            print(f"🔄 Renamed {old} → {new}")
        else:
            print(f"⚠️ File {old} not found in {output_dir}, skipping...")

def run():
    print_stage_header("Decode Base64 Sections")

    session = load_session()
    run_mode_manager = get_run_mode_manager()

    # Use prepare_pipeline_paths to set up output paths
    prepare_pipeline_paths(session)
    base_output = session["dst_root"]
    input_file_path = session["input_file_path"]
    decoded_dir = session["decoded_directory"]
    save_session(session)

    decoded_results = process_file(input_file_path, decoded_dir)

    print(f"\n✅ Decoded sections saved to: {decoded_dir}")
    for section, data in decoded_results.items():
        print(f" - {section}: {'❌ Error' if 'error' in data else '✅ Success'}")

    rename_output_files(decoded_dir)

if __name__ == "__main__":
    run()