import { DomainTask, GetTasksResponse, UpdateTaskDomainModel } from "./tasksApi.types";
import { ApiResponse } from "../../../common/types/types";
import { baseApi } from "app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todoListId: string }>({
      query: ({ todoListId }) => `todo-lists/${todoListId}/tasks`,
      providesTags: ["Tasks", "Todolist"],
    }),
    addTask: build.mutation<ApiResponse<{ item: DomainTask }>, { title: string; todoListId: string }>({
      query: ({ title, todoListId }) => {
        return {
          url: `todo-lists/${todoListId}/tasks`,
          method: "POST",
          body: { title, todoListId },
        };
      },
      invalidatesTags: ["Tasks", "Todolist"],
    }),
    deleteTask: build.mutation<ApiResponse, { taskId: string; todoListId: string }>({
      query: ({ taskId, todoListId }) => {
        return {
          url: `todo-lists/${todoListId}/tasks/${taskId}`,
          method: "DELETE",
          body: { taskId, todoListId },
        };
      },
      invalidatesTags: ["Tasks", 'Todolist'],
    }),
    updateTask: build.mutation<ApiResponse<{ item: DomainTask }>, { model: UpdateTaskDomainModel; task: DomainTask }>({
      query: ({ model, task }) => {
        return {
          url: `todo-lists/${task.todoListId}/tasks/${task.id}`,
          method: "PUT",
          body: model,
        };
      },
      invalidatesTags: ["Tasks", "Todolist"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
