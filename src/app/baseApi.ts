import { handleError } from "./../common/utils/handleError";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    const result: any = await fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
        headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`);
        return headers;
      },
    })(args, api, extraOptions);

    handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
  tagTypes: ["Todolist", "Tasks"],
  refetchOnFocus: false,
  refetchOnReconnect: true,
});
