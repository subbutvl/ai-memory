import { Router } from 'express';
import { z } from 'zod';
import { listChats, logChat } from '../services/chatService.js';

const createChatSchema = z.object({
  username: z.string().min(1).max(30),
  message: z.string().min(1).max(1000)
});

const querySchema = z.object({
  q: z.string().optional().default(''),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50)
});

export const chatRoutes = Router();

chatRoutes.post('/', (req, res) => {
  const parseResult = createChatSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid chat payload' });
  }

  const chat = logChat(parseResult.data);
  return res.status(201).json(chat);
});

chatRoutes.get('/', (req, res) => {
  const parseResult = querySchema.safeParse(req.query);

  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const chats = listChats(parseResult.data);
  return res.json({ items: chats });
});
