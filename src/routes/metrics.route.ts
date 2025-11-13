import { Router } from 'express';
import { getMetrics, uploadMetrics, deleteMetrics, upload } from '../controllers/metrics.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const metricsRouter = Router();

metricsRouter.get('/metrics', authMiddleware, getMetrics);
metricsRouter.post('/metrics/upload', authMiddleware, upload.single('file'), uploadMetrics);
metricsRouter.delete('/del/metrics', authMiddleware, deleteMetrics);

export default metricsRouter;
