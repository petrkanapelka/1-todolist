import { ChangeEvent, memo, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { EditableSpan } from "components/editableSpan";
import { useAppDispatch, useAppSelector } from "modules/store";
import { TaskStatus } from "common/enums/enums";
import { RequestStatus } from "features/app/appSlice";
import { removeTaskTC, updateTaskTC } from "./model/tasksThunks";


export type TaskPropsType = {
    title: string
    taskId: string
    isDone: boolean
    todoListId: string
    entityStatus: RequestStatus
};

const taskStyle = {
    width: "100 %",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '0'
}

export const Task = memo((props: TaskPropsType) => {
    const { taskId, todoListId, isDone, title, entityStatus } = props
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    const onRemoveTask = () => {
        dispatch(removeTaskTC(taskId, todoListId))
    }

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const task = tasks[todoListId].find(task => {
            return task.id === taskId;
        });
        if (task) {
            const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
            dispatch(updateTaskTC({ taskId: task.id, todoListId: task.todoListId, title: task.title, status }))
        }
    }, [dispatch, taskId, tasks, todoListId])

    const onChangeTaskTitle = useCallback((title: string) => {
        const task = tasks[todoListId].find(task => task.id === taskId)
        if (task) {
            dispatch(updateTaskTC({ taskId, todoListId, status: task.status, title }))
        }
    }, [dispatch, taskId, tasks, todoListId])

    return (
        <ListItem key={taskId} className="task-item" style={taskStyle} >
            <Checkbox onChange={onChangeTaskStatus} checked={isDone} disabled={entityStatus === 'loading'} />
            <EditableSpan title={title} isDone={isDone} updatedItem={onChangeTaskTitle} entityStatus={entityStatus} />
            <IconButton aria-label="delete" onClick={onRemoveTask} disabled={entityStatus === 'loading'}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
});