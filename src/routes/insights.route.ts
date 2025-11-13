import { Router } from 'express';
import { getInsights, regenerateInsights } from '../controllers/insights.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const insightsRouter = Router();

insightsRouter.get('/', authMiddleware, getInsights);
insightsRouter.post('/regenerate', authMiddleware, regenerateInsights);

export default insightsRouter;
