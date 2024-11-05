import { ApiResponse } from "common/types";
import { setAppError, setAppStatus } from "features/app/appSlice";
import { Dispatch } from "redux";

export const handleServerAppError = <T>(data: ApiResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }));
  } else {
    dispatch(setAppError({ error: "Some error occurred" }));
  }
  dispatch(setAppStatus({ status: "failed" }));
};
