import { v1 } from 'uuid';
import { FilterStatusType, ToDoListType } from '../AppWithRedux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    payload: {
        id: string;
    };
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    payload: {
        title: string;
        id: string;
    };
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    payload: {
        id: string;
        title: string;
    };
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    payload: {
        id: string;
        filter: FilterStatusType;
    };
};

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

const initialState: ToDoListType[] = [];

export const toDoListsReducer = (state = initialState, action: ActionsType): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.payload.id);
        }

        case 'ADD-TODOLIST': {
            const { title, id } = action.payload;
            const newToDoList: ToDoListType = { id, title, filter: 'all' };
            return [newToDoList, ...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const { filter, id } = action.payload;
            return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl));
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const { title, id } = action.payload;
            return state.map((tl) => (tl.id === id ? { ...tl, title } : tl));
        }

        default:
            return state;
    }
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { title, id: v1() } } as const;
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', payload: { id } } as const;
};

export const changeToDoListFilterAC = (
    id: string,
    filter: FilterStatusType
): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id, filter } } as const;
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id, title } } as const;
};

export type { ToDoListType };
