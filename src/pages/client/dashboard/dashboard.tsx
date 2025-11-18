import { useParams } from "react-router-dom";
import { DashboardComponent } from "../../../components/dashboard/user/dashboard";
import { UnprotectedLayout } from "../../../components/layouts/unprotected";
import { ProtectedLayout } from "../../../components/layouts/protected";
import { DragDropOverlay } from "../../../components/dashboard/drag-drop-overlay";

export default function DashboardPage() {
  const { mode } = useParams();

  if (mode === "demo") {
    return (
      <UnprotectedLayout
        title="Dashboard Demo"
        description="MetricPulse Demo Dashboard"
      >
        <DragDropOverlay>
          <DashboardComponent />
        </DragDropOverlay>
      </UnprotectedLayout>
    );
  }

  return (
    <ProtectedLayout title="Dashboard User" description="MetricPulse Dashboard User">
      <DashboardComponent />
    </ProtectedLayout>
  );
}
