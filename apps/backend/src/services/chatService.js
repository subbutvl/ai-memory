import { db } from '../db/client.js';

const insertChatStmt = db.prepare(
  'INSERT INTO chats (username, message) VALUES (?, ?)'
);

const searchChatsStmt = db.prepare(`
  SELECT id, username, message, created_at as createdAt
  FROM chats
  WHERE username LIKE @search OR message LIKE @search
  ORDER BY datetime(created_at) DESC
  LIMIT @limit
`);

const recentChatsStmt = db.prepare(`
  SELECT id, username, message, created_at as createdAt
  FROM chats
  ORDER BY datetime(created_at) DESC
  LIMIT @limit
`);

export function logChat({ username, message }) {
  const result = insertChatStmt.run(username.trim(), message.trim());

  return {
    id: result.lastInsertRowid,
    username,
    message
  };
}

export function listChats({ query = '', limit = 50 }) {
  const normalizedLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);

  if (!query.trim()) {
    return recentChatsStmt.all({ limit: normalizedLimit });
  }

  const search = `%${query.trim()}%`;
  return searchChatsStmt.all({ search, limit: normalizedLimit });
}
