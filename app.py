import os
import sqlite3
from datetime import datetime, timezone
from flask import Flask, jsonify, request

DB_PATH = os.environ.get("AI_MEMORY_DB", "memory.db")

app = Flask(__name__)


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    with get_db_connection() as conn:
        conn.executescript(schema_sql)
        conn.commit()


@app.post("/log")
def create_log():
    payload = request.get_json(silent=True) or {}
    content = payload.get("content", "")
    metadata = payload.get("metadata")

    if not isinstance(content, str) or not content.strip():
        return jsonify({"error": "'content' must be a non-empty string"}), 400

    if metadata is not None and not isinstance(metadata, str):
        return jsonify({"error": "'metadata' must be a string when provided"}), 400

    created_at = datetime.now(timezone.utc).isoformat()

    with get_db_connection() as conn:
        cursor = conn.execute(
            "INSERT INTO logs (content, metadata, created_at) VALUES (?, ?, ?)",
            (content.strip(), metadata, created_at),
        )
        conn.commit()

    return (
        jsonify(
            {
                "id": cursor.lastrowid,
                "content": content.strip(),
                "metadata": metadata,
                "created_at": created_at,
            }
        ),
        201,
    )


@app.get("/search")
def search_logs():
    query = request.args.get("q", "").strip()
    limit = request.args.get("limit", default=20, type=int)

    if not query:
        return jsonify({"error": "'q' query parameter is required"}), 400

    if limit < 1 or limit > 100:
        return jsonify({"error": "'limit' must be between 1 and 100"}), 400

    wildcard = f"%{query}%"

    with get_db_connection() as conn:
        rows = conn.execute(
            """
            SELECT id, content, metadata, created_at
            FROM logs
            WHERE content LIKE ?
            ORDER BY id DESC
            LIMIT ?
            """,
            (wildcard, limit),
        ).fetchall()

    return jsonify(
        {
            "query": query,
            "count": len(rows),
            "results": [dict(row) for row in rows],
        }
    )


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=8000, debug=True)
