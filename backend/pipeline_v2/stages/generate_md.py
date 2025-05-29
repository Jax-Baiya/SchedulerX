"""
📝 Stage 1 (Corrected): Generate Encoded Markdown Summary
Compiles and compresses .appdata files into markdown-embedded base64 blocks.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import gzip
import base64

from utils import (
    load_session,
    save_session,
    print_stage_header,
    prepare_pipeline_paths
)

# def encode_file_to_base64(filepath):
#     with open(filepath, "rb") as f:
#         compressed = gzip.compress(f.read())
#         encoded = base64.b64encode(compressed).decode("utf-8")
#     return encoded

def append_file_content(filepath, output_file):
    with open(output_file, "a", encoding="utf-8") as out:
        out.write(f"### {filename}\n")
        out.write(f"```\n")
        with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
            out.write(infile.read())
        out.write(f"\n```\n\n")

def generate_encoded_markdown(appdata_dir, output_file):
    if os.path.exists(output_file):
        open(output_file, "w").close()  # Clear the output file
    if os.path.isdir(appdata_dir):
        for filename in sorted(os.listdir(appdata_dir)):
            file_path = os.path.join(appdata_dir, filename)
            if os.path.isfile(file_path):
                with open(output_file, "a", encoding="utf-8") as out:
                    out.write(f"### {filename}\n")
                    # out.write(f"```json\n")
                    out.write(f"```\n")
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
                        out.write(infile.read())
                    out.write(f"\n```\n\n")
                # encoded_data = encode_file_to_base64(file_path)
                # with open(output_file, "a", encoding="utf-8") as out:
                #     out.write(f"<!-- START JSON:{filename} -->\\n")
                #     out.write(encoded_data)
                #     out.write(f"\\n<!-- END JSON:{filename} -->\\n\\n")

    print(f"✅ Encoded markdown summary written to: {output_file}")

def run():
    print_stage_header("Generate Encoded Markdown Summary")

    session = load_session()
    # dst_root = session.get("dst_root", "assets")
    prepare_pipeline_paths(session)
    dst_root = session["dst_root"]
    appdata_dir = os.path.join(dst_root, ".appdata")
    output_file = os.path.join(dst_root, "summary.md")

    session["input_file_path"] = str(output_file)
    save_session(session)

    generate_encoded_markdown(appdata_dir, output_file)

if __name__ == "__main__":
    run()