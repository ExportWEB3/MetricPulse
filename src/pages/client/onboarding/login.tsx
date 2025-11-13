import { UnprotectedLayout } from "../../../components/layouts/unprotected";
import { LoginComponent } from "../../../components/onboarding/login";

export default function Loginpage() {
  return (
    <>
      <UnprotectedLayout
        title="Onboarding"
        description="MetricPulse Login Page"
      >
        <LoginComponent />
      </UnprotectedLayout>
    </>
  );
}
