import './App.css';
import { useEffect, useReducer, useState } from 'react';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';
import { v1 } from 'uuid'
import { useAutoAnimate } from "@formkit/auto-animate/react";
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
import { addTodolistAC, changeToDoListFilterAC, changeTodolistTitleAC, removeTodolistAC, toDoListsReducer } from './modules/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './modules/tasks-reducer';

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

const tasks1: Array<TaskType> = [
    {
        id: v1(),
        title: 'HTML/CSS',
        isDone: true
    },
    {
        id: v1(),
        title: 'Javascript',
        isDone: true
    },
    {
        id: v1(),
        title: 'React',
        isDone: false
    },
    {
        id: v1(),
        title: 'Typescript',
        isDone: false
    },
    {
        id: v1(),
        title: 'Styled components',
        isDone: true
    },
]

const tasks2: Array<TaskType> = [
    {
        id: v1(),
        title: 'Bread',
        isDone: true
    },
    {
        id: v1(),
        title: 'Sausages',
        isDone: true
    },
    {
        id: v1(),
        title: 'Beer',
        isDone: false
    },
    {
        id: v1(),
        title: 'Vodka',
        isDone: false
    },
    {
        id: v1(),
        title: 'Bread',
        isDone: false
    },
]

function AppWithReducer() {


    //! ToDoLists

    let toDoList1ID = v1()
    let toDoList2ID = v1()

    const toDoList1: ToDoListType = {
        id: toDoList1ID,
        title: `What to learn?`,
        filter: 'all'
    }

    const toDoList2: ToDoListType = {
        id: toDoList2ID,
        title: `What to buy?`,
        filter: 'all'
    }

    const defaultTasks = {
        [toDoList1ID]: tasks1,
        [toDoList2ID]: tasks2,
    }

    const taskStringFromLocalStorage = localStorage.getItem('tasks');

    const taskFromLocalStorage = taskStringFromLocalStorage
        ? JSON.parse(taskStringFromLocalStorage)
        : defaultTasks

    let [tasks, dispatchTasks] = useReducer(tasksReducer, taskFromLocalStorage)


    const tdStringFromLocalStorage = localStorage.getItem('toDoLists');

    const toDoListsDefault: ToDoListType[] = [toDoList1, toDoList2]

    const tdFromLocalStorage = tdStringFromLocalStorage
        ? JSON.parse(tdStringFromLocalStorage)
        : toDoListsDefault


    const [toDoLists, dispatchToDoLists] = useReducer(toDoListsReducer, tdFromLocalStorage)



    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
    }, [toDoLists]);



    const changeFilter = (status: FilterStatusType, toDoListId: string) => {
        dispatchToDoLists(changeToDoListFilterAC(toDoListId, status))
    };

    //! Operations with tasks

    const updateTasks = (newTitle: string, id: string, toDoListID: string) => {
        dispatchTasks(changeTaskTitleAC(id, newTitle, toDoListID))
    }

    const removeHandler = (id: string, toDoListID: string) => {
        dispatchTasks(removeTaskAC(id, toDoListID))
    }

    const removeAllHandler = (toDoListID: string) => {
        // const removeTask = tasks[toDoListID].filter(el => !el.id)
        // tasks[toDoListID] = removeTask
        // setTasks({ ...tasks });

    }

    const addNewTasks = (title: string, toDoListID: string) => {
        dispatchTasks(addTaskAC(title, toDoListID))
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, toDoListID: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, newIsDoneValue, toDoListID))
    }

    //! Filtration


    const filterTasks = (filter: FilterStatusType, toDoListID: string) => {

        let tasksForTodolist = tasks[toDoListID];

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks[toDoListID].filter((task) => task.isDone === false);
            case 'completed':
                return tasksForTodolist = tasks[toDoListID].filter((task) => task.isDone === true);
            case 'three-tasks':
                return tasksForTodolist = tasks[toDoListID].filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }
    }

    const removeTodolistHandler = (toDoListID: string) => {
        let action = removeTodolistAC(toDoListID);
        dispatchToDoLists(action)
        dispatchTasks(action)
    }

    const addToDoList = (title: string) => {
        let action = addTodolistAC(title);
        dispatchToDoLists(action)
        dispatchTasks(action)
    }

    const updatedToDoLists = (title: string, toDoListId: string) => {
        dispatchToDoLists(changeTodolistTitleAC(toDoListId, title))
    }


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
                        // filterTasks={filterTasks}
                        changeFilter={changeFilter}
                        updatedTasks={updateTasks}
                        updatedToDoLists={updatedToDoLists}
                    />
                </Paper>
            </Grid>
        );
    });

    const [listRef] = useAutoAnimate<HTMLDivElement>()

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
        <div ref={listRef} className="App">
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
                    <Grid key={v1()} container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='addnewtodolist-wrapper'>
                            <h3>Add new ToDoList</h3>
                            <AddItemForm addNewItem={addToDoList} />
                        </div>
                    </Grid>
                </Container>
                <Container fixed maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid key={v1()} container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div className='todolists-wrapper'>
                            {mappedToDoLists}
                        </div>
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    );
}

export default AppWithReducer;
