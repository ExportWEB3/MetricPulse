import { useParams } from "react-router-dom";
import { DashboardComponent } from "../../../components/dashboard/user/dashboard";
import { UnprotectedLayout } from "../../../components/layouts/unprotected";
import { ProtectedLayout } from "../../../components/layouts/protected";

export default function DashboardPage() {
  const { mode } = useParams();

  if (mode === "demo") {
    return (
      <UnprotectedLayout
        title="Dashboard Demo"
        description="MetricPulse Demo Dashboard"
      >
        <DashboardComponent />
      </UnprotectedLayout>
    );
  }

  return (
    <ProtectedLayout title="Dashboard User" description="MetricPulse Dashboard User">
      <DashboardComponent />
    </ProtectedLayout>
  );
}
