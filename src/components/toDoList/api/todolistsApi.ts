import { ApiResponse } from "common/types";
import { DomainTodolist, Todolist } from "./todolistsApi.types";
import { instance } from "common/instance";

export const todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>("todo-lists");
  },
  updateTodolist(payload: { title: string; id: string }) {
    const { title, id } = payload;
    return instance.put<ApiResponse>(`todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<ApiResponse<Todolist>>("todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ApiResponse>(`todo-lists/${id}`);
  },
};
