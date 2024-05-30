import { FC, useState } from "react"
import { Button } from "../button/Button"
import { FilteredProps } from "../../App"

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeHandler: (id: number) => void
    removeAllHandler: () => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const ToDoList: FC<ToDoListPropsType> = ({ title, tasks, removeHandler, removeAllHandler }: ToDoListPropsType) => {

    const [filter, setFilter] = useState('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    if (filter === 'three-tasks') {
        tasksForTodolist = tasks.filter(task => task.id <= 3)
    }

    const changeFilter = (status: FilteredProps) => {
        setFilter(status)
    }

    const taskElements: Array<JSX.Element> | JSX.Element = (tasks.length !== 0)
        ? tasksForTodolist.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                    <Button title={"x"} onClick={() => removeHandler(task.id)} />
                </li>
            )
        })
        : <span>Your tasklist is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div className="inputField">
                <input />
                <Button title="+" />
            </div>
            <ul>
                {taskElements}
            </ul>
            <Button onClick={() => { removeAllHandler() }} title="Delete all tasks" />
            <div>
                <Button onClick={() => { changeFilter('all') }} title="All" />
                <Button onClick={() => { changeFilter('active') }} title="Active" />
                <Button onClick={() => { changeFilter('completed') }} title="Completed" />
                <Button onClick={() => { changeFilter('three-tasks') }} title="Show first three tasks" />
            </div>
        </div>
    );
};
