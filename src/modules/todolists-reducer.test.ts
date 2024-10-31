// import { v1 } from 'uuid';
// import {
//     removeTodolistAC,
//     addTodolistAC,
//     changeTodolistTitleAC,
//     toDoListsReducer,
//     changeToDoListFilterAC,
//     ToDoListType,
// } from './todolists-reducer';

// let startState: ToDoListType[];

// let toDoListId1: string;
// let todolistId2: string;

// beforeEach(() => {
//     toDoListId1 = v1();
//     todolistId2 = v1();

//     startState = [
//         { id: toDoListId1, title: 'What to learn', filter: 'all' },
//         { id: todolistId2, title: 'What to buy', filter: 'all' },
//     ];
// });

// test('correct todolist should be removed', () => {
//     const action = removeTodolistAC(toDoListId1);

//     const endState = toDoListsReducer(startState, action);

//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });

// test('correct todolist should be added', () => {
//     const action = addTodolistAC('New Todolist');

//     const endState = toDoListsReducer(startState, action);
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(action.payload.title);
// });

// test('correct todolist should change its name', () => {
//     const action = changeTodolistTitleAC(todolistId2, 'New Todolist');

//     const endState = toDoListsReducer(startState, action);

//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe('New Todolist');
// });

// test('correct filter of todolist should be changed', () => {
//     const action = changeToDoListFilterAC(todolistId2, 'completed');

//     const endState = toDoListsReducer(startState, action);
//     expect(endState[0].filter).toBe('all');
//     expect(endState[1].filter).toBe(action.payload.filter);
// });
let a2 = 5;
export { a2 };
