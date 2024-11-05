import { ResultCode } from "common/enums/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { setAppStatusAC } from "modules/app-reducer";
import { authApi } from "../api/authApi";
import { LoginArgs } from "../api/authApi.types";
import { setIsInitialized, setIsLoggedIn } from "./authSlice";
import { Dispatch } from "redux";

export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setAppStatusAC("succeeded"));
        localStorage.setItem("sn-token", res.data.data.token);
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        localStorage.removeItem("sn-token");
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  dispatch(setIsInitialized({ isInitialized: false }));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }));
    });
};
