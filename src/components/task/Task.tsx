import { ChangeEvent, memo, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { DomainTask } from "./api/tasksApi.types";
import { EditableSpan } from "components/editableSpan";
import { useAppDispatch, useAppSelector } from "modules/store";
import { removeTaskTC } from "modules/tasks-reducer";


export type TaskPropsType = {
    tasks: { [key: string]: DomainTask[] }
    title: string
    taskID: string
    isDone: boolean
    tlID: string
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => void
    updateTaskTitle: (title: string, task: DomainTask) => void
    // removeHandler: (taskID: string, tlID: string) => void

};

const taskStyle = {
    width: "100 %",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '0'
}

export const Task = memo((props: TaskPropsType) => {
    const { taskID, tlID: todolistID } = props
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    const removeHandler = () => {
        dispatch(removeTaskTC(taskID, todolistID))
    }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const task = tasks[todolistID].find(task => task.id === taskID)
        if (task) {
            props.changeTaskStatus(e, task)
        }
    }, [props, taskID, tasks, todolistID])

    const updatedItemHandler = useCallback((newTitle: string) => {
        const task = tasks[todolistID].find(task => task.id === taskID)
        if (task) {
            props.updateTaskTitle(newTitle, task)
        }
    }, [props, taskID, tasks, todolistID])

    return (
        <ListItem key={props.taskID} className="task-item" style={taskStyle} >
            <Checkbox onChange={onChangeHandler} checked={props.isDone} />
            <EditableSpan title={props.title} isDone={props.isDone} updatedItem={updatedItemHandler} />
            <IconButton aria-label="delete" onClick={removeHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
});