# 📦 CHANGELOG

## [v1.0.0] - 2025-03-30

### 🎉 Initial Release: SchedulerX

SchedulerX is a modular automation engine for ingesting, transforming, and scheduling social content. This v1.0.0 release introduces a complete, database-first pipeline designed for TikTok data, powered by Python and PostgreSQL.

---

### ✅ Features

- CLI-based orchestrator (`run_all.py`)
- 6 modular Python scripts for transforming TikTok metadata
- Interactive or pre-filled session input (`session.json`)
- Dynamic `.env` generation for Prisma + DB
- Prisma schema generation and Studio launch
- PostgreSQL data model (authors, videos, likes, etc.)
- Automatic log collection and cleanup system
- Mermaid flowchart and full documentation
- GitHub-ready structure with template capabilities

---

### 🛠 Tech Stack

- Python 3.10+
- PostgreSQL + Prisma ORM
- Excel (via openpyxl)
- APScheduler-ready structure
- CLI with future GUI support planned
- Works on Linux, macOS, and Windows

---

Built with ❤️ by [Jax-Baiya](https://github.com/Jax-Baiya)