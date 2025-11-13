import { useState } from "react";
import { TextUIComponent } from "../../../utilities/UI/texts.ui";

interface MetricsDataPoint {
  month: string;
  mrr: number;
  users: number;
  churn: number;
  newUsers: number;
  revenue: number;
}

export function ChartsDashboard() {
       const generateMockData = () => {
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

        const [metricsData] = useState<MetricsDataPoint[]>(generateMockData());
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
                            {metricsData.map((d, i) => {
                              const x = (i / (metricsData.length - 1)) * 900 + 50;
                              const maxMrr = Math.max(...metricsData.map(m => m.mrr));
                              const y = 180 - ((d.mrr / maxMrr) * 140);
                              return (
                                <g key={i}>
                                  <text x={x} y="195" fill="rgb(148, 163, 184)" fontSize="16" textAnchor="middle" fontWeight="500">
                                    {d.month}
                                  </text>
                                  <circle cx={x} cy={y} r="5" fill="rgb(59, 130, 246)" />
                                  {i > 0 && (
                                    <line
                                      x1={(i - 1) / (metricsData.length - 1) * 900 + 50}
                                      y1={180 - ((metricsData[i - 1].mrr / maxMrr) * 140)}
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
                              points={metricsData.map((d, i) => {
                                const x = (i / (metricsData.length - 1)) * 900 + 50;
                                const maxMrr = Math.max(...metricsData.map(m => m.mrr));
                                const y = 180 - ((d.mrr / maxMrr) * 140);
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
                            {metricsData.map((d, i) => {
                              const barWidth = 900 / metricsData.length;
                              const x = (i * barWidth) + 50;
                              const maxUsers = Math.max(...metricsData.map(m => m.users));
                              const height = (d.users / maxUsers) * 140;
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