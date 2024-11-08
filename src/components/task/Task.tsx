import { ChangeEvent, memo, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { EditableSpan } from "components/editableSpan";
import { TaskStatus } from "common/enums/enums";
import { RequestStatus } from "features/app/appSlice";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./api/tasksApi";
import { DomainTask, UpdateTaskDomainModel } from "./api";


export type TaskPropsType = {
    tasks: DomainTask[]
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
    const { taskId, todoListId, isDone, title, entityStatus, tasks } = props
    const [removeTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()


    const onRemoveTask = () => {
        removeTask({ taskId, todoListId })
    }

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const task = tasks.find(task => {
            return task.id === taskId;
        });
        if (task) {
            const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
            const model: UpdateTaskDomainModel = {
                status,
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
            };
            updateTask({ task, model })
        }
    }, [taskId, tasks, updateTask])

    const onChangeTaskTitle = useCallback((title: string) => {
        const task = tasks.find(task => {
            return task.id === taskId;
        });
        if (task) {
            const model: UpdateTaskDomainModel = {
                title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
            };
            updateTask({ task, model })
        }
    }, [taskId, tasks, updateTask])

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