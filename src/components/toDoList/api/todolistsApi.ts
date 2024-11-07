import { ApiResponse } from "common/types";
import { DomainTodolist, Todolist } from "./todolistsApi.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", `${process.env.REACT_APP_API_KEY}`);
      headers.set("Authorization", `Bearer ${localStorage.getItem("sn-token")}`);
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      },
    }),
    addTodolist: build.mutation<ApiResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title },
        };
      },
    }),
    removeTodolist: build.mutation<ApiResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        };
      },
    }),
    updateTodolistTitle: build.mutation<ApiResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          method: "PUT",
          url: `todo-lists/${id}`,
          body: {
            title,
          },
        };
      },
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;
