import { ThemeProvider } from "@emotion/react";
import { Grid, Paper, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, Container, LinearProgress } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { MenuButton } from "components/menuButton/MenuButton";
import { ToDoList } from "components/toDoList/ToDoList";
import { addTodolistTC, fetchTodolistsThunk } from "modules/todolists-reducer";
import { useEffect, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "modules/store";
import './App.css';
import { setAppThemesAC } from "modules/app-reducer";


function App() {
    const dispatch = useAppDispatch();
    let todolists2 = useAppSelector(state => state.todolists)
    const themeMode = useAppSelector(state => state.app.themeMode)
    const appStatus = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(fetchTodolistsThunk)
    }, [dispatch])

    const onCreateTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const mappedToDoLists = todolists2.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3} sx={{ borderRadius: '10px' }}>
                    <ToDoList
                        todoListId={t.id}
                        title={t.title}
                    />
                </Paper>
            </Grid>
        );
    });


    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#1976D2',
            },
            secondary: {
                main: '#043463',
            },
        },
    });

    const changeMode = (e: ChangeEvent<HTMLInputElement>) => {
        const theme = e.currentTarget.checked ? 'light' : 'dark'
        dispatch(setAppThemesAC(theme))
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
                <Container fixed maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='addnewtodolist-wrapper'>
                            <h3>Add new ToDoList</h3>
                            <AddItemForm addNewItem={onCreateTodolist} />
                        </div>
                    </Grid>
                </Container>
                <Container fixed maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='todolists-wrapper'>
                            {mappedToDoLists}
                        </div>
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    );
}

export default App;
