// import { tasksReducer, TasksStateType } from "./tasks-reducer";
// import { addTodolistAC, removeTodolistAC, toDoListsReducer } from "./todolists-reducer";
// import { ToDoListPropsType } from "../components/toDoList/ToDoList";

// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {};
//   const startTodolistsState: Array<ToDoListPropsType> = [];

//   const action = addTodolistAC("new todolist");

//   const endTasksState = tasksReducer(startTasksState, action);
//   const endTodolistsState = toDoListsReducer(startTodolistsState, action);

//   const keys = Object.keys(endTasksState);
//   const idFromTasks = keys[0];
//   const idFromTodolists = endTodolistsState[0].id;

//   expect(idFromTasks).toBe(action.payload.id);
//   expect(idFromTodolists).toBe(action.payload.id);
// });

// test("property with todoListId should be deleted", () => {
//   const startState: TasksStateType = {
//     todolistID1: [
//       { id: "1", title: "CSS", isDone: false },
//       { id: "2", title: "JS", isDone: true },
//       { id: "3", title: "React", isDone: false },
//     ],
//     todolistID2: [
//       { id: "1", title: "bread", isDone: false },
//       { id: "2", title: "milk", isDone: true },
//       { id: "3", title: "tea", isDone: false },
//     ],
//   };

//   const action = removeTodolistAC("todolistID2");

//   const endState = tasksReducer(startState, action);

//   const keys = Object.keys(endState);

//   expect(keys.length).toBe(1);
//   expect(endState["todolistID2"]).not.toBeDefined();
// });
let a3 = 5;
export { a3 };
