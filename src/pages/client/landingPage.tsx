

import { LandingPageComponent } from "../../components/landingpage/landingPage";
import { UnprotectedLayout } from "../../components/layouts/unprotected";

export default function LandingPage() {
  return (
    <>
      <UnprotectedLayout
        title="Landing Page"
        description="MIT Subscription platform"
      >
        <LandingPageComponent />
      </UnprotectedLayout>
    </>
  );
}
