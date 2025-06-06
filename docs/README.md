# 📦 SchedulerX

**SchedulerX** is a modular, full-stack automation engine for ingesting, transforming, and scheduling social media content (TikTok, Pinterest, and more). It features a robust Python pipeline, a FastAPI backend, and a modern Next.js frontend.

---

## 📚 Documentation Map
- [Project Roadmap](./ROADMAP.md)
- [Backend API Docs](../backend/api/README.md)
- [Pipeline v2 Docs](../backend/pipeline_v2/docs/README.md)
- [Frontend UI Docs](../frontend/README.md)
- [System Commands](./system_cmds.md)
- [Changelog](./CHANGELOG.md)

---

## 🚀 Quick Start

### Backend (API & Pipeline)
```bash
./devserver.sh
# or
uvicorn backend.api.main:app --reload
```

### Frontend (UI)
```bash
./frontend_dev.sh
# or
cd frontend && npm run dev
```

---

## 🗺️ System Overview

SchedulerX consists of:
- **Backend API**: FastAPI, SQLAlchemy, APScheduler, Supabase JWT Auth
- **Pipeline v2**: Modular Python pipeline for ingest, transform, and DB import
- **Frontend**: Next.js, Tailwind, ShadCN UI, Supabase Auth
- **Database**: PostgreSQL, Prisma ORM
- **Cloud Storage**: Cloudflare R2

---

## 🛡️ Authentication

- All authentication is handled by Supabase Auth (email/password, OAuth, etc.) via the frontend.
- The backend validates Supabase JWTs for all protected endpoints.
- There are no custom backend login/register endpoints.

---

## 🛣️ See Also
- [Backend API Docs](../backend/api/README.md)
- [Pipeline v2 Docs](../backend/pipeline_v2/docs/README.md)
- [Frontend UI Docs](../frontend/README.md)

---

For more, see the [Project Roadmap](./ROADMAP.md) and [System Commands](./system_cmds.md).