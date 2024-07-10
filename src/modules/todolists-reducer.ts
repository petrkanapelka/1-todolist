import { v1 } from 'uuid';
import { FilterStatusType, ToDoListType } from '../App';

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

let toDoList1ID = v1();
let toDoList2ID = v1();

const toDoList1: ToDoListType = {
    id: toDoList1ID,
    title: `What to learn?`,
    filter: 'all',
};

const toDoList2: ToDoListType = {
    id: toDoList2ID,
    title: `What to buy?`,
    filter: 'all',
};

const initialState: ToDoListType[] = [toDoList1, toDoList2];

export const toDoListsReducer = (
    state: ToDoListType[] = initialState,
    action: ActionsType
): ToDoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.payload.id);
        }

        case 'ADD-TODOLIST': {
            const { title, id } = action.payload;
            return [{ id, title, filter: 'all' }, ...state];
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

export const addTodolistAC = (title: string, id: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', payload: { title, id } } as const;
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
