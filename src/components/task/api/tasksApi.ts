import { DomainTask, GetTasksResponse, UpdateTaskDomainModel, UpdateTaskModel } from "./tasksApi.types";
import { ApiResponse } from "../../../common/types/types";
import { instance } from "common/instance";

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
  },
  createTask(payload: { title: string; todoListId: string }) {
    const { title, todoListId } = payload;
    return instance.post<ApiResponse<DomainTask>>(`todo-lists/${todoListId}/tasks`, { title });
  },

  deleteTask(payload: { taskId: string; todoListId: string }) {
    const { taskId, todoListId } = payload;
    return instance.delete<ApiResponse>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },

  updateTask(payload: { model: UpdateTaskDomainModel; task: DomainTask }) {
    const { model, task } = payload;
    return instance.put<ApiResponse<DomainTask>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model);
  },
};
