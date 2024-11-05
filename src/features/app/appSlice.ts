import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light";
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status;
    }),
    setAppTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { setAppError, setAppStatus, setAppTheme } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const {selectThemeMode, selectStatus, selectError} = appSlice.selectors;
