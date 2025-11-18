import { useContext, useCallback, useRef } from "react";
import { DashboardContext } from "../../contexts/dashboard/dashboard.context";
import { generateDemoData } from "../../utilities/demoData";
import { useHttpFetcher } from "./custom.hooks";

// Store demo data in module scope so it persists across renders
let cachedDemoData: any = null;

export const useDashboard = () => {
  const { dashboardState, dashboardDispatch } = useContext(DashboardContext);
  const { fetchIt } = useHttpFetcher();
  const demoDataInitialized = useRef(false);

  // Initialize demo data only once per session
  const initializeDemoMode = useCallback(() => {
    dashboardDispatch({ type: "SET_MODE", payload: "demo" });
    
    // Generate demo data only if not already cached
    if (!cachedDemoData) {
      cachedDemoData = generateDemoData();
    }
    
    dashboardDispatch({ type: "SET_METRICS", payload: cachedDemoData });
    demoDataInitialized.current = true;
  }, [dashboardDispatch]);

  // Fetch real data from API
  const fetchRealModeData = useCallback(async () => {
    try {
      dashboardDispatch({ type: "SET_LOADING", payload: true });

      const response = await fetchIt({
        apiEndPoint: "metrics",
        httpMethod: "get",
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });

      if (response?.payload) {
        const { metrics: rawMetrics, insights } = response.payload as any;
        
        if (!rawMetrics || rawMetrics.length === 0) {
          // No metrics found, show empty state
          dashboardDispatch({ type: "SET_MODE", payload: "real" });
          dashboardDispatch({ type: "SET_METRICS", payload: null });
          return;
        }

        // Transform raw metrics to MetricDataAttributes format
        const startDate = new Date(rawMetrics[0].date);
        const endDate = new Date(rawMetrics[rawMetrics.length - 1].date);
        
        const metricData: any = {
          mode: "real",
          timePeriod: {
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            type: "custom"
          },
          summaryMetrics: {
            totalRevenue: rawMetrics.reduce((sum: number, m: any) => sum + m.revenue, 0),
            totalUsers: rawMetrics[rawMetrics.length - 1].users,
            activeUsers: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.8),
            conversionRate: "3.5",
            customerRetention: (100 - (rawMetrics[rawMetrics.length - 1].churn * 10)).toFixed(1),
            avgSessionDuration: 450,
            bounceRate: (rawMetrics[rawMetrics.length - 1].churn * 5).toFixed(1)
          },
          dailyMetrics: {
            revenue: rawMetrics.map((m: any) => ({
              date: new Date(m.date).toISOString().split("T")[0],
              value: m.revenue
            })),
            engagement: rawMetrics.map((m: any) => ({
              date: new Date(m.date).toISOString().split("T")[0],
              value: m.users * 0.7
            })),
            conversion: rawMetrics.map((m: any) => ({
              date: new Date(m.date).toISOString().split("T")[0],
              value: m.churn
            }))
          },
          monthlyMetrics: {
            revenue: rawMetrics.map((m: any) => ({
              month: new Date(m.date).toLocaleDateString('en-US', { month: 'short' }),
              value: Math.floor(m.revenue * 100)
            }))
          },
          productMetrics: [
            {
              name: "Core Product",
              revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.6,
              units: rawMetrics[rawMetrics.length - 1].users * 0.5,
              satisfaction: "4.6"
            }
          ],
          trafficSources: [
            { source: "Direct", visitors: rawMetrics[rawMetrics.length - 1].users * 0.4, conversion: 3.2 },
            { source: "Organic", visitors: rawMetrics[rawMetrics.length - 1].users * 0.3, conversion: 2.8 },
            { source: "Referral", visitors: rawMetrics[rawMetrics.length - 1].users * 0.3, conversion: 4.1 }
          ],
          customerSegments: [
            { segment: "Premium", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.2), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.6 },
            { segment: "Standard", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.5), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.3 },
            { segment: "Basic", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.3), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.1 }
          ],
          chartData: {
            revenueByCategory: [
              { name: "Product", value: 60 },
              { name: "Services", value: 25 },
              { name: "Other", value: 15 }
            ],
            geographicDistribution: [
              { name: "North America", value: 45 },
              { name: "Europe", value: 30 },
              { name: "Asia", value: 25 }
            ]
          },
          aiInsights: insights?.map((insight: any) => ({
            title: insight.title,
            description: insight.description,
            icon: insight.severity === 'success' ? 'ri-trending-up-line' : insight.severity === 'warning' ? 'ri-alert-line' : 'ri-information-line'
          })) || [],
          lastUpdated: new Date().toISOString()
        };

        dashboardDispatch({ type: "SET_MODE", payload: "real" });
        dashboardDispatch({ type: "SET_METRICS", payload: metricData });
        
        if (insights) {
          dashboardDispatch({ type: "SET_INSIGHTS", payload: insights });
        }
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to fetch dashboard data";
      dashboardDispatch({
        type: "SET_ERROR",
        payload: errorMessage,
      });
    } finally {
      dashboardDispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dashboardDispatch, fetchIt]);

  // Upload CSV for real mode
  const uploadCSV = useCallback(
    async (file: File) => {
      try {
        dashboardDispatch({ type: "SET_LOADING", payload: true });
        
        // Prepare FormData for multipart upload
        const formData = new FormData();
        formData.append('file', file);

        // Send to backend
        const response = await fetchIt({
          apiEndPoint: "metrics/upload",
          httpMethod: "post",
          reqData: formData,
          contypeType: "multipart/form-data",
          isSuccessNotification: {
            notificationState: true,
            notificationText: "Metrics uploaded successfully! AI insights generated."
          },
        });

        if (response?.payload) {
          // Backend returns raw metrics array and insights
          const { metrics: rawMetrics, insights } = response.payload as any;
          
          if (!rawMetrics || rawMetrics.length === 0) {
            throw new Error("No metrics returned from server");
          }

          // Transform raw metrics to MetricDataAttributes format
          const startDate = new Date(rawMetrics[0].date);
          const endDate = new Date(rawMetrics[rawMetrics.length - 1].date);
          
          const metricData: any = {
            mode: "real",
            timePeriod: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
              type: "custom"
            },
            summaryMetrics: {
              totalRevenue: rawMetrics.reduce((sum: number, m: any) => sum + m.revenue, 0),
              totalUsers: rawMetrics[rawMetrics.length - 1].users,
              activeUsers: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.8),
              conversionRate: "3.5",
              customerRetention: (100 - (rawMetrics[rawMetrics.length - 1].churn * 10)).toFixed(1),
              avgSessionDuration: 450,
              bounceRate: (rawMetrics[rawMetrics.length - 1].churn * 5).toFixed(1)
            },
            dailyMetrics: {
              revenue: rawMetrics.map((m: any) => ({
                date: new Date(m.date).toISOString().split("T")[0],
                value: m.revenue
              })),
              engagement: rawMetrics.map((m: any) => ({
                date: new Date(m.date).toISOString().split("T")[0],
                value: m.users * 0.7
              })),
              conversion: rawMetrics.map((m: any) => ({
                date: new Date(m.date).toISOString().split("T")[0],
                value: m.churn
              }))
            },
            monthlyMetrics: {
              revenue: rawMetrics.map((m: any) => ({
                month: new Date(m.date).toLocaleDateString('en-US', { month: 'short' }),
                value: Math.floor(m.revenue * 100)
              }))
            },
            productMetrics: [
              {
                name: "Core Product",
                revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.6,
                units: rawMetrics[rawMetrics.length - 1].users * 0.5,
                satisfaction: "4.6"
              }
            ],
            trafficSources: [
              { source: "Direct", visitors: rawMetrics[rawMetrics.length - 1].users * 0.4, conversion: 3.2 },
              { source: "Organic", visitors: rawMetrics[rawMetrics.length - 1].users * 0.3, conversion: 2.8 },
              { source: "Referral", visitors: rawMetrics[rawMetrics.length - 1].users * 0.3, conversion: 4.1 }
            ],
            customerSegments: [
              { segment: "Premium", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.2), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.6 },
              { segment: "Standard", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.5), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.3 },
              { segment: "Basic", count: Math.floor(rawMetrics[rawMetrics.length - 1].users * 0.3), revenue: rawMetrics[rawMetrics.length - 1].mrr * 0.1 }
            ],
            chartData: {
              revenueByCategory: [
                { name: "Product", value: 60 },
                { name: "Services", value: 25 },
                { name: "Other", value: 15 }
              ],
              geographicDistribution: [
                { name: "North America", value: 45 },
                { name: "Europe", value: 30 },
                { name: "Asia", value: 25 }
              ]
            },
            aiInsights: insights?.map((insight: any) => ({
              title: insight.title,
              description: insight.description,
              icon: insight.severity === 'success' ? 'ri-trending-up-line' : insight.severity === 'warning' ? 'ri-alert-line' : 'ri-information-line'
            })) || [],
            lastUpdated: new Date().toISOString()
          };

          // Set metrics in dashboard
          dashboardDispatch({ type: "SET_MODE", payload: "real" });
          dashboardDispatch({ type: "SET_METRICS", payload: metricData });
          
          // Store insights if available
          if (insights) {
            dashboardDispatch({ type: "SET_INSIGHTS", payload: insights });
          }
        }

      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Failed to upload CSV";
        dashboardDispatch({
          type: "SET_ERROR",
          payload: errorMessage,
        });
      } finally {
        dashboardDispatch({ type: "SET_LOADING", payload: false });
        dashboardDispatch({ type: "SET_CSV_UPLOAD_PROGRESS", payload: 0 });
      }
    },
    [dashboardDispatch, fetchIt]
  );

  // Clear all data and reset to initial state
  const resetDashboard = useCallback(() => {
    dashboardDispatch({ type: "RESET_DASHBOARD" });
  }, [dashboardDispatch]);

  // Clear error message
  const clearError = useCallback(() => {
    dashboardDispatch({ type: "CLEAR_ERROR" });
  }, [dashboardDispatch]);

  return {
    // State
    dashboardState,
    mode: dashboardState.mode,
    metrics: dashboardState.metrics,
    insights: dashboardState.insights,
    isLoading: dashboardState.isLoading,
    error: dashboardState.error,
    csvUploadProgress: dashboardState.csvUploadProgress,
    lastUpdated: dashboardState.lastUpdated,

    // Actions
    initializeDemoMode,
    fetchRealModeData,
    uploadCSV,
    resetDashboard,
    clearError,
  };
};
