import { useMemo } from "react";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";
import type { MetricDataAttributes } from "../../../utilities/typefiles";

interface MetricsDataPoint {
  month: string;
  mrr: number;
  users: number;
  churn: number;
  newUsers: number;
  revenue: number;
}

interface ChartsDashboardProps {
  metricsData?: MetricDataAttributes;
}

export function ChartsDashboard({ metricsData }: ChartsDashboardProps) {
  const generateChartData = (): MetricsDataPoint[] => {
    // If we have real metrics data, transform it for charts
    if (metricsData?.dailyMetrics?.revenue && metricsData?.dailyMetrics?.revenue.length > 0) {
      // Group data by month
      const monthlyData = new Map<string, { mrrSum: number; usersSum: number; churnSum: number; newUsersSum: number; revenueSum: number; count: number }>();
      
      metricsData.dailyMetrics.revenue.forEach((revenue, idx) => {
        const date = new Date(revenue.date);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        
        const engagement = metricsData.dailyMetrics.engagement[idx] || { value: 0 };
        const conversion = metricsData.dailyMetrics.conversion[idx] || { value: 0 };
        
        const mrr = Math.floor(Number(revenue.value) * 0.46);
        const users = Math.floor(Number(engagement.value) / 0.7);
        const churn = Number(conversion.value);
        const newUsers = Math.floor(Number(engagement.value) * 0.15);
        const revVal = Math.floor(Number(revenue.value));
        
        if (!monthlyData.has(monthKey)) {
          monthlyData.set(monthKey, { mrrSum: 0, usersSum: 0, churnSum: 0, newUsersSum: 0, revenueSum: 0, count: 0 });
        }
        
        const existing = monthlyData.get(monthKey)!;
        existing.mrrSum += mrr;
        existing.usersSum += users;
        existing.churnSum += churn;
        existing.newUsersSum += newUsers;
        existing.revenueSum += revVal;
        existing.count += 1;
      });
      
      // Convert to array and calculate averages
      return Array.from(monthlyData.entries()).map(([monthKey, data]) => ({
        month: monthKey,
        mrr: Math.floor(data.mrrSum / data.count),
        users: Math.floor(data.usersSum / data.count),
        churn: Math.floor(data.churnSum / data.count * 100) / 100,
        newUsers: Math.floor(data.newUsersSum / data.count),
        revenue: Math.floor(data.revenueSum / data.count)
      }));
    }

    // Fallback to mock data if no real data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      mrr: 5000 + (i * 800) + Math.random() * 500,
      users: 120 + (i * 15) + Math.floor(Math.random() * 10),
      churn: 3 + Math.random() * 2,
      newUsers: 15 + Math.floor(Math.random() * 10),
      revenue: 5500 + (i * 900) + Math.random() * 600
    }));
  };

  const metricsData_state = useMemo(() => generateChartData(), [metricsData]);
    return (
        <section className="mb-5!">
             {/* Charts Section - MRR Growth & User Acquisition */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {/* MRR Growth Chart */}
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 flex flex-col h-40 md:h-60 lg:h-96 p-3!">
                        <TextUIComponent
                          type="h4"
                          text="MRR Growth"
                          className="text-white mb-4 font-semibold text-base"
                        />
                        <div className="w-full flex-1 min-h-0">
                          <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                            <defs>
                              <linearGradient id="mrrGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            {metricsData_state.map((d, i) => {
                              const x = (i / (metricsData_state.length - 1)) * 900 + 50;
                              const maxMrr = Math.max(...metricsData_state.map(m => m.mrr));
                              const minMrr = Math.min(...metricsData_state.map(m => m.mrr));
                              const range = maxMrr - minMrr || 1;
                              const y = 180 - (((d.mrr - minMrr) / range) * 140);
                              return (
                                <g key={i}>
                                  <text x={x} y="195" fill="rgb(148, 163, 184)" fontSize="16" textAnchor="middle" fontWeight="500">
                                    {d.month}
                                  </text>
                                  <circle cx={x} cy={y} r="5" fill="rgb(59, 130, 246)" />
                                  {i > 0 && (
                                    <line
                                      x1={(i - 1) / (metricsData_state.length - 1) * 900 + 50}
                                      y1={180 - (((metricsData_state[i - 1].mrr - minMrr) / range) * 140)}
                                      x2={x}
                                      y2={y}
                                      stroke="rgb(59, 130, 246)"
                                      strokeWidth="3"
                                    />
                                  )}
                                </g>
                              );
                            })}
                            <polygon
                              points={metricsData_state.map((d, i) => {
                                const x = (i / (metricsData_state.length - 1)) * 900 + 50;
                                const maxMrr = Math.max(...metricsData_state.map(m => m.mrr));
                                const minMrr = Math.min(...metricsData_state.map(m => m.mrr));
                                const range = maxMrr - minMrr || 1;
                                const y = 180 - (((d.mrr - minMrr) / range) * 140);
                                return `${x},${y}`;
                              }).join(' ') + ' 950,180 50,180'}
                              fill="url(#mrrGradient)"
                            />
                          </svg>
                        </div>
                      </div>
            
                      {/* User Acquisition Chart */}
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 flex flex-col h-40 md:h-60 lg:h-96 p-3!">
                        <TextUIComponent
                          type="h4"
                          text="User Acquisition"
                          className="text-white mb-4 font-semibold text-base"
                        />
                        <div className="w-full flex-1 min-h-0">
                          <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                            {metricsData_state.map((d, i) => {
                              const barWidth = 900 / metricsData_state.length;
                              const x = (i * barWidth) + 50;
                              const maxUsers = Math.max(...metricsData_state.map(m => m.users));
                              const minUsers = Math.min(...metricsData_state.map(m => m.users));
                              const range = maxUsers - minUsers || 1;
                              const height = ((d.users - minUsers) / range) * 140;
                              const y = 170 - height;
                              return (
                                <g key={i}>
                                  <rect
                                    x={x}
                                    y={y}
                                    width={barWidth - 15}
                                    height={height}
                                    fill="rgb(147, 51, 234)"
                                    rx="6"
                                  />
                                  <text x={x + (barWidth - 15) / 2} y="190" fill="rgb(148, 163, 184)" fontSize="16" textAnchor="middle" fontWeight="500">
                                    {d.month}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                      </div>
                    </div>
            
        </section>
    )
}