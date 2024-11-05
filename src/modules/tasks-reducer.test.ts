// import {
//     addTask,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTask,
//     tasksReducer,
//     TasksStateType,
// } from './tasks-reducer';
// import { addTodolist } from './todolists-reducer';

// let startState: TasksStateType;

// beforeEach(() => {
//     startState = {
//         todolistID1: [
//             { id: '1', title: 'CSS', isDone: false },
//             { id: '2', title: 'JS', isDone: true },
//             { id: '3', title: 'React', isDone: false },
//         ],
//         todolistID2: [
//             { id: '1', title: 'bread', isDone: false },
//             { id: '2', title: 'milk', isDone: true },
//             { id: '3', title: 'tea', isDone: false },
//         ],
//     };
// });

// test('correct task should be deleted from correct array', () => {
//     const action = removeTask('2', 'todolistID2');

//     const endState = tasksReducer(startState, action);

//     expect(endState).toEqual({
//         todolistID1: [
//             { id: '1', title: 'CSS', isDone: false },
//             { id: '2', title: 'JS', isDone: true },
//             { id: '3', title: 'React', isDone: false },
//         ],
//         todolistID2: [
//             { id: '1', title: 'bread', isDone: false },
//             { id: '3', title: 'tea', isDone: false },
//         ],
//     });
// });

// test('correct task should be added to correct array', () => {
//     const action = addTask('juice', 'todolistID2');

//     const endState = tasksReducer(startState, action);

//     expect(endState['todolistID1'].length).toBe(3);
//     expect(endState['todolistID2'].length).toBe(4);
//     expect(endState['todolistID2'][0].id).toBeDefined();
//     expect(endState['todolistID2'][0].title).toBe('juice');
//     expect(endState['todolistID2'][0].isDone).toBe(false);
// });

// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusAC('2', false, 'todolistID2');

//     const endState = tasksReducer(startState, action);

//     expect(endState['todolistID1'][1].isDone).toBe(true);
//     expect(endState['todolistID2'][1].isDone).toBe(false);
// });

// test('title of specified task should be changed', () => {
//     const action = changeTaskTitleAC('2', 'beer', 'todolistID2');

//     const endState = tasksReducer(startState, action);

//     expect(endState['todolistID1'][1].title).toBe('JS');
//     expect(endState['todolistID2'][1].title).toBe('beer');
// });

// test('new array should be added when new todolist is added', () => {
//     const action = addTodolist('new todolist');

//     const endState = tasksReducer(startState, action);

//     const keys = Object.keys(endState);
//     const newKey = keys.find((k) => k !== 'todolistID1' && k !== 'todolistID2');
//     if (!newKey) {
//         throw Error('new key should be added');
//     }

//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
let a = 5;
export { a };
