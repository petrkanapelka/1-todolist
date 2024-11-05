import { createSlice } from "@reduxjs/toolkit";
import { DomainTodolist, Todolist } from "../api";
import { RequestStatus } from "features/app/appSlice";

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== 1) {
        state.splice(index, 1);
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" });
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index !== -1) {
        state[index].title = action.payload.title;
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) {
        todolist.entityStatus = action.payload.entityStatus;
      }
    }),
    setTodolists: create.reducer<{ todolists: Todolist[] }>((state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
    }),
    clearTodolists: create.reducer(() => {
      return [];
    }),
  }),
});

export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistTitle,
  setTodolists,
  clearTodolists,
} = todolistsSlice.actions;

export const toDoListsReducer = todolistsSlice.reducer;
