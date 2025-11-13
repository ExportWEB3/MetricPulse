import { DollarSign, Users, UserPlus, AlertCircle } from 'lucide-react';
import type { MetricDataAttributes, MetricCardAttributes } from "./typefiles";

/**
 * Generates metric cards data for easy mapping in dashboard
 * Returns an array of 4 cards: MRR, Total Users, New Users, Churn Rate
 * Includes lucide-react icons with color mapping
 */
export const generateMetricCards = (data: MetricDataAttributes): MetricCardAttributes[] => {
  const mrrGrowth = 9.2; // Monthly recurring revenue growth
  const userGrowth = 8.5; // User acquisition growth
  const newUsers = 17; // New users this month
  const churnIncrease = 0.3; // Churn rate increase

  return [
    {
      type: "MRR",
      icon: <DollarSign className="w-5 h-5" />,
      iconColor: "text-green-400",
      iconBgColor: "bg-green-500/10",
      value: parseInt(data.summaryMetrics.totalRevenue.toString()),
      growth: `+${mrrGrowth}%`,
      growthType: "positive",
      format: "currency"
    },
    {
      type: "Total Users",
      icon: <Users className="w-5 h-5" />,
      iconColor: "text-blue-400",
      iconBgColor: "bg-blue-500/10",
      value: data.summaryMetrics.totalUsers,
      growth: `+${userGrowth}%`,
      growthType: "positive",
      format: "number"
    },
    {
      type: "New Users",
      icon: <UserPlus className="w-5 h-5" />,
      iconColor: "text-purple-400",
      iconBgColor: "bg-purple-500/10",
      value: newUsers,
      growth: newUsers,
      growthType: "positive",
      format: "number"
    },
    {
      type: "Churn Rate",
      icon: <AlertCircle className="w-5 h-5" />,
      iconColor: "text-red-400",
      iconBgColor: "bg-red-500/10",
      value: typeof data.summaryMetrics.bounceRate === 'string' 
        ? data.summaryMetrics.bounceRate 
        : data.summaryMetrics.bounceRate.toString(),
      growth: `↑ ${churnIncrease}%`,
      growthType: "negative",
      format: "percentage"
    }
  ];
};
