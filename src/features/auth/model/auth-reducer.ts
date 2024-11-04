import { Dispatch } from "redux";
import { LoginArgs } from "../api/authApi.types";
import { setAppStatusAC } from "modules/app-reducer";

type InitialStateType = typeof initialState;

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn };
    default:
      return state;
  }
};
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const;
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>;

export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
};
