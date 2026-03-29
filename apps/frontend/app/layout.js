import './globals.css';

export const metadata = {
  title: 'AI Memory Chat Log',
  description: 'Chat logging + search demo'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
