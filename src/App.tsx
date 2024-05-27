import React, { useState } from 'react';
import './App.css';
import { TaskType, ToDoList } from './components/toDoList/ToDoList';

export type FilteredProps = 'all' | 'completed' | 'active'

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
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks1);

    const removeHandler = (id: number) => {
        const newTasks = tasks.filter(el => el.id !== id)
        setTasks(newTasks);
    }

    const [filter, setFilter] = useState('all')

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => task.isDone === false)
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone === true)
  }

  const changeFilter = (status: FilteredProps) => {
    setFilter(status)
  }

    return (
        <div className="App">
            <ToDoList title={toDoListTitle} tasks={tasksForTodolist} removeHandler={removeHandler} changeFilter={changeFilter} />
        </div>
    );
}

export default App;
