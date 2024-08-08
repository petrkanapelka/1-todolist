import { ChangeEvent, memo, useCallback } from "react";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';


export type TaskPropsType = {
    title: string
    taskID: string
    isDone: boolean
    tlID: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, toDoListID: string) => void
    updateTaskTitle: (newTitle: string, taskId: string, toDoListID: string) => void
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
        props.changeTaskStatus(props.taskID, e.currentTarget.checked, props.tlID)
    }, [props])

    const updatedItemHandler = useCallback((newTitle: string) => {
        props.updateTaskTitle(newTitle, props.taskID, props.tlID)
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