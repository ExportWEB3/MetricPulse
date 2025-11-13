import { useContext } from "react";
import { settingContext } from "../../contexts/settings/settings.context";
import { UserContext } from "../../contexts/user/user.context";
import { NotificationContext } from "../../contexts/notification/notification.context";
import { CheckServerStatus } from "../error/error.component";
import { UnprotectedLayout } from "./unprotected";
import { ToastComponentUI } from "../../utilities/UI/toast.ui";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";
import type { layoutAttributes } from "../../utilities/typefiles";
import { LoginComponent } from "../onboarding/login";
import { HeaderComponent } from "../header/header";

export function ProtectedLayout(props: layoutAttributes) {
  const { children } = props;
  const { userState } = useContext(UserContext);
  const { notificationState } = useContext(NotificationContext);

  return (
    <>
      {!userState?.isServerAlive && <CheckServerStatus />}

      {!userState?.user?._id ? (
        <UnprotectedLayout title="Login">
          <LoginComponent/>
        </UnprotectedLayout>
      ) : (
        <div className={`w-full flex flex-col no-scrollbar overflow-auto`}>
          {notificationState?.notification?.notificationText && (
            <ToastComponentUI />
          )}

          <div className="z-6">
            <HeaderComponent />
          </div>

          <div className={` w-full mt-10! min-h-full pb-16! `}>
            {userState?.globalError?.errorState ? (
              <GlobalErrorComponent />
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </>
  );
}
