import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "modules/store";
import './App.css';
import { getTheme } from "common/theme/getTheme";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { Outlet } from "react-router-dom";
import Header from "components/header/Header";


function App() {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const theme = getTheme(themeMode)


    return (
        <>
            <div className="App">
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header />
                    <Outlet />
                    <ErrorSnackbar />
                </ThemeProvider>

            </div>
        </>
    );
}

export default App;
