'use client';

import { useEffect, useState } from 'react';
import { createChat, fetchChats } from '../../lib/api';

export default function ChatDashboard() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadChats(searchValue = query) {
    try {
      setLoading(true);
      setError('');
      const data = await fetchChats(searchValue);
      setChats(data.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await createChat({ username, message });
      setMessage('');
      await loadChats();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadChats('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="card">
        <h2>New Chat Log</h2>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <textarea
            rows={4}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Save Message</button>
        </form>
      </section>

      <section className="card">
        <h2>Search</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loadChats(query);
          }}
        >
          <input
            placeholder="Search by username or message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="card">
        <h2>Results</h2>
        {loading && <p className="muted">Loading chats...</p>}
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {!loading && chats.length === 0 && <p className="muted">No chats found.</p>}
        {chats.map((chat) => (
          <article key={chat.id} className="chat-item">
            <strong>{chat.username}</strong>
            <p>{chat.message}</p>
            <p className="muted">{new Date(chat.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </section>
    </>
  );
}
