import base64
import gzip
import json
import os
import re
import logging
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'utils')))
from utils import get_or_prompt, load_session, smart_prompt, save_session

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

if __name__ == "__main__":
    session = load_session()
    md_options = [f for f in os.listdir() if f.endswith(".md")]
    base_output = get_or_prompt("output_directory", "Select base output directory", "assets")
    decoded_dir = os.path.join(base_output, "decoded_sections")
    session["decoded_directory"] = decoded_dir

    input_file_path = get_or_prompt("input_file_path", "Select input markdown file", os.path.join(base_output, "summary.md"), md_options)
    session["input_file_path"] = input_file_path
    session["decoded_directory"] = decoded_dir
    
    save_session(session)

    decoded_results = process_file(input_file_path, decoded_dir)

    print(f"\n✅ Decoded sections saved to: {decoded_dir}")
    for section, data in decoded_results.items():
        print(f" - {section}: {'❌ Error' if 'error' in data else '✅ Success'}")

    rename_output_files(decoded_dir)
