

import { LandingComponent } from "../../components/landingpage/landing-page-new";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function LandingPage() {
  return (
    <>
      <UnprotectedLayout
        title="Landing Page"
        description="MIT Subscription platform"
      >
        <LandingComponent />
      </UnprotectedLayout>
    </>
  );
}
