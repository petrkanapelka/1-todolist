import { ThemeProvider } from "@emotion/react";
import { Grid, Paper, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, Container } from "@mui/material";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { MenuButton } from "components/menuButton/MenuButton";
import { ToDoList } from "components/toDoList/ToDoList";
import { FilterStatusType } from "components/toDoList/api/todolistsApi.types";
import { addTodolistTC, changeToDoListFilterAC, fetchTodolistsThunk } from "modules/todolists-reducer";
import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "modules/store";
import './App.css';

export type ThemeModeType = 'dark' | 'light';

function App() {
    const dispatch = useAppDispatch();
    let todolists2 = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsThunk)
    }, [dispatch])

    // const changeFilter = useCallback((payload: { status: FilterStatusType, todoListId: string }) => {
    //     const { status, todoListId } = payload
    //     dispatch(changeToDoListFilterAC(todoListId, status))
    // }, [dispatch]);

    const onCreateTodolist = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    const mappedToDoLists = todolists2.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3}>
                    <ToDoList
                        todoListId={t.id}
                        title={t.title}
                        filter={'all'}
                        // changeFilter={changeFilter}
                    />
                </Paper>
            </Grid>
        );
    });


    const [themeMode, setThemeMode] = useState<ThemeModeType>('dark');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'dark' ? 'light' : 'dark',
            primary: {
                main: '#1976D2',
            },
            secondary: {
                main: '#043463',
            },
        },
    });

    const changeMode = () => {
        setThemeMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
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
                                    label={themeMode === 'dark' ? 'light' : 'dark'}
                                />
                            </FormGroup>
                        </Toolbar>
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
