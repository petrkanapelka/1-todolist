import { useState } from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';
import { v1 } from 'uuid'
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItemForm } from './components/addItemForm/AddItemForm';


export type FilterStatusType = 'all' | 'completed' | 'active' | 'three-tasks';

export type ToDoListType = {
    id: string
    title: string
    filter: FilterStatusType
}

export type TasksStateType = {
    [key: string]: TaskType[]
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
        filter: 'all'
    }

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const updateTasks = (newTitle: string, id: string, toDoListID: string) => {
        console.log(newTitle)
        setTasks({ ...tasks, [toDoListID]: tasks[toDoListID].map(t => t.id === id ? { ...t, title: newTitle } : t) })
    }

    const removeHandler = (id: string, toDoListID: string) => {
        const removeTask = tasks[toDoListID].filter(el => el.id !== id)
        tasks[toDoListID] = removeTask
        setTasks({ ...tasks });
    }

    const removeAllHandler = (toDoListID: string) => {
        const removeTask = tasks[toDoListID].filter(el => !el.id)
        tasks[toDoListID] = removeTask
        setTasks({ ...tasks });

    }

    const addNewTasks = (title: string, toDoListID: string) => {
        const newTask = { id: v1(), title, isDone: false }
        const newTasks = [newTask, ...tasks[toDoListID]]
        tasks[toDoListID] = newTasks
        setTasks({ ...tasks });
    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, toDoListID: string) => {

        const nextState: Array<TaskType> = tasks[toDoListID].map(t => t.id === taskId ? { ...t, isDone: newIsDoneValue } : t);
        tasks[toDoListID] = nextState
        setTasks({ ...tasks })
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
        const updatedToDoLists = toDoLists.filter(t => t.id !== toDoListID);
        const updatedTasks = { ...tasks };
        delete updatedTasks[toDoListID];
        setToDoLists(updatedToDoLists);
        setTasks(updatedTasks);
    }

    const addToDoList = (title: string) => {
        const newToDoList: ToDoListType = { id: v1(), title, filter: 'all' }
        setToDoLists([...toDoLists, newToDoList])
        setTasks({ ...tasks, [newToDoList.id]: [] })
    }

    const updatedToDoLists = (title: string, toDoListId: string)=>{
        setToDoLists(toDoLists.map(tl=>tl.id === toDoListId?{...tl, title}:tl))
    }


    const mappedToDoLists = toDoLists.map(t => {
        return (
            <ToDoList
                key={t.id}
                id={t.id}
                addNewTasks={addNewTasks}
                title={t.title}
                filter={t.filter}
                tasks={tasks[t.id]}
                removeHandler={removeHandler}
                removeAllHandler={removeAllHandler}
                removeTodolistHandler={removeTodolistHandler}
                changeTaskStatus={changeTaskStatus}
                filterTasks={filterTasks}
                changeFilter={changeFilter}
                updatedTasks={updateTasks}
                updatedToDoLists = {updatedToDoLists}
            >
            </ToDoList>
        )
    })

    const [listRef] = useAutoAnimate<HTMLDivElement>()


    return (
        <div ref={listRef} className="App">
            <div className='addnewtodolist-wrapper'>
                <h3>Add new ToDoList</h3>
                <AddItemForm addNewItem={addToDoList} />
            </div>
            <div className='todolists-wrapper'>
                {mappedToDoLists}
            </div>
        </div>
    );
}

export default App;
