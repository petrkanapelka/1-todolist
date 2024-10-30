import { DomainTask, GetTasksResponse, UpdateTaskModel } from '../tasksApi.types';
import { instance } from '../../../common/instance/instance';
import { ApiResponse } from '../../../common/types/types';

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    createTask(payload: { title: string; todolistId: string }) {
        const { title, todolistId } = payload;
        return instance.post<ApiResponse<DomainTask>>(`todo-lists/${todolistId}/tasks`, { title });
    },

    deleteTask(payload: { taskId: string; todolistId: string }) {
        const { taskId, todolistId } = payload;
        return instance.delete<ApiResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },

    updateTask(payload: { model: UpdateTaskModel; task: DomainTask }) {
        const { model, task } = payload;
        return instance.put<ApiResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model);
    },
};
