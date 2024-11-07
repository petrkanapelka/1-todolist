import { combineReducers } from "redux";
import { saveState } from "./localStorage";
import { throttle } from "lodash";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "features/auth/model/authSlice";
import { appReducer, appSlice } from "features/app/appSlice";
import { toDoListsReducer, todolistsSlice } from "components/toDoList/model/todolistsSlice";
import { tasksReducer, tasksSlice } from "components/task/model/tasksSlice";
import { todolistsApi } from "components/toDoList/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [tasksSlice.name]: tasksReducer,
  [todolistsSlice.name]: toDoListsReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
  [todolistsApi.reducerPath]: todolistsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
});

setupListeners(store.dispatch);

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

store.subscribe(() => {
  saveState(store.getState());
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);
