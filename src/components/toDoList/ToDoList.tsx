import { FC, ChangeEvent, ReactNode, useState, /* useRef */ } from "react";
import { Button } from "../button/Button";
import { FilterStatusType } from "../../App";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AddItemForm } from "../addItemForm/AddItemForm";
import { EditableSpan } from "../editableSpan/EditableSpan";


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

                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                        <EditableSpan title={task.title} isDone={task.isDone} updatedItem={updatedTasksHandler} />
                        <Button title={"x"} onClick={() => removeHandler(task.id, id)} />
                    </li>
                );
            })
        ) : (
            <span>Your tasklist is empty</span>
        );


    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const addNewTaskHandler = (title: string) => {
        addNewTasks(title, id)
    }

    // const [toDoTitle, setToDoTitle] = useState(title)

    const updatedToDoListsHandler = (newTitle: string) => {
        updatedToDoLists(newTitle, id)
    }


    return (
        <div className="todolist">
            <div className="header">
                <div className={'todolist-title-container'}>
                    <EditableSpan title={title} updatedItem={updatedToDoListsHandler} />
                    <Button title={'x'} onClick={() => removeTodolistHandler(id)} />
                </div>
                <Button
                    onClick={() => {
                        removeAllHandler(id);
                    }}
                    title="Delete all tasks"
                />
            </div>

            <AddItemForm addNewItem={addNewTaskHandler} />

            <div>
                <Button
                    onClick={() => {
                        changeFilter("all", id);
                    }}
                    title="All"
                    className={filter === 'all' ? 'active-filter' : ''}
                />

                <Button
                    onClick={() => {
                        changeFilter("active", id);
                    }}
                    title="Active"
                    className={filter === 'active' ? 'active-filter' : ''}
                />

                <Button
                    onClick={() => {
                        changeFilter("completed", id);
                    }}
                    title="Completed"
                    className={filter === 'completed' ? 'active-filter' : ''}
                />

                <Button
                    onClick={() => {
                        changeFilter("three-tasks", id);
                    }}
                    title="First 3 tasks"
                    className={filter === 'three-tasks' ? 'active-filter' : ''}
                />
            </div>

            <ul ref={listRef}>{taskElements}</ul>

            {children}
        </div>
    );
};
