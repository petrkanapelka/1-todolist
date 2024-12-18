import { ChangeEvent, memo } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { EditableSpan } from "components/editableSpan";
import { TaskStatus } from "common/enums/enums";
import { RequestStatus } from "features/app/appSlice";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./api/tasksApi";
import { DomainTask, UpdateTaskDomainModel } from "./api";
import { TasksSkeleton } from "components/main/ui/skeletons/TasksSkeleton/TasksSkeleton";
import { todolistsApi } from "components/toDoList/api";
import { useAppDispatch } from "modules/store";


export type TaskPropsType = {
    tasks: DomainTask[]
    title: string
    taskId: string
    isDone: boolean
    todoListId: string
    entityStatus: RequestStatus
    isLoading: boolean
};

const taskStyle = {
    width: "100 %",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: '0'
}

export const Task = memo((props: TaskPropsType) => {
    const { taskId, todoListId, isDone, title, entityStatus, tasks, isLoading } = props
    const [removeTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const dispatch = useAppDispatch()


    const updateQueryData = (status: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
                const index = state.findIndex(tl => tl.id === todoListId)
                if (index !== -1) {
                    state[index].entityStatus = status
                }
            })
        )
    }


    const onRemoveTask = () => {
        updateQueryData("loading");
        removeTask({ taskId, todoListId })
            .unwrap()
            .then(() => {
                updateQueryData("idle");
            })
            .catch(() => {
                updateQueryData("idle");
            });
    }

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
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
            updateQueryData("loading")
            updateTask({ task, model })
                .then(() => {
                    updateQueryData("idle");
                })
                .catch(() => {
                    updateQueryData("idle");
                });
        }
    }

    const onChangeTaskTitle = (title: string) => {
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
            updateQueryData("loading")
            updateTask({ task, model })
                .then(() => {
                    updateQueryData("idle");
                })
                .catch(() => {
                    updateQueryData("idle");
                });
        }
    }

    if (isLoading) {
        return <TasksSkeleton />
    }

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