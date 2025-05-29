"""
📎 Stage 4: Append Consolidated Sheet
Merges key sheets into a unified 'consolidated' sheet within the existing Excel file.
"""

from utils.bootstrap import bootstrap_project
bootstrap_project()

import os
import pandas as pd
import logging

from shared.media_utils import validation, metadata

from utils import (
    prepare_pipeline_paths,
    list_xlsx_files,
    prompt_for_xlsx_file,
    save_session,
    smart_prompt,
    load_session,
    get_or_prompt
)

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def load_data(file_path, sheet_name):
    try:
        df = pd.read_excel(file_path, sheet_name=sheet_name, dtype=str)
        df.columns = [col.strip().lower() for col in df.columns]
        logging.info(f"✅ Loaded {sheet_name} successfully.")
        return df
    except Exception as e:
        logging.error(f"❌ Error loading {sheet_name}: {e}")
        return pd.DataFrame()

def validate_data(df, sheet_name):
    errors = []
    missing = df.isnull().sum()
    if missing.any():
        missing_cols = missing[missing > 0].index.tolist()
        errors.append(f"{sheet_name}: Missing values in {missing_cols}")
    for err in errors:
        logging.warning(err)
    return errors

def fix_data(df):
    if 'authors_uniqueids' in df.columns:
        df['authors_uniqueids'] = df['authors_uniqueids'].str.lower().str.replace(" ", "_", regex=True)
    if 'texts_text_content' in df.columns:
        df['texts_text_content'].fillna("No Content Available", inplace=True)
    return df

def consolidate_data(input_excel, output_excel):
    logging.info("🔄 Starting data consolidation...")
    videos_df = load_data(input_excel, 'videos')
    authors_df = load_data(input_excel, 'authors')
    texts_df = load_data(input_excel, 'texts')
    # Enforce shared validation/metadata for all video file paths in consolidated sheet
    if not videos_df.empty and 'videos_file_path' in videos_df.columns:
        for idx, row in videos_df.iterrows():
            file_path = row.get('videos_file_path')
            if file_path and os.path.exists(file_path):
                if not validation.validate_file_size(file_path, 500):
                    logging.warning(f"File too large: {file_path}")
                if not validation.validate_file_type(file_path, ["video/mp4", "video/quicktime", "video/x-msvideo"]):
                    logging.warning(f"Invalid file type: {file_path}")
                videos_df.at[idx, 'media_metadata'] = str(metadata.extract_metadata(file_path))

    if videos_df.empty or authors_df.empty or texts_df.empty:
        logging.error("❌ Required sheets not found or empty.")
        return

    authors_df = fix_data(authors_df)
    texts_df = fix_data(texts_df)

    validate_data(videos_df, 'videos')
    validate_data(authors_df, 'authors')
    validate_data(texts_df, 'texts')

    try:
        consolidated_df = videos_df.merge(authors_df, left_on='videos_authorid', right_on='authors_id', how='left')
        consolidated_df = consolidated_df.merge(texts_df, left_on='videos_id', right_on='texts_text_id', how='left')
    except KeyError as e:
        logging.error(f"❌ Merge failed due to missing column: {e}")
        return

    final_columns = [
        'videos_id', 'videos_authorid', 'videos_audioid',
        'authors_id', 'authors_nicknames', 'authors_uniqueids',
        'texts_text_content'
    ]
    final_columns = [col for col in final_columns if col in consolidated_df.columns]
    consolidated_df = consolidated_df[final_columns]

    # Add prefix only to the 7 output columns
    consolidated_df.columns = ['c_' + col for col in consolidated_df.columns]

    try:
        with pd.ExcelWriter(output_excel, mode='a', if_sheet_exists='replace') as writer:
            consolidated_df.to_excel(writer, sheet_name='consolidated', index=False)
        logging.info("✅ Appended 'consolidated' sheet successfully.")
    except Exception as e:
        logging.error(f"❌ Failed to save Consolidated sheet: {e}")

def run():
    session = load_session()
    # Use prepare_pipeline_paths to set up output paths
    prepare_pipeline_paths(session)
    xlsx_file = session.get("xlsx_file")
    # if not xlsx_file:
    #     base_output = get_or_prompt("output_directory", "Enter base output directory", "assets")
    #     xlsx_file = os.path.join(base_output, "xlsx_files", get_or_prompt("output_file", "Enter Excel filename", "data.xlsx"))

    consolidate_data(xlsx_file, xlsx_file)

if __name__ == "__main__":
    run()