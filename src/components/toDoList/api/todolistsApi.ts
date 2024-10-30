import axios from 'axios';
import { API_KEY, BEARER_TOKEN } from '../../../api-env';
import { ApiResponse, Todolist } from '../todolistsApi.types';

export const todolistsApi = {
    getTodolists() {
        return axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: BEARER_TOKEN,
            },
        });
    },
    updateTodolist(payload: { title: string; id: string }) {
        const { title, id } = payload;
        return axios.put<ApiResponse<Todolist>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            { title },
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },
    createTodolist(title: string) {
        return axios.post<ApiResponse<Todolist>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title },
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },
    deleteTodolist(id: string) {
        return axios.delete<ApiResponse<Todolist>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
            headers: {
                Authorization: BEARER_TOKEN,
                'API-KEY': API_KEY,
            },
        });
    },
};
