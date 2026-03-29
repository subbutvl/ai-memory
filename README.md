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
