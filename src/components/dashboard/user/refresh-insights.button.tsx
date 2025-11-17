import { useState } from "react";
import { ButtonUIComponent } from "../../../utilities/UI/button.ui";
import { useHttpFetcher } from "../../hooks/custom.hooks";
import { useContext } from "react";
import { DashboardContext } from "../../../contexts/dashboard/dashboard.context";

export function RefreshInsightsButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { fetchIt } = useHttpFetcher();
  const { dashboardState, dashboardDispatch } = useContext(DashboardContext);

  const handleRefreshInsights = async () => {
    try {
      setIsRefreshing(true);

      const response = await fetchIt({
        apiEndPoint: "regenerate",
        httpMethod: "post",
        reqData: {},
        isSuccessNotification: {
          notificationState: true,
          notificationText: "AI Insights regenerated successfully!"
        },
        buttonLoadingSetter: setIsRefreshing,
      });

      if (response?.payload || (response as any)?.insights) {
        const insightsData = (response.payload as any)?.insights || (response as any).insights || [];
        
        if (insightsData && insightsData.length > 0) {
          const transformedInsights = insightsData.map((insight: any) => ({
            title: insight.title,
            description: insight.description,
            icon: insight.severity === 'success' ? 'ri-trending-up-line' : insight.severity === 'warning' ? 'ri-alert-line' : 'ri-information-line',
            type: insight.severity === 'success' ? 'positive' : insight.severity === 'warning' ? 'warning' : 'info',
            id: Math.random().toString()
          }));

          // Update metrics object with new aiInsights
          if (dashboardState?.metrics) {
            const updatedMetrics = {
              ...dashboardState.metrics,
              aiInsights: transformedInsights
            };
            dashboardDispatch({ 
              type: "SET_METRICS", 
              payload: updatedMetrics
            });
          }
          dashboardDispatch({ 
            type: "SET_INSIGHTS", 
            payload: insightsData
          });
        }
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to regenerate insights";
      
      dashboardDispatch({
        type: "SET_ERROR",
        payload: errorMessage,
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="w-full h-20 flex mt-5! items-center border-t border-slate-700">
      <ButtonUIComponent 
        type="button"
        text={isRefreshing ? "Regenerating..." : "Refresh AI Insights"}
        onClick={handleRefreshInsights}
        isDisable={isRefreshing}
        className={`w-full ${
          isRefreshing 
            ? "bg-blue-600 cursor-not-allowed opacity-75" 
            : "bg-blue-700 hover:bg-blue-500"
        } text-white text-sm font-medium py-2! rounded-lg transition-all duration-200`}
      />
    </div>
  );
}
