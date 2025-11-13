import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import metricsRouter from './routes/metrics.route.js';
import insightsRouter from './routes/insights.route.js';
import errorMiddleware from './middleware/error.js';
import sanitizedConfig from './config/env.js';

const app = express();

// Trust proxy for accurate client IP detection in rate limiting
app.set('trust proxy', 1);

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? sanitizedConfig.FRONTEND_URL 
      : ['http://localhost:3000', 'http://127.0.0.1:3000', "https://1c9e65e8119d.ngrok-free.app"],
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1', authRouter);
app.use('/api/v1', metricsRouter);
app.use('/api/v1', insightsRouter);

// Health and status endpoints
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/api/v1/serverstatus', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorMiddleware);

export default app;
