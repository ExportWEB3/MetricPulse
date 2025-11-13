import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { axiosBase } from "../../utilities/baseURL";
import { refreshFunc } from "../../utilities/helperfunction";

const useAxiosPrivate = () => {
  const { userDispatch: dispatch, userState: state } = useContext(UserContext);

  useEffect(() => {
    const responseIntercept = axiosBase.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          try {
            const response = await refreshFunc();

            dispatch({
              type: "SET_TOKEN",
              payload: response?.token as string,
            });
            prevRequest.headers["authorization"] = `Bearer ${response?.token}`;

            return axiosBase(prevRequest);
          } catch (error) {
            dispatch({
              type: "LOG_OUT",
            });
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosBase.interceptors.response.eject(responseIntercept);
    };
  }, [state?.token]);

  return axiosBase;
};

export default useAxiosPrivate;
