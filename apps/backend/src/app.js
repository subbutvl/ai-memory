import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { chatRoutes } from './routes/chatRoutes.js';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/chats', chatRoutes);
