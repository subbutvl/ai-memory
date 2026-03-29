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
