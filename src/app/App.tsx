import './App.css';
import s from './App.module.css'
import { ThemeProvider } from "@emotion/react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { useAppDispatch, useAppSelector } from "modules/store";
import { getTheme } from "common/theme/getTheme";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { Outlet } from "react-router-dom";
import Header from "components/header/Header";
import { useEffect, useState } from "react";
import { selectThemeMode, setIsLoggedIn } from 'features/app/appSlice';
import { useMeQuery } from 'features/auth/api/authApi';
import { ResultCode } from 'common/enums/enums';


function App() {
    const [isInitialized, setIsInitialized] = useState(false)
    const { data, isLoading } = useMeQuery()
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success) {
                dispatch(setIsLoggedIn({ isLoggedIn: true }))
            }
        }
    }, [data?.resultCode, dispatch, isLoading])


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
