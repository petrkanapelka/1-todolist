import { v1 } from 'uuid';
import { TaskType } from '../components/toDoList/ToDoList';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../AppWithRedux';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type RemoveAllTaskActionType = ReturnType<typeof removeAllTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | RemoveAllTaskActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.taskID),
            };
        }

        case 'REMOVE-ALL-TASK': {
            return {
                ...state,
                [action.todolistID]: [],
            };
        }

        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            };
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]],
            };
        }

        case 'CHANGE-STATUS-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((t) =>
                    t.id === action.taskID ? { ...t, isDone: action.isDone } : t
                ),
            };
        }

        case 'CHANGE-TITLE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((t) =>
                    t.id === action.taskID ? { ...t, title: action.title } : t
                ),
            };
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: [],
            };
        }

        case 'REMOVE-TODOLIST': {
            const updatedTasks = { ...state };
            delete updatedTasks[action.payload.id];
            return updatedTasks;
        }

        default:
            return state;
    }
};

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return { type: 'REMOVE-TASK', taskID, todolistID } as const;
};

export const removeAllTaskAC = (todolistID: string) => {
    return { type: 'REMOVE-ALL-TASK', todolistID } as const;
};

export const addTaskAC = (title: string, todolistID: string) => {
    return { type: 'ADD-TASK', title, todolistID } as const;
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
    return { type: 'CHANGE-STATUS-TASK', taskID, isDone, todolistID } as const;
};

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
    return { type: 'CHANGE-TITLE-TASK', taskID, title, todolistID } as const;
};
export type { TasksStateType };
