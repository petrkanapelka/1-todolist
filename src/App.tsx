import React, { useState } from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';
import { v1 } from 'uuid'

export type FilteredProps = 'all' | 'completed' | 'active' | 'three-tasks'

function App() {
    const toDoListTitle: string = `What to learn?`;
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

    return (
        <div className="App">
            <ToDoList
                addNewTask={addNewTasks}
                title={toDoListTitle}
                tasks={tasks}
                removeHandler={removeHandler}
                removeAllHandler={removeAllHandler}>

                    <div>
                        <div>Many interesting information</div>
                    </div>

            </ToDoList>

            <ToDoList
                addNewTask={addNewTasks}
                title={toDoListTitle}
                tasks={tasks}
                removeHandler={removeHandler}
                removeAllHandler={removeAllHandler}>

                    <div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <div>Many interesting information</div>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                        <button>Button</button>
                    </div>

            </ToDoList>
        </div>
    );
}

export default App;
