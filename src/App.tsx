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

function App() {

    //! Operationns with tasks

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks1);

    const removeHandler = (id: string) => {
        const newTasks = tasks.filter(el => el.id !== id)
        setTasks(newTasks);
    }

    const removeAllHandler = () => {
        const newTasks = tasks.filter(el => !el.id)
        setTasks(newTasks);
    }

    const addNewTasks = (title: string) => {
        const newTask = { id: v1(), title, isDone: false }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {

        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t);
        setTasks(nextState)
    }

    //! Filtration

    //const [filter, setFilter] = useState<FilterStatusType>('all');

    const filterTasks = (filter:FilterStatusType) => {

        let tasksForTodolist = tasks;

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks.filter((task) => task.isDone === false);
            case 'completed':
                return tasksForTodolist = tasks.filter((task) => task.isDone === true);
            case 'three-tasks':
                return tasksForTodolist = tasks.filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }
    }

    //! ToDoLists

    const toDoList1: ToDoListType = {
        id: v1(),
        title: `What to learn?`,
        filter: 'all'
    }

    const toDoList2: ToDoListType = {
        id: v1(),
        title: `What to buy?`,
        filter: 'active'
    }

    const toDoListsDefault: ToDoListType[] = [toDoList1, toDoList2]

    const [toDoLists, setToDoLists] = useState<ToDoListType[]>(toDoListsDefault)

    const changeFilter = (status: FilterStatusType, toDoListId: string) => {
        const newToDoLists = toDoLists.map(t => {
            return t.id === toDoListId ? { ...t, filter: status } : t
        })
        setToDoLists(newToDoLists)
    };

    const mappedToDoLists = toDoLists.map(t => {
        return (
            <ToDoList
                key={t.id}
                id={t.id}
                addNewTask={addNewTasks}
                title={t.title}
                filter={t.filter}
                tasks={tasks}
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
