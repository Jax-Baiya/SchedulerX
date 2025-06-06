# SchedulerX Interactive Dashboard

---

## Overview

SchedulerX enables full-stack media workflow automation, with a modern dashboard for running pipelines, managing files, scheduling posts, and previewing media—all from your browser.

---

## Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
- [Frontend UI Blueprint](#frontend-ui-blueprint)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Troubleshooting & Error Handling](#troubleshooting--error-handling)
- [See Also](#see-also)

---

## System Architecture

```mermaid
graph TD
    A[Next.js Frontend] -- API Calls --> B[FastAPI Backend]
    B -- DB ORM --> C[(SQLite/Postgres DB)]
    B -- Pipeline Trigger --> D[Pipeline Runner]
    B -- Media Serve --> E[Media Storage (R2/local)]
    A -- Media Preview --> E
    A -- Static/Assets --> F[Assets]
```

- **Frontend**: Next.js (App Router, Tailwind, ShadCN)
- **Backend**: FastAPI (API, pipeline, DB, media)
- **Database**: SQLite or Postgres (via SQLAlchemy/Prisma)
- **Media**: Served via `/media/` endpoint

---

## API Endpoints

See [API Endpoints](#api-endpoints) for details on backend routes for files, scheduling, and pipeline control.

- [`/api/files`](#api-endpoints) — List files in DB
- `/api/files/{id}` — Fetch file metadata
- `/api/schedule` — Schedule a post
- `/api/scheduled` — View all scheduled posts
- `/api/run-pipeline` — Trigger pipeline

---

## Frontend UI Blueprint

See [Frontend UI Blueprint](#frontend-ui-blueprint) for page and component structure.

- **Media Library**: Preview, filter, select files
- **Scheduler**: Assign posts, set times, monitor status
- **Pipeline Runner**: Admin panel for running pipeline
- **Post Detail**: View/preview metadata, reschedule, delete

---

## Backend Setup

- FastAPI app with CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

- Register API routers for files, scheduling, and pipeline control.
- Serve media via `/media/` endpoint.

---

## Frontend Setup

- Next.js App Router (see [frontend/app/media/page.tsx](../frontend/app/media/page.tsx))
- API proxy for local dev (see [frontend/next.config.js](../frontend/next.config.js)):

```js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*"
      }
    ];
  }
};
```

---

## Troubleshooting & Error Handling

- **CORS errors**: Ensure backend CORS settings allow frontend origin.
- **Media not previewing**: Confirm `/media/` endpoint is serving files and paths are correct.
- **API 404/500**: Check backend logs and endpoint registration.
- **Pipeline not triggering**: Verify `/api/run-pipeline` is implemented and background tasks are enabled.
- **DB not updating**: Confirm DB migrations and model sync are up to date.

---

## See Also
- [Database Schema & Models](../backend/api/docs/database.md)
- [Pipeline Stages & File Ops](../backend/pipeline_v2/utils/file_ops.py)
- [Tasks & Scheduling](../backend/api/docs/Tasks.md)
- [System Commands](system_cmds.md)
- [SchedulerX README](README.md)

---

## What This Unlocks Now

- ✅ View your database files in a clean frontend
- ✅ Preview images/files (if accessible via /media)
- ✅ Click to trigger scheduling (to be implemented next)
- ✅ Framework is ready to expand into scheduling & pipeline control

---

For further details, see the [SchedulerX README](README.md) or reach out to the maintainers.

---

Absolutely — here’s a **comprehensive and detailed task list** to build a fully interactive SchedulerX frontend that can:

* View DB entries
* Preview files
* Schedule posts
* Run pipeline tasks
* Track post status and logs

---

# ✅ SchedulerX Full Frontend Integration — Task List

---

## 🧱 I. API Layer (Backend) — Extend FastAPI

| Task                                        | Details                                                                    | Endpoint                          |
| ------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- |
| ✅ \[ ] Create API to list uploaded files    | Return paginated, filtered list with metadata (size, type, platform, etc.) | `GET /api/files`                  |
| ✅ \[ ] Create API to preview media          | Serve file URLs or stream files from R2/local                              | `GET /api/media/{file_id}`        |
| ✅ \[ ] Create API to return file metadata   | Optional: include status, error logs, post status, etc.                    | `GET /api/files/{file_id}`        |
| ✅ \[ ] Create API to list scheduled posts   | Return status (`PENDING`, `POSTED`, `FAILED`) with timestamps and content  | `GET /api/scheduled-posts`        |
| ✅ \[ ] Create API to schedule a post        | Accept file ID, platform, content, and datetime                            | `POST /api/schedule`              |
| ✅ \[ ] Create API to cancel/reschedule post | Update `scheduled_time`, content, or platform                              | `PATCH /api/scheduled-posts/{id}` |
| ✅ \[ ] Create API to trigger pipeline       | Manually trigger `PipelineRunner()` or a stage                             | `POST /api/run-pipeline`          |
| ✅ \[ ] Create API to run post scheduler     | Manually trigger `scheduler_runner.py`                                     | `POST /api/run-scheduler`         |
| ✅ \[ ] Add JWT auth or token middleware     | Protect sensitive routes like pipeline and scheduling                      | `Depends(get_current_user)`       |

---

## 🧠 II. Frontend Features (Next.js + Tailwind + ShadCN UI)

| Task                            | Details                                                              |
| ------------------------------- | -------------------------------------------------------------------- |
| ✅ \[ ] Create Dashboard Home    | Overview: file count, posts scheduled, logs, buttons to run pipeline |
| ✅ \[ ] Create File Library Page | Paginated table or grid showing media files                          |
| ✅ \[ ] Add Filter + Search      | Filter files by type, platform, date, metadata keywords              |
| ✅ \[ ] File Preview Modal       | Click on file → modal opens with preview, metadata, status           |
| ✅ \[ ] Schedule Post UI         | Select file → set platform, content, date/time → submit              |
| ✅ \[ ] Scheduled Posts Table    | View all scheduled posts and their status                            |
| ✅ \[ ] Post Status Badges       | Color-coded status: PENDING (yellow), POSTED (green), FAILED (red)   |
| ✅ \[ ] Run Pipeline Button      | Top-right button to trigger full pipeline manually                   |
| ✅ \[ ] Run Scheduler Button     | Button to run `scheduler_runner.py` manually                         |
| ✅ \[ ] Show Logs Panel          | Live view or static pull of latest scheduler logs/errors             |
| ✅ \[ ] Notifications or Toasts  | Confirm post scheduling, show errors, etc.                           |

---

## ⚙️ III. Background Features (Integration + Infra)

| Task                                             | Details                                              |
| ------------------------------------------------ | ---------------------------------------------------- |
| ✅ \[ ] Integrate React Query                     | For cache + polling of scheduled post status         |
| ✅ \[ ] Add loading states                        | During fetch, submission, etc.                       |
| ✅ \[ ] Connect to Supabase (optional)            | If your DB is hosted there, setup auth + RLS         |
| ✅ \[ ] Add cron or systemd for scheduler\_runner | Ensure posts run even without manual trigger         |
| ✅ \[ ] CI/CD pipeline for frontend build         | Deploy frontend to Vercel or Netlify, connect to API |
| ✅ \[ ] Add ENV support for API base URL          | `NEXT_PUBLIC_API_URL` for dev/staging/prod switching |

---

## 📁 IV. File/Folder Structure Suggestions (Frontend)

```
frontend/
├── app/
│   ├── dashboard/
│   ├── files/
│   ├── schedule/
│   └── logs/
├── components/
│   ├── FileTable.tsx
│   ├── FilePreviewModal.tsx
│   ├── ScheduleForm.tsx
│   ├── PostStatusBadge.tsx
│   └── RunPipelineButton.tsx
├── lib/
│   ├── api.ts
│   └── queries.ts
├── styles/
│   └── globals.css
├── tailwind.config.ts
└── next.config.js
```

---

## 🚦 Prioritized Dev Flow

| Phase       | Tasks                                               |
| ----------- | --------------------------------------------------- |
| 🚀 Phase 1  | API endpoints for file list, scheduling, and runner |
| 🧪 Phase 2  | Frontend UI for file selection and preview          |
| 🗓️ Phase 3 | Schedule post interface and status view             |
| 🧠 Phase 4  | Add pipeline/scheduler controls                     |
| 🔒 Phase 5  | Auth + security + deployment polish                 |

---

