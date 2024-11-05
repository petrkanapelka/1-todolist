import { ResultCode, TaskStatus } from "common/enums/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { changeTodolistEntityStatus } from "components/toDoList/model/todolistsSlice";
import { setAppStatus } from "features/app/appSlice";
import { AppRootStateType } from "modules/store";
import { Dispatch } from "redux";
import { UpdateTaskDomainModel } from "../api";
import { tasksApi } from "../api/tasksApi";
import { addTask, removeTask, setTasks, updateTask } from "./tasksSlice";

export const fetchTasksThunkTC = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    tasksApi
      .getTasks(todoListId)
      .then((res) => {
        dispatch(setTasks({ todoListId, tasks: res.data.items }));
        dispatch(setAppStatus({ status: "succeeded" }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const removeTaskTC = (taskId: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatus({ id: todoListId, entityStatus: "loading" }));

    tasksApi
      .deleteTask({ todoListId, taskId })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTask({ taskId, todoListId }));
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(changeTodolistEntityStatus({ id: todoListId, entityStatus: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};

export const addTaskTC = (arg: { title: string; todoListId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  dispatch(changeTodolistEntityStatus({ id: arg.todoListId, entityStatus: "loading" }));

  tasksApi
    .createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTask({ task: res.data.data.item }));
        dispatch(setAppStatus({ status: "succeeded" }));
        dispatch(changeTodolistEntityStatus({ id: arg.todoListId, entityStatus: "succeeded" }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const updateTaskTC = (arg: { taskId: string; todoListId: string; title: string; status: TaskStatus }) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus({ status: "loading" }));
    dispatch(changeTodolistEntityStatus({ id: arg.todoListId, entityStatus: "loading" }));

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

      tasksApi
        .updateTask({ model, task })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTask({ taskId: task.id, todolistId: task.todoListId, domainModel: res.data.data.item }));
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(changeTodolistEntityStatus({ id: arg.todoListId, entityStatus: "succeeded" }));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
};
