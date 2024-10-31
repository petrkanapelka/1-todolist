import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { DomainTask, TasksStateType } from "../components/task/api/tasksApi.types";
import { Dispatch } from "redux";
import { tasksApi } from "components/task/api/tasksApi";
import { TaskPriority, TaskStatus } from "common/enums/enums";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type RemoveAllTaskActionType = ReturnType<typeof removeAllTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type ActionsType =
  | SetTasksActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | RemoveAllTaskActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      return { ...state, [action.todolistId]: action.tasks };
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.taskID),
      };
    }

    case "REMOVE-ALL-TASK": {
      return {
        ...state,
        [action.todolistID]: [],
      };
    }

    case "ADD-TASK": {
      const newTask: DomainTask = {
        title: action.title,
        todoListId: action.todolistID,
        startDate: "",
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        status: TaskStatus.New,
        addedDate: "",
        order: 0,
        id: v1(),
      };
      return {
        ...state,
        [action.todolistID]: [newTask, ...state[action.todolistID]],
      };
    }

    case "CHANGE-STATUS-TASK": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((t) =>
          t.id === action.taskID ? { ...t, isDone: action.isDone } : t,
        ),
      };
    }

    case "CHANGE-TITLE-TASK": {
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((t) =>
          t.id === action.taskID ? { ...t, title: action.title } : t,
        ),
      };
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.id]: [],
      };
    }

    case "REMOVE-TODOLIST": {
      const updatedTasks = { ...state };
      delete updatedTasks[action.payload.id];
      return updatedTasks;
    }

    default:
      return state;
  }
};

export const setTasksAC = (todolistId: string, tasks: DomainTask[]) => {
  return { type: "SET-TASKS", todolistId, tasks } as const;
};

export const removeTaskAC = (taskID: string, todolistID: string) => {
  return { type: "REMOVE-TASK", taskID, todolistID } as const;
};

export const removeAllTaskAC = (todolistID: string) => {
  return { type: "REMOVE-ALL-TASK", todolistID } as const;
};

export const addTaskAC = (title: string, todolistID: string) => {
  return { type: "ADD-TASK", title, todolistID } as const;
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
  return { type: "CHANGE-STATUS-TASK", taskID, isDone, todolistID } as const;
};

export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string) => {
  return { type: "CHANGE-TITLE-TASK", taskID, title, todolistID } as const;
};

export const fetchTasksThunkTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(todolistId, res.data.items));
    });
  };
};
