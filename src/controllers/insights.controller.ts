import { Response, NextFunction } from 'express';
import { Insight } from '../models/Insight.js';
import { Metric } from '../models/Metric.js';
import { AuthRequest } from '../types/index.js';
import { generateAIInsights } from '../utilities/gemini.js';

export const getInsights = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const insight = await Insight.findOne({ userId: req.userId })
      .sort({ generatedAt: -1 })
      .lean();

    if (!insight) {
      res.status(404).json({ error: 'No insights found. Upload metrics first.' });
      return;
    }

    res.json(insight);
  } catch (error: any) {
    console.error('Get insights error:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
};

export const regenerateInsights = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const metrics = await Metric.find({ userId: req.userId }).sort({ date: 1 }).lean();

    if (metrics.length < 2) {
      res.status(400).json({ error: 'Need at least 2 data points to generate insights' });
      return;
    }

    const metricsData = metrics.map((m: any) => ({
      ...m,
      userId: m.userId.toString()
    }));

    const insights = await generateAIInsights(metricsData);

    const savedInsight = await Insight.findOneAndUpdate(
      { userId: req.userId },
      {
        userId: req.userId,
        insights: insights.insights,
        generatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json(savedInsight);
  } catch (error: any) {
    console.error('Regenerate insights error:', error);
    res.status(500).json({ error: 'Failed to regenerate insights' });
  }
};
