import os
import pandas as pd
import logging
from utils import prompt_for_directory, save_session, smart_prompt, load_session,get_or_prompt

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

def list_xlsx_files(base_path):
    try:
        return [f for f in os.listdir(base_path) if f.endswith('.xlsx')]
    except FileNotFoundError:
        return []

def prompt_for_xlsx_file(prompt, default_path, base_path="."):
    print(f"\n{prompt}")
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

if __name__ == "__main__":
    session = load_session()

    xlsx_file = session.get("xlsx_file")
    if not xlsx_file:
        base_output = get_or_prompt("output_directory", "Enter base output directory", "assets")
        xlsx_file = os.path.join(base_output, "xlsx_files", get_or_prompt("output_file", "Enter Excel filename", "data.xlsx"))

    consolidate_data(xlsx_file, xlsx_file)
