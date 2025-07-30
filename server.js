import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


// Routes (✅ import BEFORE use)
import authRouter from './routes/authRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';

// routers
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.use(express.json());

app.get('/api/v1/test', (request, res) => {
  res.json({ msg: 'test route' });
});

// Routes
app.use('/api/v1/jobs', authenticateUser, jobRouter); // Protected routes
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter); // Public routes
// Root
app.get('/', (_request, res) => {
  res.send('Hello World');
});

app.use((request, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// Global error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
