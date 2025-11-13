import type { MetricDataAttributes } from "./typefiles";

/**
 * Generates realistic demo data for the dashboard
 * Maps SaaS metrics like MRR, Users, Churn, New Users
 */
export const generateDemoData = (): MetricDataAttributes => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Generate 6-month historical data
  const monthlyData = months.map((month, i) => ({
    month,
    mrr: 5000 + (i * 800) + Math.random() * 500,
    users: 120 + (i * 15) + Math.floor(Math.random() * 10),
    churn: 3 + Math.random() * 2,
    newUsers: 15 + Math.floor(Math.random() * 10),
    revenue: 5500 + (i * 900) + Math.random() * 600
  }));

  // Convert to daily metrics for the last 30 days
  const dailyRevenue = [];
  const dailyEngagement = [];
  const dailyConversion = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    dailyRevenue.push({
      date: date.toISOString().split("T")[0],
      value: 150 + Math.random() * 200 + (i * 3)
    });
    
    dailyEngagement.push({
      date: date.toISOString().split("T")[0],
      value: 60 + Math.random() * 30
    });
    
    dailyConversion.push({
      date: date.toISOString().split("T")[0],
      value: 2.5 + Math.random() * 4
    });
  }

  return {
    mode: "demo",
    timePeriod: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      type: "30days"
    },
    summaryMetrics: {
      totalRevenue: monthlyData.reduce((sum, m) => sum + m.revenue, 0),
      totalUsers: monthlyData[monthlyData.length - 1].users,
      activeUsers: Math.floor(monthlyData[monthlyData.length - 1].users * 0.7),
      conversionRate: (
        dailyConversion.reduce((sum, d) => sum + Number(d.value), 0) /
        dailyConversion.length
      ).toFixed(2),
      customerRetention: (100 - (monthlyData[monthlyData.length - 1].churn * 10)).toFixed(1),
      avgSessionDuration: 450,
      bounceRate: (monthlyData[monthlyData.length - 1].churn * 5).toFixed(1)
    },
    dailyMetrics: {
      revenue: dailyRevenue,
      engagement: dailyEngagement,
      conversion: dailyConversion
    },
    monthlyMetrics: {
      revenue: monthlyData.map(m => ({
        month: m.month,
        value: Math.floor(m.revenue * 100)
      }))
    },
    productMetrics: [
      {
        name: "Product A",
        revenue: monthlyData[monthlyData.length - 1].mrr * 0.4,
        units: monthlyData[monthlyData.length - 1].users * 0.3,
        satisfaction: "4.6"
      },
      {
        name: "Product B",
        revenue: monthlyData[monthlyData.length - 1].mrr * 0.3,
        units: monthlyData[monthlyData.length - 1].users * 0.25,
        satisfaction: "4.4"
      },
      {
        name: "Product C",
        revenue: monthlyData[monthlyData.length - 1].mrr * 0.2,
        units: monthlyData[monthlyData.length - 1].users * 0.25,
        satisfaction: "4.3"
      },
      {
        name: "Product D",
        revenue: monthlyData[monthlyData.length - 1].mrr * 0.1,
        units: monthlyData[monthlyData.length - 1].users * 0.2,
        satisfaction: "4.2"
      }
    ],
    trafficSources: [
      {
        source: "Organic Search",
        percentage: 35,
        users: Math.floor(monthlyData[monthlyData.length - 1].users * 0.35)
      },
      {
        source: "Direct",
        percentage: 22,
        users: Math.floor(monthlyData[monthlyData.length - 1].users * 0.22)
      },
      {
        source: "Social Media",
        percentage: 20,
        users: Math.floor(monthlyData[monthlyData.length - 1].users * 0.2)
      },
      {
        source: "Paid Ads",
        percentage: 15,
        users: Math.floor(monthlyData[monthlyData.length - 1].users * 0.15)
      },
      {
        source: "Referral",
        percentage: 8,
        users: Math.floor(monthlyData[monthlyData.length - 1].users * 0.08)
      }
    ],
    customerSegments: [
      {
        segment: "Enterprise",
        count: Math.floor(monthlyData[monthlyData.length - 1].users * 0.05),
        value: monthlyData[monthlyData.length - 1].mrr * 0.4
      },
      {
        segment: "Mid-Market",
        count: Math.floor(monthlyData[monthlyData.length - 1].users * 0.15),
        value: monthlyData[monthlyData.length - 1].mrr * 0.3
      },
      {
        segment: "SMB",
        count: Math.floor(monthlyData[monthlyData.length - 1].users * 0.4),
        value: monthlyData[monthlyData.length - 1].mrr * 0.2
      },
      {
        segment: "Startup",
        count: Math.floor(monthlyData[monthlyData.length - 1].users * 0.4),
        value: monthlyData[monthlyData.length - 1].mrr * 0.1
      }
    ],
    chartData: {
      revenueByCategory: [
        {
          category: "MRR (Monthly Recurring)",
          value: monthlyData[monthlyData.length - 1].mrr
        },
        {
          category: "New Revenue",
          value: monthlyData[monthlyData.length - 1].newUsers * 50
        },
        {
          category: "Services",
          value: monthlyData[monthlyData.length - 1].mrr * 0.2
        },
        {
          category: "Add-ons",
          value: monthlyData[monthlyData.length - 1].mrr * 0.1
        }
      ],
      geographicDistribution: [
        {
          region: "North America",
          percentage: 40,
          revenue: monthlyData[monthlyData.length - 1].mrr * 0.4
        },
        {
          region: "Europe",
          percentage: 30,
          revenue: monthlyData[monthlyData.length - 1].mrr * 0.3
        },
        {
          region: "Asia Pacific",
          percentage: 20,
          revenue: monthlyData[monthlyData.length - 1].mrr * 0.2
        },
        {
          region: "Other",
          percentage: 10,
          revenue: monthlyData[monthlyData.length - 1].mrr * 0.1
        }
      ]
    },
    aiInsights: [
      {
        id: "insight_1",
        title: "Strong MRR Growth",
        description: `Your MRR increased by ${(
          ((monthlyData[monthlyData.length - 1].mrr -
            monthlyData[monthlyData.length - 2].mrr) /
            monthlyData[monthlyData.length - 2].mrr) *
          100
        ).toFixed(1)}% this month. This momentum suggests your product-market fit is strengthening. Consider scaling marketing efforts.`,
        type: "positive",
        actionable: true
      },
      {
        id: "insight_2",
        title: "User Acquisition Trending Up",
        description: `New user growth is at ${(
          ((monthlyData[monthlyData.length - 1].users -
            monthlyData[monthlyData.length - 2].users) /
            monthlyData[monthlyData.length - 2].users) *
          100
        ).toFixed(1)}% month-over-month. Focus on onboarding optimization to convert these users into paying customers faster.`,
        type: "positive",
        actionable: true
      },
      {
        id: "insight_3",
        title: monthlyData[monthlyData.length - 1].churn >
          monthlyData[monthlyData.length - 2].churn
          ? "Churn Rate Alert"
          : "Churn Improving",
        description:
          monthlyData[monthlyData.length - 1].churn >
          monthlyData[monthlyData.length - 2].churn
            ? `Churn increased by ${(
                monthlyData[monthlyData.length - 1].churn -
                monthlyData[monthlyData.length - 2].churn
              ).toFixed(1)}%. Investigate user feedback and consider implementing win-back campaigns for at-risk customers.`
            : `Churn decreased by ${Math.abs(
                monthlyData[monthlyData.length - 1].churn -
                  monthlyData[monthlyData.length - 2].churn
              ).toFixed(1)}%. Your retention efforts are paying off. Document what's working to replicate success.`,
        type:
          monthlyData[monthlyData.length - 1].churn >
          monthlyData[monthlyData.length - 2].churn
            ? "warning"
            : "positive",
        actionable: true
      },
      {
        id: "insight_4",
        title: "Revenue Diversification Opportunity",
        description:
          "Consider expanding your product offerings to increase ARPU (Average Revenue Per User). Current single-product revenue limits growth potential.",
        type: "neutral",
        actionable: false
      }
    ],
    lastUpdated: new Date().toISOString()
  };
};
