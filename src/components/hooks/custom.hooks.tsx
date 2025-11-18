import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AxiosError } from "axios";
import { UserContext } from "../../contexts/user/user.context";
import { settingContext } from "../../contexts/settings/settings.context";
import type { clientResponse, globalHTTPReqFuncAttributes, isNotificationPopAttributes, SWRPropsAttributes } from "../../utilities/typefiles";
import { NotificationContext } from "../../contexts/notification/notification.context";
import useAxiosPrivate from "./useAxios.hooks";

export const useFetcher = (props: {
  cacheKey: string | null;
  request: any;
  revalidateOnFocus?: boolean;
  shouldRetryOnError?: boolean;
}) => {
  const { cacheKey, request, revalidateOnFocus, shouldRetryOnError } = props;
  const {
    data: fetchData,
    error: fetchError,
    isLoading: fetchIsLoading,
    mutate,
  } = useSWR(cacheKey, request, {
    revalidateOnFocus: revalidateOnFocus || false,
    shouldRetryOnError: shouldRetryOnError || false,
  });

  return {
    fetchData,
    fetchError,
    fetchIsLoading,
    mutate,
  };
};

//This hook is for pagination management and can be used anywhere
export const customPageHook = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const handlePage = (pageNum: number) => {
    setPageNumber(pageNum);
  };

  return { handlePage, pageNumber };
};

export const useStateHook = () => {
  const [customUseState, setCustomUseState] = useState<boolean>(false);

  const setTrueFunc = () => {
    setCustomUseState(true);
  };

  const setFalseFunc = () => {
    setCustomUseState(false);
  };

  return {
    customUseState,
    setTrueFunc,
    setFalseFunc,
  };
};

export const useURLParams = () => {
  const location = useLocation();

  return location?.pathname;
};

//an exmaple of react custom hook that should satrt with use key word
export const useNotificationHook = () => {
  const { notificationDispatch: dispatch } = useContext(NotificationContext);
  const notify = (params: isNotificationPopAttributes) => {
    const {
      isTimer,
      timer,
      notificationState,
      notificationText,
      bgColour,
      textColour,
      isNavigation,
      isURL,
      URL,
      isRevalidate,
      isRevaliddateURL,
      showCancelButton,
      statusCode,
      event,
      icon,
    } = params;

    dispatch({
      type: "SET_NOTIFICATION",
      payload: {
        notificationText,
        URL,
        isTimer,
        timer,
        isNavigation,
        notificationState,
        bgColour,
        textColour,
        isURL,
        isRevalidate,
        isRevaliddateURL,
        showCancelButton,
        statusCode,
        event,
        icon,
      },
    });
  };

  return {
    notify,
  };
};

export const useHttpFetcher = () => {
  const { userState: state, userDispatch: dispatch } = useContext(UserContext);
  const { settingDispatch } = useContext(settingContext);

  const tokenRef = useRef(state?.token);

  useEffect(() => {
    tokenRef.current = state?.token;
  }, [state?.token]);

  const { notify } = useNotificationHook();
  const axiosPrivate = useAxiosPrivate();

  const fetchIt = async (
    params: globalHTTPReqFuncAttributes
  ): Promise<clientResponse> => {
    const {
      apiEndPoint,
      httpMethod,
      reqData,
      isSuccessNotification,
      timerDuration,
      contypeType,
      responseType,
      buttonLoadingSetter,
    } = params;
    settingDispatch({ type: "SET_ISLOADING_STARTS" });
    buttonLoadingSetter?.(true);
    
    try {
      // Check if reqData is FormData (for file uploads)
      const isFormData = reqData instanceof FormData;
      
      const config: any = {
        method: httpMethod,
        url: `/${apiEndPoint}`,
        data: reqData,
        withCredentials: true,
        responseType: responseType,
      };

      // Set headers
      config.headers = {
        authorization: `Bearer ${tokenRef.current}`,
      };
      
      // Only set Content-Type for non-FormData requests
      if (!isFormData && contypeType !== "multipart/form-data") {
        config.headers["Content-Type"] = contypeType ? contypeType : "application/json";
      }

      const res = await axiosPrivate(config);

      // Always show response message as toast (globally)
      const successMessage = 
        res?.data?.message || 
        isSuccessNotification?.notificationText || 
        "Success";
      
      notify({
        notificationText: successMessage,
        isURL: isSuccessNotification?.isURL || false,
        URL: isSuccessNotification?.URL || "",
        isTimer: isSuccessNotification?.isTimer !== false,
        timer: timerDuration ? timerDuration : "3000",
        bgColour: isSuccessNotification?.bgColour,
        isNavigation: isSuccessNotification?.isNavigation || false,
        isRevalidate: isSuccessNotification?.isRevalidate || false,
        isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
        notificationState: true,
      });
      
      settingDispatch({ type: "SET_ISLOADING_ENDS" });
      buttonLoadingSetter?.(false);
      return res?.data as clientResponse;
    } catch (error) {
      settingDispatch({ type: "SET_ISLOADING_ENDS" });
      buttonLoadingSetter?.(false);
      const baseNotifyPayload = {
        isURL: false,
        URL: ``,
        isTimer: true,
        isNavigation: false,
        timer: timerDuration ?? "3000",
        isRevalidate: isSuccessNotification?.isRevalidate,
        isRevaliddateURL: isSuccessNotification?.isRevaliddateURL,
      };

      if (error instanceof AxiosError) {
        const message =
          typeof error?.response?.data?.message === "string"
            ? error?.response?.data?.message
            : typeof error?.response?.data?.error === "string"
            ? error?.response?.data?.error
            : error?.message || "Something went wrong, refresh browser or contact support";

        // Always show error toast globally
        notify({
          ...baseNotifyPayload,
          notificationText: message,
        });

        if (error?.response?.status === 429) {
          dispatch({ type: "LOG_OUT" });
          dispatch({ type: "SET_REFRESH_TOKEN_RESPONSE", payload: "429" });
        }
        throw error;
      } else {
        // Show generic error toast
        notify({
          ...baseNotifyPayload,
          notificationText: "Something went wrong. Please try again.",
        });
        throw error;
      }
    }
  };

  return {
    fetchIt,
  };
};

//This hook is for drop down toggling
export const customToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = (customstate: boolean) => {
    setToggle(customstate);
  };

  return { toggle, handleToggle };
};

export const useSWRHook = (props: SWRPropsAttributes) => {
  const {
    cacheKey,
    apiEndPoint,
    isConditional,
    conditionalStatement,
    httpMethod,
    payload,
    shouldRetryOnError,
    revalidateOnFocus,
  } = props;

  const { fetchIt } = useHttpFetcher();

  const getData = async (): Promise<clientResponse> => {
    const response = await fetchIt({
      apiEndPoint: `${apiEndPoint}`,
      httpMethod: httpMethod ?? "get",
      reqData: payload,
      isSuccessNotification: {
        notificationState: false,
        notificationText: "",
      },
    });

    return response;
  };

  const {
    data: fetchData,
    error: fetchError,
    isLoading: fetchIsLoading,
    mutate,
  } = useSWR<clientResponse>(
    isConditional ? (conditionalStatement ? cacheKey : null) : cacheKey,
    getData,
    {
      revalidateOnFocus: revalidateOnFocus || false,
      shouldRetryOnError: shouldRetryOnError || false,
    }
  );

  return {
    fetchData,
    fetchError,
    fetchIsLoading,
    mutate,
  };
};

export const useArrayList = <T extends string | number = string>() => {
  const [arrayList, setArrayList] = useState<T[]>([]);

  const addItem = (item: T | T[]) => {
    setArrayList((prev) => [...prev, ...(Array.isArray(item) ? item : [item])]);
  };

  const removeItem = (selected: T | T[]) => {
    setArrayList((prev) =>
      prev.filter((item) =>
        Array.isArray(selected) ? !selected.includes(item) : item !== selected
      )
    );
  };

  return {
    arrayList,
    addItem,
    removeItem,
  };
};

export const useCustomQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigate with query string
  const generateQuery = (props: {
    path: string;
    query?: Record<string, string>;
    newTab?: boolean;
  }) => {
    const { path, query, newTab } = props;

    if (!path) {
      console.warn("Path is required for navigation.");
      return;
    }

    const search = query ? `?${new URLSearchParams(query).toString()}` : "";
    const fullUrl = `${path}${search}`;

    if (newTab) {
      // open in a new tab
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    } else {
      // default react-router navigation
      navigate({
        pathname: path,
        search,
      });
    }
  };

  // Get value of a specific query param
  const getQueryValue = (key: string): string | null => {
    const params = new URLSearchParams(location.search);
    return params.get(key);
  };

  return {
    generateQuery,
    getQueryValue,
  };
};

export const useSearchTerms = () => {
  const [dropDownFilterTerms, setDropDownFilterTerms] = useState<string>("");
  const [textSearchTerms, setTextSearchTerms] = useState<string>("");

  return {
    dropDownFilterTerms,
    setDropDownFilterTerms,
    textSearchTerms,
    setTextSearchTerms,
  };
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Only run on the client
    if (typeof window === "undefined") return;

    const matchMedia = window.matchMedia(query);

    const handleChange = () => setMatches(matchMedia.matches);

    // Set initial value
    handleChange();

    // Listen for changes
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);


  return matches;
}

export const useLogout = () => {
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  const { fetchIt } = useHttpFetcher();
  const { notify } = useNotificationHook();

  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear refresh token on backend
      await fetchIt({
        apiEndPoint: "logout",
        httpMethod: 'post',
        reqData: {},
        isSuccessNotification: {
          notificationState: false,
          notificationText: ""
        },
      });

      // Show success notification
      notify({
        notificationText: "Logged out successfully!",
        isURL: false,
        URL: "",
        isTimer: true,
        timer: "2000",
        bgColour: "bg-green-500",
        isNavigation: true,
        isRevalidate: false,
        notificationState: true,
        icon: "ri-logout-box-line"
      });

      // Clear user state from context (this clears token and user)
      userDispatch({ type: "LOG_OUT" });

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2100);
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear the local state
      userDispatch({ type: "LOG_OUT" });
      navigate("/login");
    }
  };

  return { handleLogout };
};



