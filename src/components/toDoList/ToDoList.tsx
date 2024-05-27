import { FC } from "react"
import { Button } from "../button/Button"
import { FilteredProps } from "../../App"

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeHandler: (id:number)=>void
    changeFilter: (status: FilteredProps)=>void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const ToDoList: FC<ToDoListPropsType> = ({ title, tasks, removeHandler, changeFilter }: ToDoListPropsType) => {

    const taskElements: Array<JSX.Element> | JSX.Element = (tasks.length !== 0)
        ? tasks.map((task) => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                    <Button title={"x"} onClick={()=>removeHandler(task.id)}/>
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
                <Button onClick={()=>{changeFilter('all')}} title="All" />
                <Button onClick={()=>{changeFilter('active')}} title="Active" />
                <Button onClick={()=>{changeFilter('completed')}} title="Completed" />
            </div>
        </div>
    );
};
