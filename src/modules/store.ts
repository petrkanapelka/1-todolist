import { tasksReducer } from './tasks-reducer';
import { combineReducers, legacy_createStore } from 'redux';
import { toDoListsReducer } from './todolists-reducer';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

const persistedState = loadState();

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer,
});
export const store = legacy_createStore(rootReducer, persistedState);
export type AppRootStateType = ReturnType<typeof rootReducer>;

store.subscribe(() => {
    saveState(store.getState());
});

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

// @ts-ignore
window.store = store;
