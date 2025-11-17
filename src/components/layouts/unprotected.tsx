import { useContext } from "react";
 //import { LoadingComponent } from "../../utilities/UI/loading.ui";
//import { CheckServerStatus } from "../error/error.component";
import type { layoutAttributes } from "../../utilities/typefiles";
//import { settingContext } from "../../contexts/settings/settings.context";
import { UserContext } from "../../contexts/user/user.context";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";

export function UnprotectedLayout(props: layoutAttributes) {
  const { children } = props;
  // const { settingsState } = useContext(settingContext);
  const { userState } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen  bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Show header only in demo dashboard */}
      {/* title === "Dashboard Demo" && (
        <div className="z-6">
          <HeaderComponent />
        </div>
      ) */}

      {/* {settingsState?.isLoading && <LoadingComponent background={false} />} */}

      {/* Always render the main area so dev work isn't blocked by server state */}
      <main className="grow w-full relative min-h-[calc(100vh-80px)]">
        {userState?.globalError?.errorState ? (
          <GlobalErrorComponent />
        ) : (
          children
        )}
      </main>

      {/* <FooterComponent /> */}
    </div>
  );
}
