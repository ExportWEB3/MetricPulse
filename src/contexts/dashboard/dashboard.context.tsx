import { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import { DashboardReducer } from "./dashboard.reducer";
import type {
  DashboardContextAttributes,
  DashboardInitialStateAttributes,
} from "../../utilities/typefiles";

export const initialDashboardState: DashboardInitialStateAttributes = {
  mode: "real", // "demo" or "real"
  metrics: null,
  insights: null,
  isLoading: false,
  error: null,
  csvUploadProgress: 0,
  lastUpdated: null,
};

export const DashboardContext = createContext<DashboardContextAttributes>({
  dashboardState: initialDashboardState,
  dashboardDispatch: () => null,
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardState, dashboardDispatch] = useReducer(
    DashboardReducer,
    initialDashboardState
  );

  return (
    <DashboardContext.Provider value={{ dashboardState, dashboardDispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
