import { ThemeProvider } from "@emotion/react";
import { Grid, Paper, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, FormGroup, FormControlLabel, Switch, Container } from "@mui/material";
import { TaskStatus } from "common/enums/enums";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { MenuButton } from "components/menuButton/MenuButton";
import { tasksApi } from "components/task/api/tasksApi";
import { DomainTask, TasksStateType, UpdateTaskModel } from "components/task/api/tasksApi.types";
import { todolistsApi } from "components/toDoList/api/todolistsApi";
import { ToDoList } from "components/toDoList/ToDoList";
import { FilterStatusType, Todolist } from "components/toDoList/api/todolistsApi.types";
import { changeToDoListFilterAC, setTodolistsAC } from "modules/todolists-reducer";
import { useCallback, useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { AppRootStateType } from "modules/store";

export type ThemeModeType = 'dark' | 'light';

function AppWithRedux() {

    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let toDoLists = useSelector<AppRootStateType, Todolist[]>(state => state.todolists)

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

    const changeFilter = useCallback((payload: { status: FilterStatusType, todolistId: string }) => {
        const { status, todolistId } = payload
        dispatch(changeToDoListFilterAC(todolistId, status))
    }, [dispatch]);

    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => {
                const todolists = res.data
                dispatch(setTodolistsAC(todolists))
                setTodolists(todolists)

                todolists.forEach(tl => {
                    tasksApi.getTasks(tl.id)
                        .then(res => {
                            setTasks(prevTasks => ({ ...prevTasks, [tl.id]: res.data.items }))
                        })
                })
            })
    }, [dispatch])

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
        tasksApi.createTask({ title, todolistId })
            .then(res => {
                const newTask = res.data.data.item
                setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.deleteTask({ taskId, todolistId })
            .then(res => {
                setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) })
            })
    }

    const removeAllTaskHandler = (todolistId: string) => {
        const deleteRequests = tasks[todolistId].map((task) =>
            tasksApi.deleteTask({ taskId: task.id, todolistId })
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
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        tasksApi.updateTask({ model, task })
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

        tasksApi.updateTask({ model, task })
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
