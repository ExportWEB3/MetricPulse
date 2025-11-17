import { Response, NextFunction } from 'express';
import multer from 'multer';
import { Metric } from '../models/Metric.js';
import { Insight } from '../models/Insight.js';
import { AuthRequest } from '../types/index.js';
import { parseCSV } from '../utilities/csvParser.js';
import { generateAIInsights } from '../utilities/gemini.js';

const upload = multer({ storage: multer.memoryStorage() });

export const getMetrics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const metrics = await Metric.find({ userId: req.userId }).sort({ date: 1 }).lean();
    const insights = await Insight.findOne({ userId: req.userId }).lean();

    res.json({
      message: 'Metrics retrieved successfully',
      count: metrics.length,
      payload: {
        metrics,
        insights: insights?.insights || []
      }
    });
  } catch (error: any) {
    console.error('Get metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
};

export const uploadMetrics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Parse CSV
    const fileContent = req.file.buffer.toString('utf-8');
    const parsedMetrics = await parseCSV(fileContent);

    // Add userId to each metric
    const metricsWithUser = parsedMetrics.map((metric) => ({
      ...metric,
      userId: req.userId!
    }));

    // Delete existing metrics for this user (optional - or keep history)
    await Metric.deleteMany({ userId: req.userId });

    // Insert new metrics
    const savedMetrics = await Metric.insertMany(metricsWithUser);

    // Generate AI insights - convert to plain objects
    const metricsForInsights = savedMetrics.map((m: any) => ({
      _id: m._id.toString(),
      userId: m.userId.toString(),
      date: m.date,
      mrr: m.mrr,
      users: m.users,
      churn: m.churn,
      newUsers: m.newUsers,
      revenue: m.revenue,
      uploadedAt: m.uploadedAt
    }));
    
    const insights = await generateAIInsights(metricsForInsights);

    // Save insights
    await Insight.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        insights: insights.insights,
        generatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Metrics uploaded successfully',
      count: savedMetrics.length,
      payload: {
        metrics: savedMetrics,
        insights: insights.insights
      }
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(400).json({ error: error.message || 'Failed to upload metrics' });
  }
};

export const deleteMetrics = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await Metric.deleteMany({ userId: req.userId });
    await Insight.deleteMany({ userId: req.userId });

    res.json({ message: 'All metrics deleted successfully' });
  } catch (error: any) {
    console.error('Delete metrics error:', error);
    res.status(500).json({ error: 'Failed to delete metrics' });
  }
};

export { upload };
