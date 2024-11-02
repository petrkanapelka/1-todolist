export type ThemeMode = "dark" | "light";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type InitialState = typeof initialState;

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
};

type AppStatus = ReturnType<typeof setAppStatusAC>;
type AppTheme = ReturnType<typeof setAppThemesAC>;

type ActionsType = AppStatus | AppTheme;

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.themeMode };

    case "SET_STATUS":
      return { ...state, status: action.payload.status };

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
