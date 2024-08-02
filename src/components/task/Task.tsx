import { ChangeEvent, memo, useCallback } from "react";
import { EditableSpan } from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC } from "../../modules/tasks-reducer";


type TaskPropsType = {
    title: string
    taskID: string
    isDone: boolean
    tlID: string
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void
    updatedTasksHandler: (newTitle: string, taskId: string) => void
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

    console.log('task called')


    const dispatch = useDispatch();

    // const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTaskStatusHandler(e, props.taskID)
    // }, [props])

    // const updatedItemHandler = useCallback((newTitle: string) => {
    //     props.updatedTasksHandler(newTitle, props.taskID)
    // }, [props])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.taskID, e.currentTarget.checked, props.tlID))
    }, [dispatch, props.taskID, props.tlID])

    const updatedItemHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.taskID, newTitle, props.tlID))
    }, [dispatch, props.taskID, props.tlID])

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