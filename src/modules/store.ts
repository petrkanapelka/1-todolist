import { combineReducers, UnknownAction } from "redux";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features/auth/model/authSlice";
import { appReducer } from "features/app/appSlice";
import { toDoListsReducer } from "components/toDoList/model/todolistsSlice";
import { tasksReducer } from "components/task/model/tasksSlice";

const persistedState = loadState();

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: toDoListsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
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
