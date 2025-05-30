import express from 'express';
import { sessionMiddleware, logger } from './middleware/middleware';

import { connectRedis } from './utils/redis';
import { connectDb } from './utils/db';

import userRouter from './routes/authRouter';

const app = express();

app.use(express.json());

(async () => {
  await connectDb();
})();

(async () => {
  await connectRedis();
})();

// MIDDLEWARE STACK

app.use(sessionMiddleware);
app.use(logger);

// ROUTES

app.use('/api/auth', userRouter);

app.listen(3005, () => {
  console.log('Server is running on http://localhost:3005');
});