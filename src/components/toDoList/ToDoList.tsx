import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ButtonProps, Button } from '@mui/material';
import { TaskStatus } from 'common/enums/enums';
import { AddItemForm } from 'components/addItemForm/AddItemForm';
import { DomainTask } from 'components/task/api/tasksApi.types';
import { ChangeEvent, ReactNode, FC, memo, useMemo, useCallback, useEffect } from 'react';
import { FilterStatusType } from './api/todolistsApi.types';
import { Task } from 'components/task/Task';
import { EditableSpan } from 'components/editableSpan';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { addTaskTC, fetchTasksThunkTC, removeTaskTC } from 'modules/tasks-reducer';


export type ToDoListPropsType = {
    id: string
    title: string
    filter: FilterStatusType
    // removeHandler: (id: string, toDoListID: string) => void;
    // removeAllHandler: (toDoListID: string) => void
    // addNewTasks: (title: string, toDoListID: string) => void;
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => void
    changeFilter: (payload: { status: FilterStatusType, todolistId: string }) => void
    removeTodolistHandler: (id: string) => void
    updateTaskTitle: (title: string, task: DomainTask) => void
    updatedToDoLists: (id: string, title: string) => void,
    children?: ReactNode
};



export const ToDoList: FC<ToDoListPropsType> = memo(({
    id,
    title,
    filter,
    // removeHandler,
    // removeAllHandler,
    removeTodolistHandler,
    // addNewTasks,
    changeTaskStatus,
    changeFilter,
    updateTaskTitle,
    updatedToDoLists,
    children
}: ToDoListPropsType) => {

    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksThunkTC(id))
    }, [dispatch, id])



    const filteredTasks = useMemo(() => {
        let tasksForTodolist = tasks[id];

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks[id].filter((task) => task.status === TaskStatus.New);
            case 'completed':
                return tasksForTodolist = tasks[id].filter((task) => task.status === TaskStatus.Completed);
            case 'three-tasks':
                return tasksForTodolist = tasks[id].filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }
    }, [filter, id, tasks])

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks[id] && tasks[id].length !== 0 ? (
            filteredTasks.map((task) => {
                return <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.status === TaskStatus.Completed}
                    taskID={task.id}
                    tlID={id}
                    changeTaskStatus={changeTaskStatus}
                    updateTaskTitle={updateTaskTitle}
                    // removeHandler={removeHandler}
                    tasks={tasks} />
            })
        ) : (
            <span className="empty-span">Your tasklist is empty</span>
        );



    const addNewTaskHandler = (useCallback((title: string) => {
        dispatch(addTaskTC({ title, todolistId: id }))
    }, [dispatch, id]))


    const updatedToDoListsHandler = useCallback((newTitle: string) => {
        updatedToDoLists(id, newTitle)
    }, [id, updatedToDoLists])

    const onClickRemoveAllHandler = useCallback(() => {
        tasks[id].forEach((t) => {
            dispatch(removeTaskTC(t.id, id))
        })
    }, [dispatch, id, tasks])

    const onClickAllHandler = useCallback(() => {
        changeFilter({ todolistId: id, status: "all" });
    }, [changeFilter, id])
    const onClickActiveHandler = useCallback(() => {
        changeFilter({ todolistId: id, status: "active" });
    }, [changeFilter, id])
    const onClickCompletedHandler = useCallback(() => {
        changeFilter({ todolistId: id, status: "completed" });
    }, [changeFilter, id])
    const onClickFirstThreeHandler = useCallback(() => {
        changeFilter({ todolistId: id, status: "three-tasks" });
    }, [changeFilter, id])






    return (
        <div className="todolist" >
            <div className="header">
                <div className={'todolist-title-container'}>
                    <EditableSpan title={title} updatedItem={updatedToDoListsHandler} />
                    <IconButton aria-label="delete" onClick={() => removeTodolistHandler(id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            <AddItemForm addNewItem={addNewTaskHandler} />

            <div className="filter-buttons">

                <UpdateButton
                    onClick={onClickAllHandler}
                    size='small'
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                >All</UpdateButton>

                <UpdateButton
                    onClick={onClickActiveHandler}
                    size='small'
                    variant={filter === 'active' ? 'contained' : 'outlined'}

                >Active</UpdateButton>

                <UpdateButton
                    onClick={onClickCompletedHandler}
                    size='small'
                    variant={filter === 'completed' ? 'contained' : 'outlined'}

                >Completed</UpdateButton>

                <UpdateButton
                    onClick={onClickFirstThreeHandler}
                    size='small'
                    variant={filter === 'three-tasks' ? 'contained' : 'outlined'}
                >First three</UpdateButton>

            </div>

            <List className="tasks-list">
                {taskElements}
            </List>

            <UpdateButton
                disabled={filteredTasks && filteredTasks.length === 0}
                sx={{ alignSelf: 'center' }}
                size='medium'
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={onClickRemoveAllHandler}>
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
