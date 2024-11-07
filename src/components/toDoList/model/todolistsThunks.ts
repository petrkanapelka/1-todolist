// import { ResultCode } from "common/enums/enums";
// import { handleServerAppError } from "common/utils/handleServerAppError";
// import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
// import { setAppStatus } from "features/app/appSlice";
// import { todolistsApi } from "../api";
// import { Dispatch } from "redux";
// import {
//   addTodolist,
//   changeTodolistEntityStatus,
//   changeTodolistTitle,
//   removeTodolist,
//   setTodolists,
// } from "./todolistsSlice";

// //!   Thunks
// export const fetchTodolistsThunk = (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }));
//   todolistsApi
//     .getTodolists()
//     .then((res) => {
//       dispatch(setTodolists({ todolists: res.data }));
//       dispatch(setAppStatus({ status: "succeeded" }));
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }));
//   todolistsApi
//     .createTodolist(title)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(addTodolist({ todolist: res.data.data.item }));
//         dispatch(setAppStatus({ status: "succeeded" }));
//         dispatch(changeTodolistEntityStatus({ id: res.data.data.item.id, entityStatus: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }));
//   dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }));
//   todolistsApi
//     .deleteTodolist(id)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(removeTodolist({ id }));
//         dispatch(setAppStatus({ status: "succeeded" }));
//         dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const updateTodolistTC = (title: string, id: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: "loading" }));
//   dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }));
//   todolistsApi
//     .updateTodolist({ title, id })
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(changeTodolistTitle({ id, title }));
//         dispatch(setAppStatus({ status: "succeeded" }));
//         dispatch(changeTodolistEntityStatus({ id, entityStatus: "succeeded" }));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

export const a = 15
