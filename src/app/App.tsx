import './App.css';
import s from './App.module.css'
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { useAppDispatch, useAppSelector } from "modules/store";
import { getTheme } from "common/theme/getTheme";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { Outlet } from "react-router-dom";
import Header from "components/header/Header";
import { initializeAppTC } from "features/auth/model/auth-reducer";
import { useEffect } from "react";


function App() {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const isInitialized = useAppSelector(state => state.auth.isInitialized)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    return (
        <>
            <div className="App" style={{ marginTop: '66px' }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {isInitialized && (
                        <>
                            <Header />
                            <Outlet />
                        </>
                    )}
                    {!isInitialized && (
                        <div className={s.circularProgressContainer}>
                            <CircularProgress size={150} thickness={3} />
                        </div>
                    )}
                    <ErrorSnackbar />
                </ThemeProvider>

            </div>
        </>
    );
}

export default App;
