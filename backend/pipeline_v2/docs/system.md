# SchedulerX Pipeline v2 System Documentation

## Quick Start
```bash
PYTHONPATH=backend/pipeline_v2:. python3 backend/pipeline_v2/runners/run_all.py

PYTHONPATH=backend/pipeline_v2:. python3 backend/pipeline_v2/stages/decode.py

PYTHONPATH=. pytest backend/pipeline_v2/tests/

```

## System Architecture

### Database Profiles
The system supports multiple database profiles with automatic detection and configuration:

1. Local PostgreSQL Profiles
   - Format: `LOCAL_N_DB_*` (where N is the profile number)
   - Example: `LOCAL_1_DB_USER`, `LOCAL_2_DB_USER`, etc.
   - Required fields: USER, PASSWORD, HOST, PORT, NAME, SCHEMA

2. Supabase Session Profiles
   - Format: `SUPABASE_N_SESSION_*`
   - Example: `SUPABASE_1_SESSION_USER`, `SUPABASE_2_SESSION_USER`, etc.
   - Required fields: USER, PASSWORD, HOST, PORT, PROJECT_REF

3. Supabase Transaction Profiles
   - Format: `SUPABASE_N_TRANS_*`
   - Example: `SUPABASE_1_TRANS_USER`, `SUPABASE_2_TRANS_USER`, etc.
   - Required fields: USER, PASSWORD, HOST, PORT, PROJECT_REF

New profiles are automatically detected from the `.env` file and added to the available options. See `docs/DATABASE_PROFILES.md` for detailed configuration instructions.

### Run Modes

1. Auto Mode
   - Uses default paths or those specified in `.env`/`sessions.json`
   - Prompts for source path only at stage 0
   - Runs remaining stages automatically
   - Ideal for batch processing and automated workflows

2. Step Mode
   - Prompts for user input at each stage
   - Allows custom path selection for each stage
   - Provides more control over the pipeline execution
   - Useful for debugging and manual verification

### Source Profiles
Available source paths are configured in `.env`:
- `SRC_PATH_1`: Primary data source
- `SRC_PATH_2`: Secondary data source
- Additional paths can be added following the same pattern

## Pipeline Execution Flow

1. Initial Configuration
   - System loads environment variables from `.env`
   - Automatically detects and configures available database profiles
   - Validates required configuration

2. Profile Selection
   - User selects database profile type:
     1. Local PostgreSQL
     2. Supabase (default)
        - Session Pooler (default)
        - Transaction Pooler
     3. Other (future implementation)

3. Run Mode Selection
   - Auto Mode:
     - Prompts for source path at stage 0
     - Uses default paths for remaining stages
   - Step Mode:
     - Prompts for source path at stage 0
     - Allows custom path selection for each stage

4. Pipeline Execution
   - Stages run sequentially
   - Each stage uses selected database profile
   - Progress and errors are logged
   - Optional features can be enabled via `ENABLED_FEATURES`

## Configuration Files

1. `.env`
   - Database profiles (automatically detected)
   - Source paths
   - Run mode settings
   - Feature flags

2. `sessions.json`
   - Session-specific configurations
   - Default paths
   - User preferences

## Best Practices

1. Database Profiles
   - Use consistent numbering for related profiles
   - Keep credentials secure
   - Document custom configurations
   - Add new profiles by following the naming convention in `.env`

2. Source Paths
   - Use absolute paths
   - Follow consistent naming conventions
   - Document path purposes

3. Run Modes
   - Use Auto mode for production
   - Use Step mode for development/debugging
   - Test both modes before deployment

## How to run the pipeline System
`python3 -m runners.run_all` - For running runners/run_all.py

`python3 -m tests.test_stage_6` - For running the tests in tests/

## RUN_MODE, SRC_PROFILE, DB_PROFILE
The aim of the current .env structure and format is so that user inputs the values manually and not have to be prompted for them at every stage. This facilitates a smoother run through the stages on either Run Modes; auto that utilizes the default paths or those specified in the .env or the sessions.json file and step that utilizes the default values and the custom paths being prompted to the user.

With this setup, we only have to prompt if:
1. What DB_PROFILE the user wishes to use
    1.1 Local
    1.2 Supabase (default):
          If chosen, what pooler-type do they want to use:
             1.2.1 Supabase session Pooler (default)
             1.2.2 Supabase Transaction Pooler
    1.3 Other (Logic not yet setup...)
2. What RUN_MODE the user wants to use
    2.0 If they choose:
        2.1 Auto, then: 
            2.1.0 The SRC_PROFILE will be prompted for stage 0 (0copy_appdata.py) and the choices outlined ie:
                2.1.1 SRC_PATH_1(/mnt/c/Users/jaxba/AlexNova/data)
                2.1.2 SRC_PATH_1(/mnt/c/Users/jaxba/YuZhou/data)
                2.1.3 SRC_PATH_1(//mnt/c/Users/jaxba/Downloads/tiktok_data)
                2.1.4 SRC_PATH_1(/mnt/d/tiktok/test_batch)
            And once a choice is chosen, the stages will be ran on the other default paths...
        2.2 Step, then: 
            2.2.0 The SRC_PROFILE will be prompted for stage 0 (0copy_appdata.py) and the choices outlined ie:
                2.2.1 SRC_PATH_1(/mnt/c/Users/jaxba/AlexNova/data)
                2.2.2 SRC_PATH_1(/mnt/c/Users/jaxba/YuZhou/data)
                2.2.3 SRC_PATH_1(//mnt/c/Users/jaxba/Downloads/tiktok_data)
                2.2.4 SRC_PATH_1(/mnt/d/tiktok/test_batch)
            And once a choice is chosen, the paths will be user-prompted per stage

## Shared Validation & Metadata Enforcement

All pipeline stages and API services now use the shared modules in `SchedulerX/shared/media_utils/` for:
- File size/type/integrity validation
- Metadata extraction and validation

This ensures:
- Consistency across all flows (API, pipeline, batch, upload)
- No duplicate or legacy validation logic
- Easy extensibility and maintainability

To add or update validation/metadata logic, update the shared modules only.

## How to Test
- Run integration tests in `pipeline_v2/tests/test_media_validation_integration.py` to verify enforcement.
- All pipeline and API tests will use the shared logic automatically.

---

## See Also
- [Pipeline v2 Docs](README.md)
- [Database Profiles](DATABASE_PROFILES.md)
- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Backend API Docs](../../api/docs/README.md)
- [Root Project Docs](../../../docs/README.md)
- [Frontend Docs](../../../frontend/README.md)