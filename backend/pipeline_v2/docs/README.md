# SchedulerX Pipeline v2 Documentation

This directory contains documentation for the modular pipeline system powering SchedulerX.

## Overview
Pipeline v2 is a modular, database-first system for ingesting, transforming, and scheduling social media content. It supports multiple database profiles, feature plug-ins, and both CLI and API-driven execution.

- **Entrypoint:** `runners/run_all.py`
- **Stages:** Core pipeline scripts in `stages/`
- **Features:** Optional plug-ins in `features/`
- **Utils:** Shared utilities in `utils/`
- **Database:** Profile auto-detection and management

## Quick Start
```bash
PYTHONPATH=backend/pipeline_v2:. python3 backend/pipeline_v2/runners/run_all.py
```

## Key Docs
- [System Architecture](system.md)
- [Database Profiles](DATABASE_PROFILES.md)
- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Backend API Docs](../../api/docs/README.md)
- [Root Project Docs](../../../docs/README.md)
- [Frontend Docs](../../../frontend/README.md)

---

## Documentation Map
- [Project Roadmap](../../../docs/ROADMAP.md)
- [Project Plan](../../../docs/plan.md)
- [Changelog](../../../docs/CHANGELOG.md)

---

## See Also
- [Backend API Docs](../../api/docs/README.md)
- [Frontend Docs](../../../frontend/README.md)
