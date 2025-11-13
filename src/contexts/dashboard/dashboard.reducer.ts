import type {
  DashboardActionAttributes,
  DashboardInitialStateAttributes,
} from "../../utilities/typefiles";

export const DashboardReducer = (
  dashboardState: DashboardInitialStateAttributes,
  action: DashboardActionAttributes
): DashboardInitialStateAttributes => {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...dashboardState,
        mode: action.payload,
      };

    case "SET_METRICS":
      return {
        ...dashboardState,
        metrics: action.payload,
        lastUpdated: new Date().toISOString(),
        error: null,
      };

    case "SET_LOADING":
      return {
        ...dashboardState,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...dashboardState,
        error: action.payload,
        isLoading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...dashboardState,
        error: null,
      };

    case "SET_CSV_UPLOAD_PROGRESS":
      return {
        ...dashboardState,
        csvUploadProgress: action.payload,
      };

    case "RESET_DASHBOARD":
      return {
        mode: "real",
        metrics: null,
        isLoading: false,
        error: null,
        csvUploadProgress: 0,
        lastUpdated: null,
      };

    default:
      return dashboardState;
  }
};
