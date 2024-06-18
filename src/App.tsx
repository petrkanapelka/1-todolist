import { useState } from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';
import { v1 } from 'uuid'


export type FilterStatusType = 'all' | 'completed' | 'active' | 'three-tasks';

export type ToDoListType = {
    id: string
    title: string
    filter: FilterStatusType
}

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
        title: 'Meat',
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
]

function App() {

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
        filter: 'active'
    }

    let [tasks, setTasks] = useState({
        [toDoList1ID]: tasks1,
        [toDoList2ID]: tasks2,
    })

    const toDoListsDefault: ToDoListType[] = [toDoList1, toDoList2]

    const [toDoLists, setToDoLists] = useState<ToDoListType[]>(toDoListsDefault)

    const changeFilter = (status: FilterStatusType, toDoListId: string) => {
        const newToDoLists = toDoLists.map(t => {
            return t.id === toDoListId ? { ...t, filter: status } : t
        })
        setToDoLists(newToDoLists)
    };

    //! Operationns with tasks

    const removeHandler = (id: string, toDoListID: string) => {
        const removeTask = tasks[toDoListID].filter(el => el.id !== id)
        tasks[toDoListID] = removeTask
        setTasks({...tasks});
    }

    const removeAllHandler = (toDoListID: string) => {
        const removeTask = tasks[toDoListID].filter(el => !el.id)
        tasks[toDoListID] = removeTask
        setTasks({...tasks});

    }

    const addNewTasks = (title: string, toDoListID: string) => {
        const newTask = { id: v1(), title, isDone: false }
        const newTasks = [newTask, ...tasks[toDoListID]]
        tasks[toDoListID] = newTasks
        setTasks({...tasks});
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, toDoListID: string) => {

        const nextState: Array<TaskType> = tasks[toDoListID].map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t);
        tasks[toDoListID] = nextState
        setTasks({...tasks})
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

    const mappedToDoLists = toDoLists.map(t => {
        return (
            <ToDoList
                key={t.id}
                id={t.id}
                addNewTask={addNewTasks}
                title={t.title}
                filter={t.filter}
                tasks={tasks[t.id]}
                removeHandler={removeHandler}
                changeTaskStatus={changeTaskStatus}
                removeAllHandler={removeAllHandler}
                filterTasks={filterTasks}
                changeFilter={changeFilter}
            >
            </ToDoList>
        )
    })

    

    return (
        <div className="App">
            {mappedToDoLists}
        </div>
    );
}

export default App;
