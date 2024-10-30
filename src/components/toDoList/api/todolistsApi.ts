import { instance } from '../../../common/instance/instance';
import { ApiResponse, Todolist } from '../todolistsApi.types';

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('todo-lists');
    },
    updateTodolist(payload: { title: string; id: string }) {
        const { title, id } = payload;
        return instance.put<ApiResponse<Todolist>>(`todo-lists/${id}`, { title });
    },
    createTodolist(title: string) {
        return instance.post<ApiResponse<Todolist>>('todo-lists', { title });
    },
    deleteTodolist(id: string) {
        return instance.delete<ApiResponse<Todolist>>(`todo-lists/${id}`);
    },
};
