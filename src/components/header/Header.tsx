import '../../app/App.css';
import { Box, AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, LinearProgress } from "@mui/material";
import { MenuButton } from "components/menuButton/MenuButton";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "modules/store";
import { selectIsLoggedIn, selectStatus, selectThemeMode, setAppTheme } from 'features/app/appSlice';
import { useLogoutMutation } from 'features/auth/api/authApi';
import { logoutTC } from 'features/auth/model/authThunks';


function Header() {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(selectThemeMode)
    const appStatus = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const [logout] = useLogoutMutation()

    const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
        const theme = e.currentTarget.checked ? 'light' : 'dark'
        dispatch(setAppTheme({ themeMode: theme }))
    }

    const onLogOut = () => {
        dispatch(logoutTC())
        // logout()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ToDoList
                    </Typography>
                    {isLoggedIn && <MenuButton onClick={onLogOut}>Logout</MenuButton>}
                    <FormGroup sx={{ marginLeft: '15px' }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={changeMode}
                                    defaultChecked color="secondary" />
                            }
                            label={themeMode === 'light' ? 'light' : 'dark'}
                        />
                    </FormGroup>
                </Toolbar>
                {appStatus === 'loading' && <LinearProgress />}
            </AppBar>
        </Box>
    );
}

export default Header;
