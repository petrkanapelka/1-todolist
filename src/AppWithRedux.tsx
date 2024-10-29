import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';
import { AddItemForm } from './components/addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MenuButton } from './components/menuButton/MenuButton';
import createTheme from '@mui/material/styles/createTheme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { addTodolistAC, changeToDoListFilterAC, changeTodolistTitleAC, getTodolistsAC, removeTodolistAC } from './modules/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeAllTaskAC, removeTaskAC } from './modules/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './modules/store';
import { API_KEY, BEARER_TOKEN } from './api-env';
import axios from 'axios';

export type FilterStatusType = 'all' | 'completed' | 'active' | 'three-tasks';

export type ToDoListType = {
    id: string
    title: string
    filter: FilterStatusType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ThemeModeType = 'dark' | 'light';

type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ApiResponse<T> = {
    data: {
        item: T
    };
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
};

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type UpdateTaskModel = {
    status: number;
    title: string;
    deadline: string;
    description: string;
    priority: number;
    startDate: string;
}

enum RESULT_CODE {
    COMPLETED = 2,
    ACTIVE = 0
}


function AppWithRedux() {

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)

    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: BEARER_TOKEN,
                },
            })
            .then(res => {
                const todolists = res.data
                console.log("🚀 ~ useEffect ~ todolists ➔", todolists);
                // setTodolists(todolists)
                dispatch(getTodolistsAC())
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                            headers: {
                                Authorization: BEARER_TOKEN,
                                'API-KEY': API_KEY,
                            },
                        })
                        .then(res => {
                            // setTasks(prevTasks => ({ ...prevTasks, [tl.id]: res.data.items }))
                        })
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeFilter = useCallback((status: FilterStatusType, toDoListId: string) => {
        dispatch(changeToDoListFilterAC(toDoListId, status))
    }, [dispatch]);

    //! Operations with tasks
    const updateTaskTitle = useCallback((newTitle: string, taskId: string, toDoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, toDoListID))
    }, [dispatch])

    const removeHandler = useCallback((id: string, toDoListID: string) => {
        dispatch(removeTaskAC(id, toDoListID))
    }, [dispatch])

    const removeAllHandler = useCallback((toDoListID: string) => {
        dispatch(removeAllTaskAC(toDoListID))
    }, [dispatch])

    const addNewTasks = useCallback((title: string, toDoListID: string) => {
        dispatch(addTaskAC(title, toDoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, toDoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, toDoListID))
    }, [dispatch])

    //! ToDoLists
    const removeTodolistHandler = useCallback((toDoListID: string) => {
        let action = removeTodolistAC(toDoListID);
        dispatch(action)
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        let action = addTodolistAC(title);
        dispatch(action)
    }, [dispatch])

    const updatedToDoLists = useCallback((title: string, toDoListId: string) => {
        dispatch(changeTodolistTitleAC(toDoListId, title))
    }, [dispatch])


    const mappedToDoLists = toDoLists.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3}>
                    <ToDoList
                        id={t.id}
                        addNewTasks={addNewTasks}
                        title={t.title}
                        filter={t.filter}
                        tasks={tasks[t.id]}
                        removeHandler={removeHandler}
                        removeAllHandler={removeAllHandler}
                        removeTodolistHandler={removeTodolistHandler}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}
                        updateTaskTitle={updateTaskTitle}
                        updatedToDoLists={updatedToDoLists}
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
                            <AddItemForm addNewItem={addToDoList} />
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

export default AppWithRedux;
