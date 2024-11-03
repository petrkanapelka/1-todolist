import { ApiResponse } from "common/types";
import { setAppErrorAC, setAppStatusAC } from "modules/app-reducer";
import { Dispatch } from "redux";

export const handleServerAppError = <T>(data: ApiResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occurred"));
  }
  dispatch(setAppStatusAC("failed"));
};
