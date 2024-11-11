import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/react";
import { ResultCode } from "common/enums/enums";
import { setAppError } from "features/app/appSlice";

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred";

  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error;
        break;

      case 403:
        error = "403 Forbidden Error. Check API-KEY";
        break;

      case 400:
        error = (result.error.data as { message: string })?.message || error;
        break;

      case 500:
        error = "Internal Server Error. Please try again later or contact support.";
        break;

      default:
        error = JSON.stringify(result.error);
        break;
    }
    api.dispatch(setAppError({ error }));
  }

  const resultData = result.data as { resultCode?: ResultCode; messages?: string[] };
  if (resultData?.resultCode === ResultCode.Error) {
    const messages = resultData.messages || [];
    error = messages.length ? messages[0] : error;
    api.dispatch(setAppError({ error }));
  }
};
