import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ButtonProps, Button } from '@mui/material';
import { TaskStatus } from 'common/enums/enums';
import { AddItemForm } from 'components/addItemForm/AddItemForm';
import { ReactNode, FC, memo, useMemo, useCallback, useEffect } from 'react';
import { FilterStatusType } from './api/todolistsApi.types';
import { Task } from 'components/task/Task';
import { EditableSpan } from 'components/editableSpan';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { removeTodolistTC, updateTodolistTC } from './model/todolistsThunks';
import { addTaskTC, fetchTasksThunkTC, removeTaskTC } from 'components/task/model/tasksThunks';


export type ToDoListPropsType = {
    todoListId: string
    title: string
    children?: ReactNode
};



export const ToDoList: FC<ToDoListPropsType> = memo(({
    todoListId,
    title,
    children
}: ToDoListPropsType) => {

    const tasks = useAppSelector(state => state.tasks)
    const todolists = useAppSelector(state => state.todolists)
    const filter = todolists.find(tl => tl.id === todoListId)?.filter || 'all';
    const entityStatus = todolists.find(tl => tl.id === todoListId)?.entityStatus;

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksThunkTC(todoListId))
    }, [dispatch, todoListId])



    const filteredTasks = useMemo(() => {
        let tasksForTodolist = tasks[todoListId];

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks[todoListId].filter((task) => task.status === TaskStatus.New);
            case 'completed':
                return tasksForTodolist = tasks[todoListId].filter((task) => task.status === TaskStatus.Completed);
            case 'three-tasks':
                return tasksForTodolist = tasks[todoListId].filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }
    }, [filter, todoListId, tasks])

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks[todoListId] && tasks[todoListId].length !== 0 ? (
            filteredTasks.map((task) => {
                return <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.status === TaskStatus.Completed}
                    taskId={task.id}
                    todoListId={todoListId}
                    entityStatus={entityStatus!}
                />
            })
        ) : (
            <span className="empty-span">Your tasklist is empty</span>
        );



    const onAddNewTask = (useCallback((title: string) => {
        dispatch(addTaskTC({ title, todoListId }))
    }, [dispatch, todoListId]))

    const onRemoveTodolist = () => {
        dispatch(removeTodolistTC(todoListId))
    }


    const onUpdateTodolist = useCallback((title: string) => {
        dispatch(updateTodolistTC(title, todoListId))
    }, [dispatch, todoListId])

    const onRemoveAllTasks = useCallback(() => {
        tasks[todoListId].forEach((t) => {
            dispatch(removeTaskTC(t.id, todoListId))
        })
    }, [dispatch, tasks, todoListId])

    const onChangeFilterStatus = useCallback((filter: FilterStatusType) => {
        dispatch(changeToDoListFilterAC(todoListId, filter))
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
function changeToDoListFilterAC(todoListId: string, filter: string): any {
    throw new Error('Function not implemented.');
}

