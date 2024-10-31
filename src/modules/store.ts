import { tasksReducer } from "./tasks-reducer";
import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { toDoListsReducer } from "./todolists-reducer";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import { thunk, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistedState = loadState();

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: toDoListsReducer,
});
export const store = legacy_createStore(rootReducer, persistedState, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
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

// @ts-ignore
window.store = store;
