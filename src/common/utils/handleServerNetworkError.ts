import { setAppError, setAppStatus } from "features/app/appSlice";
import { Dispatch } from "redux";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message }));
  dispatch(setAppStatus({ status: "failed" }));
};
