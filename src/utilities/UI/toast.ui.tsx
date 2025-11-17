import { useContext, useEffect } from "react";
import { ClosePopup } from "./close.btn.ui";
import { TitleUIComponent } from "./texts.ui";
import { BackgroundBlur } from "./bg.ui";
import { NotificationContext } from "../../contexts/notification/notification.context";
import type { notificationButtonEvents } from "../typefiles";
import { invalidateSWRKeys } from "../helperfunction";

export const ToastComponentUI = () => {
  const { notificationState, notificationDispatch } =
    useContext(NotificationContext);

  const handleClose = () => {
    const payload = {
      notificationText: "",
      URL: "",
      isTimer: false,
      timer: "",
      bgColour: "",
      textColour: "",
      isNavigation: true,
      statusCode: null,
      isRevalidate: false,
      isRevaliddateURL: [],
      showCancelButton: false,
      event: "" as notificationButtonEvents,
      notificationState: false,
      isURL: false,
    };

    if (notificationState?.notification?.isRevalidate) {
      invalidateSWRKeys(
        notificationState?.notification?.isRevaliddateURL as string[]
      );

      notificationDispatch({ type: "SET_NOTIFICATION", payload });
      return;
    }

    notificationDispatch({ type: "SET_NOTIFICATION", payload });
  };

  useEffect(() => {
    const payload = {
      notificationText: "",
      URL: "",
      isTimer: false,
      timer: "",
      bgColour: "",
      textColour: "",
      isNavigation: true,
      statusCode: null,
      isRevalidate: false,
      isRevaliddateURL: [],
      showCancelButton: false,
      event: "" as notificationButtonEvents,
      notificationState: false,
      isURL: false,
    };

    if (notificationState?.notification?.isTimer) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "SET_NOTIFICATION", payload });
      }, Number(notificationState?.notification?.timer || 3000) || 3000);

      return () => clearTimeout(timer);
    }
  }, [
    notificationState?.notification?.isTimer,
    notificationState?.notification?.timer,
  ]);

  return (
    <>
      {notificationState?.notification?.notificationState && (
        <div className="fixed inset-0 z-50 flex justify-center items-start">
          <div
            className={`relative w-11/12 sm:w-2/3 lg:w-1/2 xl:w-1/3 mt-24!
            backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700
              transform transition-all duration-300 ease-out
              scale-100 opacity-100
              flex flex-col overflow-hidden`}
          >
            {/* Close button */}
            <ClosePopup
              onClick={handleClose}
              className={`absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition 
                ${notificationState?.notification?.isTimer && "hidden"}`}
            />

            {/* Content */}
            <div className="flex flex-col items-center text-center px-6! py-8!">
             {/* {notificationState?.notification?.icon && (
                <div className="mb-6! flex justify-center">
                   
                  <IconUIComponent
                    icon={
                      notificationState?.notification?.icon ||
                      "ri-checkbox-circle-fill"
                    }
                    className="text-6xl text-primary"
                  />
                  
                </div> 
                
              )}*/}

              <TitleUIComponent
                type="h6"
                text={`${notificationState?.notification?.notificationText}`}
                className="text-gray-800 font-medium leading-snug"
              />
            </div>
          </div>
        </div>
      )}

      {notificationState?.notification?.notificationState && (
        <BackgroundBlur zIndex="z-[40]" isBackground={true} isVisible={true} />
      )}
    </>
  );
};
