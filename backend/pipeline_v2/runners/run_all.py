"""
🏃‍♂️ SchedulerX: Pipeline Runner
Main entry point for running the pipeline stages

This script initializes the environment, executes all core stages, and runs any enabled plugin features.

Pipeline Stages:
0. Copy App Data - Copies .appdata folder to assets/
1. Generate Markdown - Creates summary.md from .appdata contents
2. Decode Data - Processes the generated summary.md
3. Process Excel Files - Converts data to Excel format
4. Append Consolidated Sheet - Merges sheets into unified view
5. Import to Database - Loads data into PostgreSQL
6. Sync with Prisma - Updates Prisma schema and client
"""
from utils.bootstrap import bootstrap_project
bootstrap_project()

# Load environment variables before any other imports
from pathlib import Path
from dotenv import load_dotenv
import os
from typing import Optional, Dict
from utils.run_mode import initialize_pipeline_mode, get_stage_path, get_run_mode_manager
from utils.session_tools import load_session, save_session
import argparse

# Load .env from project root
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(env_path)

# Now import the rest
from config import ENABLED_FEATURES
from registry import run_enabled_features
from utils.env_tools import setup_environment
from stages import (
    stage_0_run,  # copy_appdata
    stage_1_run,  # generate_md
    stage_2_run,  # decode
    stage_3_run,  # xlsx
    stage_4_run,  # append_consolidated
    stage_5_run,  # import_db
    stage_6_run   # prisma_sync
)

def prompt_db_setup():
    """Ask user if they want to reconfigure database settings."""
    print("\n🔄 Database Configuration")
    print("Current DB_PROFILE:", os.getenv("DB_PROFILE", "not set"))
    choice = input("Would you like to reconfigure database settings? (y/N): ").lower()
    return choice.startswith('y')

def run_stage(stage_num: int, stage_func, stage_desc: str, config: Dict) -> None:
    """
    Run a single pipeline stage with proper error handling and session management.
    
    Args:
        stage_num: Stage number (0-6)
        stage_func: Function to execute the stage
        stage_desc: Description of the stage
        config: Current pipeline configuration
    """
    print(f"\n{stage_num}️⃣ {stage_desc}...")
    
    try:
        # Get path for current stage (will use cached path in auto mode)
        stage_path = get_stage_path(stage_num)
        
        # Update session
        session_data = load_session()
        session_data['current_stage'] = stage_num
        session_data[f'stage_{stage_num}_path'] = stage_path
        save_session(session_data)
        
        # Run the stage
        stage_func()
        
        # In step mode, prompt to continue
        if config['run_mode'] == "step" and stage_num < 6:  # 6 is the last stage
            input(f"\nStage {stage_num} completed. Press Enter to continue to next stage...")
            
    except KeyboardInterrupt:
        print(f"\n⚠️ Stage {stage_num} interrupted by user")
        raise
    except Exception as e:
        print(f"\n❌ Error in stage {stage_num}: {str(e)}")
        if config['run_mode'] == "step":
            choice = input("\nWould you like to retry this stage? (y/N): ").lower()
            if choice.startswith('y'):
                run_stage(stage_num, stage_func, stage_desc, config)
            else:
                raise

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description="SchedulerX Pipeline v2")
    parser.add_argument(
        "--mode",
        choices=["auto", "step"],
        default="step",
        help="Pipeline execution mode"
    )
    parser.add_argument(
        "--db",
        choices=["local", "supabase_session", "supabase_trans"],
        default="local",
        help="Database profile to use"
    )
    return parser.parse_args()

def main():
    print("🚀 SchedulerX Runner Initialized")

    try:
        # Initialize pipeline mode and get configuration
        run_mode_manager = initialize_pipeline_mode()
        config = run_mode_manager.get_current_mode()

        # Offer database configuration
        if prompt_db_setup():
            print("\n🛠️ Running database configuration setup...")
            setup_environment()
            # Reload environment variables after potential changes
            load_dotenv(env_path, override=True)
            session = load_session()  # Reload session with real values
            print("\n✅ Database configuration complete")

        # Define pipeline stages
        stages = [
            (0, stage_0_run, "Copying App Data"),
            (1, stage_1_run, "Generating Markdown"),
            (2, stage_2_run, "Decoding Data"),
            (3, stage_3_run, "Processing Excel Files"),
            (4, stage_4_run, "Appending Consolidated Sheet"),
            (5, stage_5_run, "Importing to Database"),
            (6, stage_6_run, "Syncing with Prisma")
        ]

        print("\n📋 Executing Pipeline Stages:")
        
        # Execute each stage
        for stage_num, stage_func, stage_desc in stages:
            run_stage(stage_num, stage_func, stage_desc, config)

        print("\n🎯 Running Enabled Features:")
        run_enabled_features(ENABLED_FEATURES)
        
        print("\n✅ Pipeline execution completed successfully!")

    except KeyboardInterrupt:
        print("\n\n⚠️ Pipeline execution interrupted by user")
        return 1
    except Exception as e:
        print(f"\n\n❌ Pipeline execution failed: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit_code = main()
    exit(exit_code)