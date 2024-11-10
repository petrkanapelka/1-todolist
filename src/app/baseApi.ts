import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAppError } from "features/app/appSlice";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result: any = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`);
      },
    })(args, api, extraOptions);

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
          error = result.error.data.message;
          break;

        default:
          error = JSON.stringify(result.error);
          break;
      }
      api.dispatch(setAppError({ error }));
    }
    return result;
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Tasks"],
});
