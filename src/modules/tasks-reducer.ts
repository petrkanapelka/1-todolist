import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { DomainTask, TasksStateType, UpdateTaskDomainModel } from "../components/task/api/tasksApi.types";
import { Dispatch } from "redux";
import { tasksApi } from "components/task/api/tasksApi";
import { TaskStatus } from "common/enums/enums";
import { AppRootStateType } from "./store";
import { setAppErrorAC, setAppStatusAC } from "./app-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

export type RemoveAllTaskActionType = ReturnType<typeof removeAllTaskAC>;

export type AddTaskActionType = ReturnType<typeof addTaskAC>;

export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type ActionsType =
  | SetTasksActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | RemoveAllTaskActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      return { ...state, [action.todoListId]: action.tasks };
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter((t) => t.id !== action.taskId),
      };
    }

    case "REMOVE-ALL-TASK": {
      return {
        ...state,
        [action.todoListId]: [],
      };
    }

    case "ADD-TASK": {
      const newTask = action.payload.task;
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.task.todoListId]: state[action.task.todoListId].map((t) =>
          t.id === action.task.id ? { ...action.task } : t,
        ),
      };
    }

    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: [],
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

export const setTasksAC = (todoListId: string, tasks: DomainTask[]) => {
  return { type: "SET-TASKS", todoListId, tasks } as const;
};

export const removeTaskAC = (taskId: string, todoListId: string) => {
  return { type: "REMOVE-TASK", taskId, todoListId } as const;
};

export const removeAllTaskAC = (todoListId: string) => {
  return { type: "REMOVE-ALL-TASK", todoListId } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return { type: "ADD-TASK", payload } as const;
};

export const updateTaskAC = (task: DomainTask) => {
  return { type: "UPDATE-TASK", task } as const;
};

export const fetchTasksThunkTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksApi.getTasks(todoListId).then((res) => {
      dispatch(setTasksAC(todoListId, res.data.items));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const removeTaskTC = (taskId: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksApi.deleteTask({ todoListId, taskId }).then((res) => {
      dispatch(removeTaskAC(taskId, todoListId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const addTaskTC = (arg: { title: string; todoListId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  tasksApi.createTask(arg).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(addTaskAC({ task: res.data.data.item }));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      if (res.data.messages.length) {
        dispatch(setAppErrorAC(res.data.messages[0]));
      } else {
        dispatch(setAppErrorAC("Some error occurred"));
      }
      dispatch(setAppStatusAC("failed"));
    }
  });
};

export const updateTaskTC = (arg: { taskId: string; todoListId: string; title: string; status: TaskStatus }) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC("loading"));
    const { taskId, todoListId, title, status } = arg;

    const tasks = getState().tasks;

    const task = tasks[todoListId].find((t) => t.id === taskId);

    if (task) {
      const model: UpdateTaskDomainModel = {
        title,
        status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      };

      tasksApi.updateTask({ model, task }).then((res) => {
        dispatch(updateTaskAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      });
    }
  };
};
