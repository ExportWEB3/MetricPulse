import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { DashboardProvider } from "./contexts/dashboard/dashboard.context";
import { UserProvider } from "./contexts/user/user.context";
import { NotificationProvider } from "./contexts/notification/notification.context";
import { SuspenseFallback } from "./components/suspense/SuspenseFallback";
import { ToastComponentUI } from "./utilities/UI/toast.ui";

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
        <UserProvider>
          <NotificationProvider>
            {/* Global Toast - renders anywhere in the app */}
            <ToastComponentUI />
            
            <DashboardProvider>
              <Suspense fallback={<SuspenseFallback />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<LoginPage />} />
                  <Route path="/:mode/dashboard" element={<DashboardPage />} />
                </Routes>
              </Suspense>
            </DashboardProvider>
          </NotificationProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

