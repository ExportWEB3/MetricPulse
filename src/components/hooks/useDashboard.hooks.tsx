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
        dashboardDispatch({ type: "SET_MODE", payload: "real" });
        dashboardDispatch({ type: "SET_METRICS", payload: response.payload as any });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch dashboard data";
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
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetchIt({
          apiEndPoint: "metrics/upload-csv",
          httpMethod: "post",
          reqData: formData,
          isSuccessNotification: {
            notificationText: "CSV uploaded successfully!",
            notificationState: true,
          },
          contypeType: "multipart/form-data",
        });

        if (response?.payload) {
          dashboardDispatch({ type: "SET_METRICS", payload: response.payload as any });
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Failed to upload CSV";
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
