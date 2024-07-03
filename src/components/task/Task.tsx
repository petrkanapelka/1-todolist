import { ChangeEvent } from "react";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { useAutoAnimate } from "@formkit/auto-animate/react";


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

    const [liRef] = useAutoAnimate<HTMLLIElement>()
    return (
        <ListItem key={props.taskID} className="task-item" style={taskStyle} ref={liRef}>
            <Checkbox onChange={props.changeTaskStatusHandler} checked={props.isDone} />
            <EditableSpan title={props.title} isDone={props.isDone} updatedItem={props.updatedTasksHandler} />
            <IconButton aria-label="delete">
                <DeleteIcon onClick={() => props.removeHandler(props.taskID, props.tlID)} />
            </IconButton>
        </ListItem>
    );
};