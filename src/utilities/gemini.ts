import { IMetric } from '../types/index.js';
import sanitizedConfig from '../config/env.js';

export const generateAIInsights = async (metrics: IMetric[]) => {
  if (metrics.length < 2) {
    return {
      insights: [
        {
          title: 'Insufficient Data',
          description: 'Upload more data points to generate meaningful insights.',
          severity: 'info' as const
        }
      ]
    };
  }

  const latest = metrics[metrics.length - 1];
  const previous = metrics[metrics.length - 2];

  const prompt = `You are a SaaS metrics analyst. Analyze these metrics and provide exactly 3 actionable insights in JSON format.

Current Month:
- MRR: $${latest.mrr.toFixed(2)}
- Users: ${latest.users}
- Churn: ${latest.churn.toFixed(2)}%
- New Users: ${latest.newUsers}
- Revenue: $${latest.revenue.toFixed(2)}

Previous Month:
- MRR: $${previous.mrr.toFixed(2)}
- Users: ${previous.users}
- Churn: ${previous.churn.toFixed(2)}%
- New Users: ${previous.newUsers}
- Revenue: $${previous.revenue.toFixed(2)}

Respond ONLY with this JSON structure (no markdown, no explanation):
{
  "insights": [
    {"title": "Insight Title", "description": "Detailed actionable insight", "severity": "success"},
    {"title": "Insight Title", "description": "Detailed actionable insight", "severity": "warning"},
    {"title": "Insight Title", "description": "Detailed actionable insight", "severity": "info"}
  ]
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${sanitizedConfig.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();
    const text = (data as any).candidates[0].content.parts[0].text;

    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanText);

    return parsed;
  } catch (error) {
    console.error('Gemini API Error:', error);

    // Fallback to calculated insights
    const mrrGrowth = ((latest.mrr - previous.mrr) / previous.mrr * 100).toFixed(1);
    const userGrowth = ((latest.users - previous.users) / previous.users * 100).toFixed(1);
    const churnChange = (latest.churn - previous.churn).toFixed(1);

    return {
      insights: [
        {
          title: parseFloat(mrrGrowth) > 0 ? 'MRR Growth Detected' : 'MRR Decline',
          description: `Your MRR ${parseFloat(mrrGrowth) > 0 ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(mrrGrowth))}% this month. ${parseFloat(mrrGrowth) > 0 ? 'Continue scaling your acquisition channels.' : 'Investigate retention issues and consider pricing adjustments.'}`,
          severity: parseFloat(mrrGrowth) > 0 ? 'success' : 'warning'
        },
        {
          title: 'User Base Update',
          description: `User growth is at ${userGrowth}% month-over-month with ${latest.newUsers} new sign-ups. Focus on onboarding optimization to convert these users faster.`,
          severity: 'info'
        },
        {
          title: parseFloat(churnChange) > 0 ? 'Churn Increased' : 'Churn Improved',
          description: parseFloat(churnChange) > 0
            ? `Churn increased by ${Math.abs(parseFloat(churnChange))}%. Consider implementing win-back campaigns and investigating user feedback.`
            : `Churn decreased by ${Math.abs(parseFloat(churnChange))}%. Your retention efforts are working. Document what's driving success.`,
          severity: parseFloat(churnChange) > 0 ? 'warning' : 'success'
        }
      ]
    };
  }
};
