import { ApiResponse } from "common/types";
import { DomainTodolist, Todolist } from "./todolistsApi.types";
import { baseApi } from "app/baseApi";

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      },
      providesTags: ["Todolist"],
    }),
    addTodolist: build.mutation<ApiResponse<{ item: Todolist }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title },
        };
      },
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<ApiResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        };
      },
      invalidatesTags: ["Todolist"],
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
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;
