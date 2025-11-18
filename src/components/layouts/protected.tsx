import { useContext } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { CheckServerStatus } from "../error/error.component";
import { UnprotectedLayout } from "./unprotected";
import { GlobalErrorComponent } from "../../utilities/UI/globalerror.ui";
import { SuspenseFallback } from "../suspense/SuspenseFallback";
import type { layoutAttributes } from "../../utilities/typefiles";
import { LoginComponent } from "../onboarding/login";
import { HeaderComponent } from "../header/header";
import { DragDropOverlay } from "../dashboard/drag-drop-overlay";

export function ProtectedLayout(props: layoutAttributes) {
  const { children } = props;
  const { userState } = useContext(UserContext);

  return (
    <>
      {userState?.isServerAlive === false && <CheckServerStatus />}

      {userState?.isRefreshTokenResponseState ? (
        !userState?.user?._id ? (
          <UnprotectedLayout title="Login">
            <LoginComponent/>
          </UnprotectedLayout>
        ) : (
          <DragDropOverlay>
            <div className={`w-full flex flex-col no-scrollbar overflow-auto bg-linear-to-br from-slate-900 via-slate-800 to-slate-900`}>

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
          </DragDropOverlay>
        )
      ) : (
        // Still checking authentication - show loading state
        <SuspenseFallback />
      )}
    </>
  );
}

