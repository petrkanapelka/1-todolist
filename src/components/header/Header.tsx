import '../../app/App.css';
import { Box, AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, LinearProgress } from "@mui/material";
import { MenuButton } from "components/menuButton/MenuButton";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "modules/store";
import { setAppThemesAC } from "modules/app-reducer";


function Header() {
    const dispatch = useAppDispatch();
    const themeMode = useAppSelector(state => state.app.themeMode)
    const appStatus = useAppSelector(state => state.app.status)

    const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
        const theme = e.currentTarget.checked ? 'light' : 'dark'
        dispatch(setAppThemesAC(theme))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ToDoList
                    </Typography>
                    <MenuButton color="inherit" >Login</MenuButton>
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
