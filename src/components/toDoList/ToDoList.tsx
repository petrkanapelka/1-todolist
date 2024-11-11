import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ButtonProps, Button } from '@mui/material';
import { TaskStatus } from 'common/enums/enums';
import { AddItemForm } from 'components/addItemForm/AddItemForm';
import { ReactNode, FC, memo, useCallback, useState } from 'react';
import { DomainTodolist, FilterStatusType } from './api/todolistsApi.types';
import { Task } from 'components/task/Task';
import { EditableSpan } from 'components/editableSpan';
import { useAppDispatch } from 'modules/store';
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from './api/todolistsApi';
import { PAGE_SIZE, useAddTaskMutation, useDeleteTaskMutation, useGetTasksQuery } from 'components/task/api/tasksApi';
import { changeFilterTasksHandler } from './model/FilterTasksButtons';
import { RequestStatus } from 'features/app/appSlice';
import { TasksPagination } from './ui/TasksPagination/TasksPagination';

export type ToDoListPropsType = {
    todolist: DomainTodolist
    todoListId: string
    title: string
    children?: ReactNode
};

export const ToDoList: FC<ToDoListPropsType> = memo(({
    todolist,
    todoListId,
    title,
    children
}: ToDoListPropsType) => {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useGetTasksQuery({ todoListId, args: { count: PAGE_SIZE, page } })
    const tasks = data?.items
    let filter = todolist.filter
    const entityStatus = todolist.entityStatus;
    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
    const [addTask] = useAddTaskMutation()
    const [removeTask] = useDeleteTaskMutation()

    const dispatch = useAppDispatch()

    const filteredTasks = (() => {
        let tasksForTodolist = tasks || [];
        switch (filter) {
            case 'active':
                return tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New);
            case 'completed':
                return tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed);
            case 'three-tasks':
                return tasksForTodolist = tasksForTodolist?.filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }
    })()



    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks && tasks.length !== 0 ? (
            filteredTasks.map((task) => {
                return <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.status === TaskStatus.Completed}
                    taskId={task.id}
                    todoListId={todoListId}
                    entityStatus={entityStatus}
                    tasks={filteredTasks}
                    isLoading={isLoading}
                />
            })
        ) : (
            <span className="empty-span">Your tasklist is empty</span>
        );



    const onAddNewTask = (title: string) => {
        updateQueryData('loading')
        addTask({ title, todoListId })
            .then(() => {
                updateQueryData("idle");
            })
            .catch(() => {
                updateQueryData("idle");
            });
    }

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

    const onRemoveTodolist = () => {
        updateQueryData('loading')
        removeTodolist(todoListId)
            .unwrap()
            .catch(() => {
                updateQueryData('idle')
            })
    }


    const onUpdateTodolist = (title: string) => {
        updateQueryData('loading')
        updateTodolistTitle({ id: todoListId, title })
            .unwrap()
            .catch(() => {
                updateQueryData('idle')
            })
    }

    const onRemoveAllTasks = () => {
        tasks?.forEach((t) => {
            updateQueryData('loading')
            removeTask({ taskId: t.id, todoListId })
                .unwrap()
                .then(() => {
                    updateQueryData("idle");
                })
                .catch(() => {
                    updateQueryData("idle");
                });
        })
    }

    const onChangeFilterStatus = useCallback((filter: FilterStatusType) => {
        dispatch(changeFilterTasksHandler(filter, todoListId));
    }, [dispatch, todoListId])

    const onChooseAllTasks = useCallback(() => {
        onChangeFilterStatus("all");
    }, [onChangeFilterStatus])

    const onChooseActiveTasks = useCallback(() => {
        onChangeFilterStatus("active");
    }, [onChangeFilterStatus])

    const onChooseCompletedTasks = useCallback(() => {
        onChangeFilterStatus("completed");
    }, [onChangeFilterStatus])

    const onChooseFirstThreeTasks = useCallback(() => {
        onChangeFilterStatus("three-tasks");
    }, [onChangeFilterStatus])






    return (
        <div className="todolist" >
            <div className="header">
                <div className={'todolist-title-container'}>
                    <EditableSpan title={title} updatedItem={onUpdateTodolist} entityStatus={entityStatus} />
                    <IconButton aria-label="delete" onClick={onRemoveTodolist} disabled={entityStatus === 'loading'}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            <AddItemForm addNewItem={onAddNewTask} entityStatus={entityStatus} />

            <div className="filter-buttons">

                <UpdateButton
                    onClick={onChooseAllTasks}
                    size='small'
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                >All</UpdateButton>

                <UpdateButton
                    onClick={onChooseActiveTasks}
                    size='small'
                    variant={filter === 'active' ? 'contained' : 'outlined'}

                >Active</UpdateButton>

                <UpdateButton
                    onClick={onChooseCompletedTasks}
                    size='small'
                    variant={filter === 'completed' ? 'contained' : 'outlined'}

                >Completed</UpdateButton>

                <UpdateButton
                    onClick={onChooseFirstThreeTasks}
                    size='small'
                    variant={filter === 'three-tasks' ? 'contained' : 'outlined'}
                >First three</UpdateButton>

            </div>

            <List className="tasks-list">
                {taskElements}
            </List>

            <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />

            <UpdateButton
                disabled={filteredTasks && filteredTasks.length === 0}
                sx={{ alignSelf: 'center', justifySelf: 'flex-end' }}
                size='medium'
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={onRemoveAllTasks}>
                Delete all items
            </UpdateButton>

            {children}
        </div>
    );
});




const UpdateButton = memo(({ ...props }: ButtonProps) => {
    return <Button
        {...props}
    ></Button>
})

