
import { createContext, useEffect, useReducer, useRef } from "react";
import { UserReducer } from "./user.reducer";
import { AxiosError } from "axios";
import type { 
    reactChildrenNodeAttributes, 
    UserContextAttributes, 
    UserInitialStateAttributes 
} from "../../utilities/typefiles";
import { refreshFunc } from "../../utilities/helperfunction";
import { useServerCheck } from "../../components/hooks/useServerCheck.hooks";

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
  const { checkServerStatus } = useServerCheck();

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
    
    console.log('[UserContext] Starting server check...');
    const isServerAlive = await checkServerStatus(3);
    
    if (isServerAlive) {
      console.log('[UserContext] Server is alive');
      userDispatch({ type: "SET_SERVER_STATE_ON" });
    } else {
      console.log('[UserContext] Server is down');
      userDispatch({ type: "CLEAR_SERVER_STATE_OFF" });
    }
  };

  useEffect(() => {
    // Give the page a moment to load before checking server
    const timer = setTimeout(() => {
      console.log('[UserContext] Initializing checks...');
      refreshSWR();
      checkServer();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
