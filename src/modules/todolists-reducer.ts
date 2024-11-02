import { DomainTodolist, FilterStatusType, Todolist, todolistsApi } from "components/toDoList/api";
import { Dispatch } from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

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

const initialState: DomainTodolist[] = [];

export const toDoListsReducer = (state = initialState, action: ActionsType): DomainTodolist[] => {
  if (!Array.isArray(state)) {
    console.error("State is not an array:", state);
    state = [];
  }
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl }));
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      const { title, id, addedDate, order } = action.payload.todolist;
      const newToDoList: DomainTodolist = { id, title, addedDate, order, filter: "all" };
      debugger;
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

export const setTodolistsAC = (todolists: DomainTodolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const;
};

export const addTodolistAC = (todolist: Todolist) => {
  debugger
  return { type: "ADD-TODOLIST", payload: { todolist } } as const;
};

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};

export const changeToDoListFilterAC = (id: string, filter: FilterStatusType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const;
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const;
};

export const fetchTodolistsThunk = (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data));
  });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    debugger;
    dispatch(addTodolistAC(res.data.data.item));
  });
};
