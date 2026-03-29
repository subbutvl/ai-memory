import ChatDashboard from './components/chat-dashboard';

export default function HomePage() {
  return (
    <main>
      <h1>AI Memory — Chat Logging + Search</h1>
      <p className="muted">
        Minimal full-stack example with Express, SQLite, and Next.js.
      </p>
      <ChatDashboard />
    </main>
  );
}
