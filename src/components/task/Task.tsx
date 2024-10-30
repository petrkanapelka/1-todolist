import { ChangeEvent, memo, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { DomainTask } from "./api/tasksApi.types";
import { EditableSpan } from "components/editableSpan";


export type TaskPropsType = {
    tasks: { [key: string]: DomainTask[] }
    title: string
    taskID: string
    isDone: boolean
    tlID: string
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => void
    updateTaskTitle: (title: string, task: DomainTask) => void
    removeHandler: (taskID: string, tlID: string) => void

};

const taskStyle = {
    width: "100 %",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '0'
}

export const Task = memo((props: TaskPropsType) => {

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const task = props.tasks[props.tlID].find(task => task.id === props.taskID)
        if (task) {
            props.changeTaskStatus(e, task)
        }
    }, [props])

    const updatedItemHandler = useCallback((newTitle: string) => {
        const task = props.tasks[props.tlID].find(task => task.id === props.taskID)
        if (task) {
            props.updateTaskTitle(newTitle, task)
        }
    }, [props])

    return (
        <ListItem key={props.taskID} className="task-item" style={taskStyle} >
            <Checkbox onChange={onChangeHandler} checked={props.isDone} />
            <EditableSpan title={props.title} isDone={props.isDone} updatedItem={updatedItemHandler} />
            <IconButton aria-label="delete" onClick={() => props.removeHandler(props.taskID, props.tlID)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
});