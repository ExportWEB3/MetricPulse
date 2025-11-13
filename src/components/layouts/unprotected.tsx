import { useContext } from "react";
 //import { LoadingComponent } from "../../utilities/UI/loading.ui";
//import { CheckServerStatus } from "../error/error.component";
import type { layoutAttributes } from "../../utilities/typefiles";
//import { settingContext } from "../../contexts/settings/settings.context";
import { NotificationContext } from "../../contexts/notification/notification.context";
import { UserContext } from "../../contexts/user/user.context";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";
import { ToastComponentUI } from "../../utilities/UI/toast.ui";

export function UnprotectedLayout(props: layoutAttributes) {
  const { children, } = props;
  // const { settingsState } = useContext(settingContext);
  const { notificationState } = useContext(NotificationContext);
  const { userState } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/*  <HeaderComponent />
       NOTE: When backend is down we intentionally still render the UI so
          frontend work (onboarding, components, layout) can continue.
          Previously the layout returned a server-down overlay and prevented
          rendering children when `userState.isServerAlive` was false. */}

      {/* {settingsState?.isLoading && <LoadingComponent background={false} />} */}
      {notificationState?.notification?.notificationText && (
        <ToastComponentUI />
      )}

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
