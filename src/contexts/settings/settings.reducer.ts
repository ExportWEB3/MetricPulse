import type { settingActionAttributes, settingInitialStateAttributes } from "../../utilities/typefiles";


export const SettingReducer = (
  settingsState: settingInitialStateAttributes,
  action: settingActionAttributes
): settingInitialStateAttributes => {
  switch (action.type) {
    case "SET_TOGGLE_SIDEBAR":
      return {
        ...settingsState,
        isSideBar: !settingsState?.isSideBar,
      };
    case "SET_THEME":
      return {
        ...settingsState,
        isTheme: action.payload,
      };
    case "SET_ISLOADING_STARTS":
      return {
        ...settingsState,
        isLoading: true,
      };

    case "SET_ISLOADING_ENDS":
      return {
        ...settingsState,
        isLoading: false,
      };

    default:
      return settingsState;
  }
};
