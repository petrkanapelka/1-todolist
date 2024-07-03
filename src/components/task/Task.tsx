import { ChangeEvent } from "react";
import { Button } from "../button/Button";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
    const taskStyle = {
        width: "100 %",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '0'
    }
    return (
        <ListItem key={props.taskID} className="task-item" style={taskStyle} sx={taskStyle}>
            <Checkbox onChange={props.changeTaskStatusHandler} checked={props.isDone} />
            {/* <input type="checkbox" checked={props.isDone} onChange={props.changeTaskStatusHandler} /> */}
            <EditableSpan title={props.title} isDone={props.isDone} updatedItem={props.updatedTasksHandler} />
            {/* <Button title={"x"} onClick={() => props.removeHandler(props.taskID, props.tlID)} /> */}
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => props.removeHandler(props.taskID, props.tlID)} />
            </IconButton>
        </ListItem>
    );
};