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

export const todolistsReducer = (
  state: ToDoListType[] = initialState,
  action: ActionsType
): ToDoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.payload.id);
    }
    case 'ADD-TODOLIST': {
      return state;
    }
    default:
      throw new Error("I don't understand this type");
  }
};
