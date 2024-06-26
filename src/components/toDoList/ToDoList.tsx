import { FC, ChangeEvent, ReactNode } from "react";
//import { Button } from "../button/Button";
import { FilterStatusType } from "../../App";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItemForm } from "../addItemForm/AddItemForm";
import { EditableSpan } from "../editableSpan/EditableSpan";
import { Task } from "../task/Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterStatusType
    removeHandler: (id: string, toDoListID: string) => void;
    removeAllHandler: (toDoListID: string) => void
    addNewTasks: (title: string, toDoListID: string) => void;
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, toDoListID: string) => void
    filterTasks: (status: FilterStatusType, toDoListID: string) => TaskType[]
    changeFilter: (status: FilterStatusType, toDoListId: string) => void
    removeTodolistHandler: (id: string) => void
    updatedTasks: (newTitle: string, id: string, toDoListID: string) => void
    updatedToDoLists: (title: string, toDoListId: string) => void,
    children?: ReactNode
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export const ToDoList: FC<ToDoListPropsType> = ({
    id,
    title,
    tasks,
    filter,
    removeHandler,
    removeAllHandler,
    removeTodolistHandler,
    addNewTasks,
    changeTaskStatus,
    filterTasks,
    changeFilter,
    updatedTasks,
    updatedToDoLists,
    children
}: ToDoListPropsType) => {

    const filteredTasks = filterTasks(filter, id)


    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0 ? (
            filteredTasks.map((task) => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked, id)
                }

                const updatedTasksHandler = (newTitle: string) => {
                    updatedTasks(newTitle, task.id, id)
                }

                return <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.isDone}
                    taskID={task.id}
                    tlID={id}
                    changeTaskStatusHandler={changeTaskStatusHandler}
                    updatedTasksHandler={updatedTasksHandler}
                    removeHandler={removeHandler}
                />
            })
        ) : (
            <span className="empty-span">Your tasklist is empty</span>
        );


    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const addNewTaskHandler = (title: string) => {
        addNewTasks(title, id)
    }


    const updatedToDoListsHandler = (newTitle: string) => {
        updatedToDoLists(newTitle, id)
    }


    return (
        <div className="todolist">
            <div className="header">
                <div className={'todolist-title-container'}>
                    <EditableSpan title={title} updatedItem={updatedToDoListsHandler} />
                    {/* <Button title={'x'} onClick={() => removeTodolistHandler(id)} /> */}
                    <IconButton aria-label="delete" onClick={() => removeTodolistHandler(id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
                {/* <Button
                    onClick={() => {
                        removeAllHandler(id);
                    }}
                    title="Delete all tasks"
                /> */}
                <Button
                    size='medium'
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        removeAllHandler(id);
                    }}>
                    All tasks
                </Button>
            </div>

            <AddItemForm addNewItem={addNewTaskHandler} />

            <div className="filter-buttons">
                {/* <Button
                    onClick={() => {
                        changeFilter("all", id);
                    }}
                    title="All"
                    className={filter === 'all' ? 'active-filter' : ''}
                /> */}

                <Button
                    onClick={() => {
                        changeFilter("all", id);
                    }}
                    size='small'
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                // style={{width: '22%'}}
                >All</Button>

                {/* <Button
                    onClick={() => {
                        changeFilter("active", id);
                    }}
                    title="Active"
                    className={filter === 'active' ? 'active-filter' : ''}
                /> */}

                <Button
                    onClick={() => {
                        changeFilter("active", id);
                    }}
                    size='small'
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                // style={{width: '22%'}}

                >Active</Button>

                {/* <Button
                    onClick={() => {
                        changeFilter("completed", id);
                    }}
                    title="Completed"
                    className={filter === 'completed' ? 'active-filter' : ''}
                /> */}

                <Button
                    onClick={() => {
                        changeFilter("completed", id);
                    }}
                    size='small'
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                // style={{width: '22%'}}

                >Completed</Button>

                {/* <Button
                    onClick={() => {
                        changeFilter("three-tasks", id);
                    }}
                    title="First 3 tasks"
                    className={filter === 'three-tasks' ? 'active-filter' : ''}
                /> */}

                <Button
                    onClick={() => {
                        changeFilter("three-tasks", id);
                    }}
                    size='small'
                    variant={filter === 'three-tasks' ? 'contained' : 'outlined'}
                // style={{width: '22%'}}
                >First three</Button>

            </div>

            <List ref={listRef} className="tasks-list">{taskElements}</List>

            {children}
        </div>
    );
};
