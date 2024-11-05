/* eslint-disable no-useless-computed-key */
import React from 'react'
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { toDoListsReducer } from 'components/toDoList/model/todolistsSlice';
import { tasksReducer } from 'components/task/model/tasksSlice';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: toDoListsReducer
})

const initialGlobalState: any = {
    tasks: {
        ["todolistID1"]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false }
        ],
        ["todolistID2"]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "React Book", isDone: true }
        ]
    },
    todolists: [
        { id: "todolistID1", title: "What to learn", filter: "all" },
        { id: "todolistID2", title: "What to buy", filter: "all" }
    ],

};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
