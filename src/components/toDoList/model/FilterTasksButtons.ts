import { FilterStatusType } from "./../api/todolistsApi.types";
import { todolistsApi } from "../api";

export const changeFilterTasksHandler = (filter: FilterStatusType, todoListId: string) =>
  todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
    const index = state.findIndex((tl) => tl.id === todoListId);
    if (index !== -1) {
      state[index].filter = filter;
    }
  });
