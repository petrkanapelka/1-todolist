import { FC, useState, ChangeEvent, KeyboardEvent, ReactNode, /* useRef */ } from "react";
import { Button } from "../button/Button";
import { FilterStatusType } from "../../App";
import { useAutoAnimate } from "@formkit/auto-animate/react";


type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterStatusType
    removeHandler: (id: string, toDoListID: string) => void;
    removeAllHandler: (toDoListID: string) => void
    addNewTask: (title: string, toDoListID: string) => void;
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, toDoListID: string) => void
    filterTasks: (status: FilterStatusType, toDoListID: string) => TaskType[]
    changeFilter: (status: FilterStatusType, toDoListId: string) => void
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
    addNewTask,
    changeTaskStatus,
    filterTasks,
    changeFilter,
    children
}: ToDoListPropsType) => {

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0 ? (
            filterTasks(filter, id).map((task) => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked, id)
                }
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                        <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        <Button title={"x"} onClick={() => removeHandler(task.id, id)} />
                    </li>
                );
            })
        ) : (
            <span>Your tasklist is empty</span>
        );

    const [inputValue, setInputValue] = useState("");

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const validateImput = () => {
        if (inputValue.length < 20 && inputValue.trim() !== '') {
            addNewTask(inputValue.trim(), id);
            setInputValue("");
        } else {
            setError('Title is required');
            setInputValue("");
        }
    }

    const onClickInputHandler = () => {
        validateImput()
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            validateImput()
        }
    };

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const [error, setError] = useState<string | null>(null)

    return (
        <div>
            <div className="header">
                <h3>{title}</h3>
                <Button
                    onClick={() => {
                        removeAllHandler(id);
                    }}
                    title="Delete all tasks"
                />
            </div>
            <div className="inputField">
                <input maxLength={20}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <Button onClick={onClickInputHandler} title="+" disable={!Boolean(inputValue)} />
            </div>

            {inputValue.length >= 20 && <small className="error-message">Enter fewer than 20 characters.</small>}

            {error && <div className={'error-message'}>{error}</div>}

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
