import { FC } from "react"
import { Button } from "../button/Button"

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const ToDoList: FC<ToDoListPropsType> = ({ title, tasks }: ToDoListPropsType) => {

    const taskElements: Array<JSX.Element> | JSX.Element = (tasks.length !== 0)
        ? tasks.map((task, index) => {
            return (
                <li key='index'>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>Your tasklist is empty</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title="+" />
            </div>
            <ul>
                {taskElements}
            </ul>
            <div>
                <Button title="All" />
                <Button title="Active" />
                <Button title="Completed" />
            </div>
        </div>
    );
};
