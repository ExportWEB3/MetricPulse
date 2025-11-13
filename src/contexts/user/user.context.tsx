
import { createContext, useEffect, useReducer, useRef } from "react";
import { UserReducer } from "./user.reducer";
import { AxiosError } from "axios";
import type { 
    reactChildrenNodeAttributes, 
    UserContextAttributes, 
    UserInitialStateAttributes 
} from "../../utilities/typefiles";
import { useHttpFetcher } from "../../components/hooks/custom.hooks";
import { refreshFunc } from "../../utilities/helperfunction";

const initialUserState: UserInitialStateAttributes = {
  user: null,
  token: "",
  isServerAlive: false,
  isRefreshTokenResponseState: "",
  globalError: { errorState: false, errorMessage: "" },
};

export const UserContext = createContext<UserContextAttributes>({
  userState: initialUserState,
  userDispatch: () => null,
});

export const UserProvider = ({ children }: reactChildrenNodeAttributes) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const serverChecked = useRef(false);
  const { fetchIt } = useHttpFetcher();

  const refreshSWR = async () => {
    try {
      const payload = await refreshFunc();

      if (payload?.token) {
        userDispatch({ type: "SET_USER", payload: payload?.user });
        userDispatch({ type: "SET_TOKEN", payload: payload?.token });
      } else {
        userDispatch({
          type: "SET_REFRESH_TOKEN_RESPONSE",
          payload: "yes",
        });
      }
    } catch (error) {
      userDispatch({ type: "LOG_OUT" });
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          userDispatch({
            type: "SET_REFRESH_TOKEN_RESPONSE",
            payload: "429",
          });
          return;
        }
      }

      userDispatch({ type: "SET_REFRESH_TOKEN_RESPONSE", payload: "yes" });
    }
  };

  const checkServer = async () => {
    if (serverChecked.current) return;
    serverChecked.current = true;
    try {
      await fetchIt({
        apiEndPoint: `serverstatus`,
        httpMethod: "get",
        isSuccessNotification: {
          notificationText: "",
          notificationState: false,
        },
      });
      userDispatch({ type: "SET_SERVER_STATE_ON" });
    } catch (error) {
      userDispatch({ type: "CLEAR_SERVER_STATE_OFF" });
    }
  };

  useEffect(() => {
    refreshSWR();
    checkServer();
  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
