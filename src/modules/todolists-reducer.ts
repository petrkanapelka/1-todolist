import { v1 } from "uuid";
import { FilterStatusType, Todolist, ToDoListType } from "../components/toDoList/api/todolistsApi.types";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
    id: string;
  };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterStatusType;
  };
};

export type GetTodolistActionType = ReturnType<typeof setTodolistsAC>;

export type ActionsType =
  | GetTodolistActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const initialState: Todolist[] = [];

export const toDoListsReducer = (state = initialState, action: ActionsType): Todolist[] => {
  if (!Array.isArray(state)) {
    console.error("State is not an array:", state);
    state = [];
  }
  switch (action.type) {
    case "SET-TODOLISTS": {
      return [...action.todolists];
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      const { title, id } = action.payload;
      const newToDoList: Todolist = { id, title, addedDate: "", order: 0 };
      return [newToDoList, ...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      const { filter, id } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl));
    }

    case "CHANGE-TODOLIST-TITLE": {
      const { title, id } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl));
    }

    default:
      return state;
  }
};

export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", payload: { title, id: v1() } } as const;
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};

export const changeToDoListFilterAC = (id: string, filter: FilterStatusType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const;
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const;
};

export type { ToDoListType };
