# 📦 SchedulerX

**SchedulerX** is a modular automation engine for ingesting, transforming, and scheduling social media content — starting with TikTok. This CLI-based system converts local `.appdata` files into a PostgreSQL-backed pipeline with full Prisma ORM integration.

---

## 🔁 Pipeline Flowchart

```mermaid
graph TD
    A[Start: run_all.py] --> B[0copy_appdata.py<br>📁 Copy .appdata folder]
    B --> C[1generate_md.py<br>📝 Generate summary.md]
    C --> D[2decode.py<br>🔓 Decode Base64 to JSON]
    D --> E[3xlsx.py<br>📊 Create Excel from JSON]
    E --> F[4append_consolidated.py<br>🧩 Consolidate data]
    F --> G[5import_db.py<br>🗄 Import to PostgreSQL]
    G --> H[6prisma_sync.py<br>🚀 Sync + Launch Prisma Studio]
    H --> Z[End]
```

---

## 🧰 Tech Stack

| Component      | Stack                               |
|----------------|--------------------------------------|
| UI (planned)   | Next.js + Tailwind + ShadCN          |
| Backend API    | Flask + APScheduler                  |
| Database       | PostgreSQL + Prisma                  |
| Storage        | Cloudflare R2                        |
| Scheduler      | APScheduler / Supabase CRON          |
| API Clients    | Python SDKs (Pinterest, TikTok, IG)  |

---

## 🚀 Getting Started

### Step 1: Clone + Install
```bash
git clone https://github.com/Jax-Baiya/SchedulerX.git
cd SchedulerX
pip install -r requirements.txt
```

### Step 2: Run Pipeline
```bash
python3 run_all.py
```

You'll be prompted to provide paths, filenames, and DB info (or prefill them in `session.json`).

---

## 🖥️ Executable CLI Versions (SchedulerX)

### 🐧 Linux / macOS

You can run the pipeline with a simple shell wrapper:

```bash
bash schedulerx.sh
```

To install it globally as `schedulerx`:

```bash
mv schedulerx.sh ~/.local/bin/schedulerx
chmod +x ~/.local/bin/schedulerx
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Then run from anywhere:
```bash
schedulerx
```

---

### 🪟 Windows

1. Install [PyInstaller](https://pyinstaller.org/):
```bash
pip install pyinstaller
```

2. Build the executable:
```bash
pyinstaller schedulerx.spec
```

3. Run the `.exe`:
```bash
dist/schedulerx/schedulerx.exe
```

---

## 🧰 Tech Stack

| Component      | Stack                               |
|----------------|--------------------------------------|
| UI (planned)   | Next.js + Tailwind + ShadCN          |
| Backend API    | Flask + APScheduler                  |
| Database       | PostgreSQL + Prisma                  |
| Storage        | Cloudflare R2                        |
| Scheduler      | APScheduler / Supabase CRON          |
| API Clients    | Python SDKs (Pinterest, TikTok, IG)  |

---

## 🗃️ Database Setup

SchedulerX supports both local and cloud-hosted PostgreSQL databases. You'll choose your preferred setup when you run the pipeline.

### 🔧 Option 1: Local PostgreSQL (Recommended for Beginners)

1. Install PostgreSQL locally (e.g., via Homebrew, apt, or installer)
2. Create a database and user:
```bash
createdb schedulerx_db
createuser schedulerx_user --pwprompt
```
3. Grant privileges:
```bash
psql -c "GRANT ALL PRIVILEGES ON DATABASE schedulerx_db TO schedulerx_user;"
```
4. Set your `.env`:
```env
DB_USER=schedulerx_user
DB_PASSWORD=your_password
DB_NAME=schedulerx_db
DB_SCHEMA=public
DATABASE_URL=postgresql://schedulerx_user:your_password@localhost:5432/schedulerx_db?schema=public
```

---

### ☁️ Option 2: Supabase (Free Cloud DB)

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Create a new project (region: EU—Ireland if you're in Africa)
3. Under **Settings > Database**, copy the connection URI
4. Break it into `.env` variables:

```env
DB_USER=postgres
DB_PASSWORD=your_supabase_password
DB_NAME=postgres
DB_SCHEMA=public
DATABASE_URL=postgresql://postgres:your_supabase_password@your-db-host.supabase.co:5432/postgres?schema=public
```

5. Run the pipeline:
```bash
python3 run_all.py
```

You'll get a prompt to select local or cloud DB — no extra changes needed.

---

## Project Structure

```plaintext
✅ Suggested Project Structure for GitHub (auto-generated from tree):

SchedulerX/
├── backend/
│   ├── pipeline/               # Main pipeline scripts (0–6 + cleanup)
│   ├── utils/                  # Shared utility functions
│   ├── assets/                 # Source + output files (e.g. .appdata, .xlsx)
│   ├── logs/                   # Runtime logs + session cache
│   ├── prisma/                 # Prisma schema + CLI support
│   ├── .env                    # Dynamic environment setup
│   └── requirements.txt        # Python dependencies
├── dist/                       # Built CLI (schedulerx.exe, .sh)
├── docs/                       # README, CHANGELOG, ROADMAP, LICENSE
├── frontend/                   # Placeholder for Next.js UI (Phase 2)
├── Makefile                    # Optional: for automation tasks
└── s

```

---

## 🧭 Roadmap

See [ROADMAP.md](./ROADMAP.md) for upcoming features like:
- Dashboard UI
- Cloudflare R2 media upload
- Post scheduling to TikTok, Pinterest, and IG

---
· MIT License


Built by [Jax-Baiya](https://github.com/Jax-Baiya) 