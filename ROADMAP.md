# 🛣️ Project Roadmap: Social Media Automation System

## ✅ Completed: Phase 1 — Automated TikTok Data Pipeline

- [x] Modular Python scripts for ingesting and transforming TikTok metadata
- [x] PostgreSQL + Prisma schema creation
- [x] Dynamic session handling + .env generation
- [x] Prisma Studio + log management
- [x] GitHub-ready documentation + flowchart
- [x] Ready for executable packaging (.exe, .sh)

---

## 🔜 Phase 2 — UI + Cloud Uplink Integration

### 🎯 Objective
Build a full-stack dashboard that connects your local PostgreSQL DB to cloud media, enabling automated post scheduling.

---

### 🧩 Key Modules

| Module             | Stack                             | Status |
|--------------------|------------------------------------|--------|
| **Frontend UI**     | Next.js + Tailwind + ShadCN        | ⏳ Planned |
| **Backend API**     | Flask + APScheduler                | ⏳ Planned |
| **Cloud Storage**   | Cloudflare R2 (via boto3 or r2wrapper) | ⏳ Planned |
| **Task Scheduler**  | APScheduler / Supabase CRON        | ⏳ Planned |
| **API Clients**     | Python SDKs (Pinterest, TikTok...) | ⏳ Planned |
| **Media Uploader**  | File upload → R2 + DB metadata link | ⏳ Planned |
| **User Auth**       | Supabase Auth / JWT                | ⏳ Optional |
| **Dashboard UI**    | View, edit, schedule, monitor posts| ⏳ Planned |

---

## 🧭 Long-Term Goals

- 🔁 End-to-end post automation (TikTok, Pinterest, IG)
- ☁️ Auto-sync local media with R2 cloud storage
- 💬 Smart prompts for captions, hashtags, trends
- 🧠 Analytics feedback loop per platform

---

## 🧰 Suggested Milestones

- [ ] `cloudlinker.py` → Upload media to R2 + update DB
- [ ] `scheduler.py` → Pull from DB and auto-post
- [ ] Frontend MVP (Next.js + Supabase UI for DB)
- [ ] Cloudflare R2 API wrapper & auth system
- [ ] `tasks.db` + UI to control automation workflows

---

Built by [Jax-Baiya](https://github.com/Jax-Baiya) · Powered by Open Source 🚀