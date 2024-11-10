import { DomainTask, GetTasksResponse, UpdateTaskDomainModel } from "./tasksApi.types";
import { ApiResponse } from "../../../common/types/types";
import { baseApi } from "app/baseApi";

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todoListId: string; args: { count: number; page: number } }>({
      query: ({ todoListId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          url: `todo-lists/${todoListId}/tasks`,
          params,
        };
      },
      providesTags: (res, err, { todoListId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Tasks", id }) as const), { type: "Tasks", id: todoListId }]
          : ["Tasks"],
    }),
    addTask: build.mutation<ApiResponse<{ item: DomainTask }>, { title: string; todoListId: string }>({
      query: ({ title, todoListId }) => {
        return {
          url: `todo-lists/${todoListId}/tasks`,
          method: "POST",
          body: { title, todoListId },
        };
      },
      invalidatesTags: (res, err, { todoListId }) => [{ type: "Tasks", id: todoListId }],
    }),
    deleteTask: build.mutation<ApiResponse, { taskId: string; todoListId: string }>({
      query: ({ taskId, todoListId }) => {
        return {
          url: `todo-lists/${todoListId}/tasks/${taskId}`,
          method: "DELETE",
          body: { taskId, todoListId },
        };
      },
      invalidatesTags: (res, err, { taskId }) => [{ type: "Tasks", id: taskId }],
    }),
    updateTask: build.mutation<ApiResponse<{ item: DomainTask }>, { model: UpdateTaskDomainModel; task: DomainTask }>({
      query: ({ model, task }) => {
        return {
          url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
          method: "PUT",
          body: model,
        };
      },
      invalidatesTags: (res, err, { task }) => [{ type: "Tasks", id: task.id }],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
