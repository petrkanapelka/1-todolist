import { createTheme } from "@mui/material/styles";
import { ThemeMode } from "modules/app-reducer";

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#1976D2",
      },
      secondary: {
        main: "#043463",
      },
    },
  });
};
