# TikTok Data Automation Pipeline

This project automates the extraction, transformation, and import of TikTok metadata into a PostgreSQL database for analysis and visualization using Prisma Studio.

---

![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Last Updated](https://img.shields.io/badge/updated-March_2025-brightgreen)

---

## 📦 Project Setup

### ✅ Prerequisites

- Python 3.10+
- PostgreSQL (recommended: v14+)
- Node.js (for Prisma)
- pip (Python package manager)

---

### 🛠 Installation Steps

#### 1. Clone the Project

```bash
git clone https://github.com/Jax-Baiya/tiktok-data-automata.git
cd tiktok-data-automata
```

#### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

#### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Install Prisma CLI

```bash
npm install -g prisma
```

---

## 🗄️ PostgreSQL Setup

### 1. Access psql

```bash
psql -U postgres
```

Or (on Unix-like systems):

```bash
sudo -u postgres psql
```

### 2. Create a Database

```sql
CREATE DATABASE tiktok_db;
```

### 3. Create a User (Optional)

```sql
CREATE USER tiktok_user WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE tiktok_db TO tiktok_user;
```

### 4. Create a Schema (Optional)

```sql
CREATE SCHEMA tiktok_schema;
```

---

## ⚙️ Prisma Setup

#### 1. Initialize Prisma

```bash
prisma init
```

#### 2. Configure `.env`

```env
DATABASE_URL="postgresql://tiktok_user:securepassword@localhost:5432/tiktok_db?schema=tiktok_schema"
```

#### 3. Pull Database Structure

```bash
prisma db pull
```

#### 4. Launch Prisma Studio

```bash
prisma studio
```

---

## 🚀 Run Full Pipeline

```bash
python3 run_all.py
```

You will be prompted to enter:
- Source and output folders
- Excel filename
- PostgreSQL connection settings

These will be saved to `session.json` for future reuse.

---

## 🧭 psql Cheat Sheet

```bash
psql -U tiktok_user -d tiktok_db
```

Commands:
- `\dt` – List all tables
- `SELECT * FROM videos LIMIT 5;` – Preview data
- `\q` – Exit

---

## 📥 Using myfaveTT to Download TikTok Data

1. **Install the myfaveTT Extension**
   - [Chrome Web Store – myfaveTT](https://chrome.google.com/webstore/detail/myfavett-download-all-tik/gmajiifkcmjkehmngbopoobeplhoegad)

2. **Download Your Data**
   - Log into [TikTok](https://www.tiktok.com/)
   - Click on the myfaveTT icon in Chrome
   - Choose from:
     - All Likes
     - All Favorites
     - Following
   - Select a destination folder

3. **Move to `.appdata/`**
   - Place the downloaded `.appdata` folder inside the `assets/` directory before running the pipeline.

---

## 📁 Project Structure

```
Automata/
├── assets/
│   ├── .appdata/
│   ├── summary.md
│   ├── decoded_sections/
│   └── xlsx_files/
├── logs/
│   ├── master_log.log
│   ├── import_db.log
│   ├── decode.log
│   ├── dashboard_log.txt
│   └── session.json
├── run_all.py
├── cleanup.py
├── requirements.txt
├── .env
├── .gitignore
└── README.md
```

---

## 🧹 Cleanup

```bash
python3 cleanup.py
```

Moves all logs + `session.json` into `/logs/`.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built with 🐍 by [Jax-Baiya](https://github.com/Jax-Baiya)