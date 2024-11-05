// import { v1 } from 'uuid';
// import {
//     removeTodolist,
//     addTodolist,
//     changeTodolistTitle,
//     toDoListsReducer,
//     changeToDoListFilterAC,
//     ToDoListType,
// } from './todolists-reducer';

// let startState: ToDoListType[];

// let todolistID1: string;
// let todolistID2: string;

// beforeEach(() => {
//     todolistID1 = v1();
//     todolistID2 = v1();

//     startState = [
//         { id: todolistID1, title: 'What to learn', filter: 'all' },
//         { id: todolistID2, title: 'What to buy', filter: 'all' },
//     ];
// });

// test('correct todolist should be removed', () => {
//     const action = removeTodolist(todolistID1);

//     const endState = toDoListsReducer(startState, action);

//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistID2);
// });

// test('correct todolist should be added', () => {
//     const action = addTodolist('New Todolist');

//     const endState = toDoListsReducer(startState, action);
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(action.payload.title);
// });

// test('correct todolist should change its name', () => {
//     const action = changeTodolistTitle(todolistID2, 'New Todolist');

//     const endState = toDoListsReducer(startState, action);

//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe('New Todolist');
// });

// test('correct filter of todolist should be changed', () => {
//     const action = changeToDoListFilterAC(todolistID2, 'completed');

//     const endState = toDoListsReducer(startState, action);
//     expect(endState[0].filter).toBe('all');
//     expect(endState[1].filter).toBe(action.payload.filter);
// });
let a2 = 5;
export { a2 };
