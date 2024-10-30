import axios from 'axios';
import { BEARER_TOKEN, API_KEY } from '../../../api-env';
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '../tasksApi.types';
import { ApiResponse, Todolist } from '../../toDoList/todolistsApi.types';
import { title } from 'process';
import { update } from 'lodash';

export const tasksApi = {
    getTasks(todolistId: string) {
        return axios.get<GetTasksResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },
    createTask(payload: { title: string; todolistId: string }) {
        const { title, todolistId } = payload;
        return axios.post<ApiResponse<DomainTask>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            { title },
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },

    deleteTask(payload: { taskId: string; todolistId: string }) {
        const { taskId, todolistId } = payload;
        return axios.delete<ApiResponse<DomainTask>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },

    updateTask(payload: { model: UpdateTaskModel; task: DomainTask }) {
        const { model, task } = payload;
        return axios.put<ApiResponse<DomainTask>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            }
        );
    },
};
