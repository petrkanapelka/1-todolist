export type ThemeMode = "dark" | "light";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type InitialState = typeof initialState;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
};

type AppStatus = ReturnType<typeof setAppStatusAC>;
type AppTheme = ReturnType<typeof setAppThemesAC>;
type AppError = ReturnType<typeof setAppErrorAC>;

type ActionsType = AppStatus | AppTheme | AppError;

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.themeMode };

    case "SET_STATUS":
      return { ...state, status: action.payload.status };
    case "SET_ERROR": {
      return { ...state, error: action.payload.error };
    }

    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatus) => {
  return {
    type: "SET_STATUS",
    payload: { status },
  } as const;
};

export const setAppThemesAC = (themeMode: ThemeMode) => {
  return {
    type: "CHANGE_THEME",
    payload: { themeMode },
  } as const;
};

export const setAppErrorAC = (error: string | null) => {
  return {
    type: "SET_ERROR",
    payload: { error },
  } as const;
};
