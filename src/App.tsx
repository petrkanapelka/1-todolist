import React from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';

function App() {
    const toDoListTitle: string = `What to learn?`;
    const tasks: Array<TaskType> = [
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
    ]
    return (
        <div className="App">
            <ToDoList title={toDoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
