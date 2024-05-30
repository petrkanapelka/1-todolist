import React, { useState } from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';

export type FilteredProps = 'all' | 'completed' | 'active' | 'three-tasks'

function App() {
    const toDoListTitle: string = `What to learn?`;
    const tasks1: Array<TaskType> = [
        {
            id: 1,
            title: 'HTML/CSS',
            isDone: true
        },
        {
            id: 2,
            title: 'Javascript',
            isDone: true
        },
        {
            id: 3,
            title: 'React',
            isDone: false
        },
        {
            id: 4,
            title: 'Typescript',
            isDone: false
        },
        {
            id: 5,
            title: 'Styled components',
            isDone: true
        },
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks1);

    const removeHandler = (id: number) => {
        const newTasks = tasks.filter(el => el.id !== id)
        setTasks(newTasks);
    }

    const removeAllHandler = () => {
        const newTasks = tasks.filter(el => !el.id)
        setTasks(newTasks);
    }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle} tasks={tasks} removeHandler={removeHandler} /* changeFilter={changeFilter} */ removeAllHandler={removeAllHandler} />
        </div>
    );
}

export default App;
