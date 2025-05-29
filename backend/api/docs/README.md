# SchedulerX Backend API Documentation

This directory contains documentation for the FastAPI-based backend API of SchedulerX.

## Overview
The backend API provides endpoints for running the pipeline, uploading media, accessing analytics, and managing database records. It acts as the bridge between the frontend dashboard, the pipeline_v2 system, and cloud storage (R2).

- **Entrypoint:** `main.py` (FastAPI app)
- **Routes:** Modular endpoints in `routes/`
- **Services:** Business logic in `services/`
- **Models:** Pydantic schemas in `models/`
- **Database:** SQLAlchemy/Prisma integration

## Key Docs
- [Database Integration](database.md)
- [Implementation Tasks](Tasks.md)
- [Pipeline System Docs](../../pipeline_v2/docs/README.md)
- [Root Project Docs](../../../docs/README.md)
- [Frontend Docs](../../../frontend/README.md)

## System Commands
See [System Commands](../../../docs/system_cmds.md) for how to run the backend API and related services.

---

## Documentation Map
- [Project Roadmap](../../../docs/ROADMAP.md)
- [Project Plan](../../../docs/plan.md)
- [Changelog](../../../docs/CHANGELOG.md)

---

## See Also
- [Pipeline v2 Docs](../../pipeline_v2/docs/README.md)
- [Frontend Docs](../../../frontend/README.md)
