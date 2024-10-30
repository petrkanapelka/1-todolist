import './App.css';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ToDoList } from './components/toDoList/ToDoList';
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
import { addTodolistAC, changeToDoListFilterAC, changeTodolistTitleAC, removeTodolistAC } from './modules/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeAllTaskAC, removeTaskAC } from './modules/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './modules/store';
import { API_KEY, BEARER_TOKEN } from './api-env';
import axios from 'axios';
import { ApiResponse, FilterStatusType, RESULT_CODE, Todolist } from './components/toDoList/todolistsApi.types';
import { DomainTask, GetTasksResponse, UpdateTaskModel } from './components/task/tasksApi.types';
import { todolistsApi } from './components/toDoList/api/todolistsApi';

export type ThemeModeType = 'dark' | 'light';

function AppWithRedux() {

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // let toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists)

    const dispatch = useDispatch();


    // const changeFilter = useCallback((status: FilterStatusType, toDoListId: string) => {
    //     dispatch(changeToDoListFilterAC(toDoListId, status))
    // }, [dispatch]);

    // //! Operations with tasks
    // const updateTaskTitle = useCallback((newTitle: string, taskId: string, toDoListID: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, toDoListID))
    // }, [dispatch])

    // const removeHandler = useCallback((id: string, toDoListID: string) => {
    //     dispatch(removeTaskAC(id, toDoListID))
    // }, [dispatch])

    // const removeAllHandler = useCallback((toDoListID: string) => {
    //     dispatch(removeAllTaskAC(toDoListID))
    // }, [dispatch])

    // const addNewTasks = useCallback((title: string, toDoListID: string) => {
    //     dispatch(addTaskAC(title, toDoListID))
    // }, [dispatch])

    // const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, toDoListID: string) => {
    //     dispatch(changeTaskStatusAC(taskId, newIsDoneValue, toDoListID))
    // }, [dispatch])

    // //! ToDoLists
    // const removeTodolistHandler = useCallback((toDoListID: string) => {
    //     let action = removeTodolistAC(toDoListID);
    //     dispatch(action)
    // }, [dispatch])

    // const addToDoList = useCallback((title: string) => {
    //     let action = addTodolistAC(title);
    //     dispatch(action)
    // }, [dispatch])

    // const updatedToDoLists = useCallback((title: string, toDoListId: string) => {
    //     dispatch(changeTodolistTitleAC(toDoListId, title))
    // }, [dispatch])

    const changeFilter = useCallback((status: FilterStatusType, toDoListId: string) => {
        dispatch(changeToDoListFilterAC(toDoListId, status))
    }, [dispatch]);

    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                            headers: {
                                Authorization: BEARER_TOKEN,
                                'API-KEY': API_KEY,
                            },
                        })
                        .then(res => {
                            setTasks(prevTasks => ({ ...prevTasks, [tl.id]: res.data.items }))
                        })
                })
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                const newTodo = res.data.data.item
                setTodolists([newTodo, ...todolists])
                setTasks({ ...tasks, [newTodo.id]: [] })
            })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.deleteTodolist(id)
            .then(res => {
                setTodolists(todolists.filter(tl => tl.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({ id, title })
            .then(res => {
                setTodolists(todolists.map(tl => tl.id === id ? { ...tl, title } : tl))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                { title },
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTask = res.data.data.item
                setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios
            .delete<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
            })
    }

    const removeAllTaskHandler = (todolistId: string) => {
        const deleteRequests = tasks[todolistId].map((task) =>
            axios.delete<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${task.id}`,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
        );

        Promise.all(deleteRequests)
            .then(() => {
                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [todolistId]: []
                }));
            })
            .catch((error) => {
                console.error("Error deleting tasks:", error);
            });
    };


    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? RESULT_CODE.COMPLETED : RESULT_CODE.ACTIVE

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? { ...t, ...model } : t)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? { ...t, ...model } : t)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }


    const mappedToDoLists = todolists.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper className="paper" elevation={3}>
                    <ToDoList
                        id={t.id}
                        title={t.title}
                        filter={'all'}
                        tasks={tasks}
                        addNewTasks={createTaskHandler}
                        removeHandler={removeTaskHandler}
                        removeAllHandler={removeAllTaskHandler}
                        removeTodolistHandler={removeTodolistHandler}
                        changeTaskStatus={changeTaskStatusHandler}
                        changeFilter={changeFilter}
                        updateTaskTitle={changeTaskTitleHandler}
                        updatedToDoLists={updateTodolistHandler}
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
                            <AddItemForm addNewItem={createTodolistHandler} />
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
