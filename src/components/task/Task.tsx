import { ChangeEvent } from "react";
import { Button } from "../button/Button";
import { EditableSpan } from "../editableSpan/EditableSpan";

type TaskPropsType = {
    title: string
    taskID: string
    isDone: boolean
    tlID: string
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    updatedTasksHandler: (newTitle: string) => void
    removeHandler: (taskID: string, tlID: string) => void

};
export const Task = (props: TaskPropsType) => {
    return (
        <li key={props.taskID}>
            <input type="checkbox" checked={props.isDone} onChange={props.changeTaskStatusHandler} />
            <EditableSpan title={props.title} isDone={props.isDone} updatedItem={props.updatedTasksHandler} />
            <Button title={"x"} onClick={() => props.removeHandler(props.taskID, props.tlID)} />
        </li>
    );
};