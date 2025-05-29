# System Commands: SchedulerX

## Backend (API & Pipeline)

- `./devserver.sh`
  - Starts the FastAPI backend with hot reload (default: http://127.0.0.1:8000)
- `uvicorn backend.api.main:app --reload`
  - Direct command to run the backend API (same as above)
- `PYTHONPATH=. python3 backend/pipeline_v2/runners/run_all.py`
  - Runs the full pipeline_v2 system

## Frontend (Next.js UI)

- `./frontend_dev.sh`
  - Starts the Next.js frontend dev server (default: http://localhost:3000)
- `cd frontend && npm run dev`
  - Direct command to run the frontend (same as above)

## Accessing the System

- **Frontend UI:**
  - Open [http://localhost:3000](http://localhost:3000) in your browser after running the frontend dev server.
- **Backend API:**
  - Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for the FastAPI interactive docs (Swagger UI).

## Other Useful Commands

- `python3 -m backend.api.tests.test_run` — Run backend API tests
- `PYTHONPATH=. python3 backend/api/routes/run_scheduler.py` — Run the scheduler

---

For more, see the README or ROADMAP files.