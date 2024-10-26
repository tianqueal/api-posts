/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import meRouter from './routes/me.js';
import postRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import { sequelize } from './db/db.config.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();

app.use(cors());

const IP = process.env.IP || '::';
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hey world!');
});

app.use('/auth', authRouter);

// END POINT: me
app.use('/me', authenticateToken, meRouter);

// END POINT: posts
app.use('/posts', authenticateToken, postRouter);

// END POINT: health
app.get('/health', async (_, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({
      status: 'La API se está ejectando correctamente',
      db: 'Conexión activa',
    });
  } catch (error) {
    res.status(500).json({
      status: 'La API no se está ejecutando correctamente',
      db: 'Conexión no activa',
      error: error.message,
    });
  }
});

export default app.listen(PORT, IP, () => {
  console.log(`Servidor iniciado en ${IP}:${PORT}`);
});
