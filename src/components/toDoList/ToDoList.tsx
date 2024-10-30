import { FC, ReactNode, useCallback, memo, useMemo, ChangeEvent } from "react";
import { AddItemForm } from "../addItemForm/AddItemForm";
import { EditableSpan } from "../editableSpan/EditableSpan";
import { Task } from "../task/Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button, { ButtonProps } from '@mui/material/Button';
import List from '@mui/material/List';
import { DomainTask } from "../task/tasksApi.types";
import { TaskStatus } from "../../common/enums/enums";
import { FilterStatusType } from "./todolistsApi.types";

export type ToDoListPropsType = {
    id: string
    title: string
    tasks: { [key: string]: DomainTask[] }
    filter: FilterStatusType
    removeHandler: (id: string, toDoListID: string) => void;
    removeAllHandler: (toDoListID: string) => void
    addNewTasks: (title: string, toDoListID: string) => void;
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => void
    changeFilter: (status: FilterStatusType, toDoListId: string) => void
    removeTodolistHandler: (id: string) => void
    updateTaskTitle: (title: string, task: DomainTask) => void
    updatedToDoLists: (id: string, title: string) => void,
    children?: ReactNode
};



export const ToDoList: FC<ToDoListPropsType> = memo(({
    id,
    title,
    tasks,
    filter,
    removeHandler,
    removeAllHandler,
    removeTodolistHandler,
    addNewTasks,
    changeTaskStatus,
    changeFilter,
    updateTaskTitle,
    updatedToDoLists,
    children
}: ToDoListPropsType) => {



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
                    removeHandler={removeHandler}
                    tasks={tasks} />
            })
        ) : (
            <span className="empty-span">Your tasklist is empty</span>
        );



    const addNewTaskHandler = useCallback((title: string) => {
        addNewTasks(title, id)
    }, [addNewTasks, id])


    const updatedToDoListsHandler = useCallback((newTitle: string) => {
        updatedToDoLists(id, newTitle)
    }, [id, updatedToDoLists])

    const onClickAllHandler = useCallback(() => {
        changeFilter("all", id);
    }, [changeFilter, id])
    const onClickActiveHandler = useCallback(() => {
        changeFilter("active", id);
    }, [changeFilter, id])
    const onClickCompletedHandler = useCallback(() => {
        changeFilter("completed", id);
    }, [changeFilter, id])
    const onClickFirstThreeHandler = useCallback(() => {
        changeFilter("three-tasks", id);
    }, [changeFilter, id])
    const onClickRemoveAllHandler = useCallback(() => {
        removeAllHandler(id);
    }, [id, removeAllHandler])




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
