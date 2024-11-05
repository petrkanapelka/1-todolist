import { createSlice } from "@reduxjs/toolkit";
import { DomainTask, TasksStateType, UpdateTaskDomainModel } from "../api";
import { addTodolist, removeTodolist } from "components/toDoList/model/todolistsSlice";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todoListId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todoListId] = action.payload.tasks;
    }),
    removeTask: create.reducer<{ taskId: string; todoListId: string }>((state, action) => {
      const tasks = state[action.payload.todoListId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks.splice(index, 1);
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{
      taskId: string;
      todolistId: string;
      domainModel: UpdateTaskDomainModel;
    }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      }
    }),
    clearTasks: create.reducer(() => {
      return {};
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const { setTasks, removeTask, addTask, updateTask, clearTasks } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
