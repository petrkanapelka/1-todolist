import './App.css';
import s from './App.module.css'
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { useAppDispatch, useAppSelector } from "modules/store";
import { getTheme } from "common/theme/getTheme";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { Outlet } from "react-router-dom";
import Header from "components/header/Header";
import { useEffect } from "react";
import { initializeAppTC } from 'features/auth/model/authThunks';
import { selectThemeMode } from 'features/app/appSlice';
import { selectIsInitialized } from 'features/auth/model/authSlice';


function App() {
    const themeMode = useAppSelector(selectThemeMode)
    const isInitialized = useAppSelector(selectIsInitialized)
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
