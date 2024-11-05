import { DomainTodolist, FilterStatusType, Todolist, todolistsApi } from "components/toDoList/api";
import { Dispatch } from "redux";
import { ResultCode } from "common/enums/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { RequestStatus, setAppStatus } from "features/app/appSlice";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;

export type ChangeTodolistFilterActionType = ReturnType<typeof changeToDoListFilterAC>;

export type GetTodolistActionType = ReturnType<typeof setTodolistsAC>;

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>;

export type ActionsType =
  | GetTodolistActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistEntityStatusType;

const initialState: DomainTodolist[] = [];

export const toDoListsReducer = (state = initialState, action: ActionsType): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({ ...tl }));
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }

    case "ADD-TODOLIST": {
      const { title, id, addedDate, order } = action.payload.todolist;
      const newToDoList: DomainTodolist = { id, title, addedDate, order, filter: "all", entityStatus: "idle" };
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

    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      const { entityStatus, id } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, entityStatus } : tl));
    }

    default:
      return state;
  }
};

export const setTodolistsAC = (todolists: DomainTodolist[]) => {
  return { type: "SET-TODOLISTS", todolists } as const;
};

export const addTodolistAC = (todolist: Todolist) => {
  return { type: "ADD-TODOLIST", payload: { todolist } } as const;
};

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const;
};

export const changeToDoListFilterAC = (id: string, filter: FilterStatusType) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload: { id, filter } } as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload: { id, title } } as const;
};

export const changeTodolistEntityStatusAC = (payload: { id: string; entityStatus: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const;
};

//!   Thunks
export const fetchTodolistsThunk = (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatus({ status: "succeeded" }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatusAC({ id: res.data.data.item.id, entityStatus: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }));
  todolistsApi
    .deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodolistAC(id));
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTodolistTC = (title: string, id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }));
  todolistsApi
    .updateTodolist({ title, id })
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(changeTodolistTitleAC(id, title));
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
