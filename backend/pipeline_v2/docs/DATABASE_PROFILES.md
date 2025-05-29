# Database Profile System

## Overview
The database profile system provides a flexible way to manage multiple database connections with automatic profile detection and configuration.

## Profile Types

### 1. Local PostgreSQL
Format: `LOCAL_N_DB_*`
```env
LOCAL_N_DB_USER=<username>
LOCAL_N_DB_PASSWORD=<password>
LOCAL_N_DB_HOST=<host>
LOCAL_N_DB_PORT=<port>
LOCAL_N_DB_NAME=<database>
LOCAL_N_DB_SCHEMA=<schema>
```

### 2. Supabase Session
Format: `SUPABASE_N_SESSION_*`
```env
SUPABASE_N_SESSION_USER=<username>
SUPABASE_N_SESSION_PASSWORD=<password>
SUPABASE_N_SESSION_HOST=<host>
SUPABASE_N_SESSION_PORT=<port>
SUPABASE_N_PROJECT_REF=<project_ref>
```

### 3. Supabase Transaction
Format: `SUPABASE_N_TRANS_*`
```env
SUPABASE_N_TRANS_USER=<username>
SUPABASE_N_TRANS_PASSWORD=<password>
SUPABASE_N_TRANS_HOST=<host>
SUPABASE_N_TRANS_PORT=<port>
SUPABASE_N_PROJECT_REF=<project_ref>
```

## Auto-Detection
The system automatically detects new profiles by scanning the `.env` file for matching patterns:
- `LOCAL_N_DB_*` for local profiles
- `SUPABASE_N_SESSION_*` for Supabase session profiles
- `SUPABASE_N_TRANS_*` for Supabase transaction profiles

## Adding New Profiles
1. Add the required environment variables to `.env`
2. Follow the naming convention for your profile type
3. The system will automatically detect and add the new profile

## Profile Selection
During pipeline execution:
1. The system shows all available profiles
2. User selects the desired profile
3. Connection string is automatically generated
4. Database operations use the selected profile

## Best Practices
1. Use consistent numbering for related profiles
2. Keep profile credentials secure
3. Use descriptive names for different environments
4. Document any custom profile configurations

---

## See Also
- [Pipeline v2 Docs](README.md)
- [System Architecture](system.md)
- [Backend API Docs](../../api/docs/README.md)
- [Root Project Docs](../../../docs/README.md)
