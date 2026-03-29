# Agent 3 DevOps Setup

This repository includes a lightweight DevOps bootstrap for **Agent 3**.

## Included

- `scripts/setup_devops.sh` — initializes local folders and creates `.env` from `.env.example`.
- `scripts/run_agent3.sh` — loads `.env` and starts Agent 3 (placeholder startup command included).
- `.env.example` — baseline environment configuration template.

## Quick start

1. Make scripts executable:

   ```bash
   chmod +x scripts/*.sh
   ```

2. Run setup:

   ```bash
   ./scripts/setup_devops.sh
   ```

3. Update values in `.env`.

4. Run Agent 3:

   ```bash
   ./scripts/run_agent3.sh
   ```

## Notes

- The run script currently contains a placeholder command; replace it with your process manager, Docker, or service command.
- Keep secrets out of version control by only committing `.env.example`, not `.env`.
## AI Memory Backend (Agent 1)

REST API endpoints:

- `POST /log`
  - Body: `{ "content": "...", "metadata": "optional" }`
  - Stores a memory log in SQLite.
- `GET /search?q=<term>&limit=<1-100>`
  - Searches `content` using SQL `LIKE` and returns matching logs.

### Local run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Database file defaults to `memory.db` and schema is in `schema.sql`.
# AI Memory (Full-Stack Monorepo)

A clean, scalable starter project for chat logging and search.

## Stack
- **Backend:** Node.js + Express + SQLite (`better-sqlite3`)
- **Frontend:** Next.js (App Router)

## Folder Structure

```txt
apps/
  backend/
    src/
      config/      # env + runtime config
      db/          # sqlite setup + migrations bootstrap
      routes/      # API routes
      services/    # business/data logic
      app.js       # express app wiring
      server.js    # process entrypoint
  frontend/
    app/
      components/  # UI components
      layout.js
      page.js
    lib/           # API client helpers
```

## Quick Start

```bash
npm install
npm run dev
```

- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`

## API

### `POST /api/chats`
Body:
```json
{
  "username": "alice",
  "message": "hello world"
}
```

### `GET /api/chats?q=hello&limit=20`
Searches username/message using SQL `LIKE`.

## Environment Variables

Backend (`apps/backend`):
- `PORT` (default: `4000`)
- `DATABASE_FILE` (default: `./chat-log.sqlite`)

Frontend (`apps/frontend`):
- `NEXT_PUBLIC_API_URL` (default: `http://localhost:4000`)
