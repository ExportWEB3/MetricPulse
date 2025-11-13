import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { DashboardProvider } from "./contexts/dashboard/dashboard.context";

// Lazy-loaded pages
const LandingPage = lazy(
  () => import("./pages/client/landingPage")
);
const LoginPage = lazy(
  () => import("./pages/client/onboarding/login")
);
const DashboardPage = lazy(
  () => import("./pages/client/dashboard/dashboard")
)

function App() {
  return (
    <>
      <BrowserRouter>
        <DashboardProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/:mode/dashboard" element={<DashboardPage />} />
          </Routes>
        </DashboardProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
