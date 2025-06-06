# SchedulerX Project Plan (Phase 2)

This document outlines the actionable, step-by-step plan for building SchedulerX as a modular, API-driven automation system.

## 1. Project Setup & Directory Structure
- Use `backend/` for API and pipeline
- Use `frontend/` for Next.js UI
- Use `docs/` for all documentation

## 2. API Bootstrapping
- Launch FastAPI server with modular routers
- Configure CORS, middleware, and Supabase JWT Auth (no custom login/register endpoints)

## 3. Database Integration
- Use SQLAlchemy/Prisma for DB access
- Share DB schema between pipeline and API

## 4. Media Upload Service
- API for uploading media metadata and files
- Integrate with Cloudflare R2

## 5. Pipeline Runner as API
- Expose pipeline stages as API endpoints
- Use registry pattern for modular execution

## 6. Feature Execution API
- Run plug-and-play features (auto-tagging, analytics)

## 7. Frontend Integration
- Next.js UI for dashboard, media, scheduler, tasks, settings
- Connect to backend API with Supabase Auth (JWT)

---

For the latest status, see [ROADMAP.md](./ROADMAP.md) and [CHANGELOG.md](./CHANGELOG.md).