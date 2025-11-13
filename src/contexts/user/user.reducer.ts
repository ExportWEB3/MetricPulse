import type { UserActionAttributes, UserInitialStateAttributes } from "../../utilities/typefiles";


export const UserReducer = (
  userState: UserInitialStateAttributes,
  action: UserActionAttributes
): UserInitialStateAttributes => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...userState,
        user: action.payload,
      };

    case "SET_TOKEN":
      return {
        ...userState,
        token: action.payload,
        isRefreshTokenResponseState: "yes",
      };
    case "LOG_OUT":
      return {
        ...userState,
        token: "",
        isRefreshTokenResponseState: "",
        user: null,
      };

    case "SET_REFRESH_TOKEN_RESPONSE":
      return {
        ...userState,
        isRefreshTokenResponseState: action.payload,
      };
    case "SET_GLOBALERROR":
      return {
        ...userState,
        globalError: action.payload,
      };
    case "CLEAR_GLOBALERROR":
      return {
        ...userState,
        globalError: { errorState: false, errorMessage: "" },
      };
    case "SET_SERVER_STATE_ON":
      return {
        ...userState,
        isServerAlive: true,
      };

    case "CLEAR_SERVER_STATE_OFF":
      return {
        ...userState,
        isServerAlive: false,
      };

    default:
      return userState;
  }
};
