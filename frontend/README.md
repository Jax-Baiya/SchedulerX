# SchedulerX Frontend Documentation

This directory contains documentation for the Next.js-based frontend of SchedulerX.

## Overview
The frontend provides a dashboard UI for managing, scheduling, and monitoring social media content workflows. It interacts with the backend API for all data and automation tasks.

- **Entrypoint:** `src/app/`
- **API Integration:** Connects to FastAPI backend
- **UI Stack:** Next.js, Tailwind CSS, ShadCN

## Getting Started
See the main [README](../docs/README.md) for setup instructions.

## Key Docs
- [Backend API Docs](../backend/api/docs/README.md)
- [Pipeline System Docs](../backend/pipeline_v2/docs/README.md)
- [Root Project Docs](../docs/README.md)

---

## Documentation Map
- [Project Roadmap](../docs/ROADMAP.md)
- [Project Plan](../docs/plan.md)
- [Changelog](../docs/CHANGELOG.md)

---

## See Also
- [Backend API Docs](../backend/api/docs/README.md)
- [Pipeline v2 Docs](../backend/pipeline_v2/docs/README.md)

## Authentication
- All authentication is handled by Supabase Auth (email/password, OAuth, etc.) via the frontend.
- The backend validates Supabase JWTs for all protected endpoints.
- There are no custom backend login/register endpoints.
