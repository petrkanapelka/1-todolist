import { FC, useState, ChangeEvent, KeyboardEvent, ReactNode, /* useRef */ } from "react";
import { Button } from "../button/Button";
import { FilteredProps } from "../../App";
import { useAutoAnimate } from "@formkit/auto-animate/react";


type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeHandler: (id: string) => void;
    removeAllHandler: () => void;
    addNewTask: (title: string) => void;
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    children: ReactNode
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export const ToDoList: FC<ToDoListPropsType> = ({
    title,
    tasks,
    removeHandler,
    removeAllHandler,
    addNewTask,
    changeTaskStatus,
    children
}: ToDoListPropsType) => {
    const [filter, setFilter] = useState<FilteredProps>("all");

    const filterTasks = () => {
        let tasksForTodolist = tasks;

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks.filter((task) => task.isDone === false);
            case 'completed':
                return tasksForTodolist = tasks.filter((task) => task.isDone === true);
            case 'three-tasks':
                return tasksForTodolist = tasks.filter((task, indx) => indx <= 2);;
            default:
                return tasksForTodolist;
        }


        // if (filter === "active") {
        //     return tasksForTodolist = tasks.filter((task) => task.isDone === false);
        // }

        // if (filter === "completed") {
        //     return tasksForTodolist = tasks.filter((task) => task.isDone === true);
        // }

        // if (filter === "three-tasks") {
        //     return tasksForTodolist = tasks.filter((task, indx) => indx <= 2);
        // }
        // return tasksForTodolist;
    }


    const changeFilter = (status: FilteredProps) => {
        setFilter(status);
    };

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0 ? (
            filterTasks().map((task) => {
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked)
                }
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                        <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                        <Button title={"x"} onClick={() => removeHandler(task.id)} />
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

    const onClickInputHandler = () => {
        if (inputValue.length < 20 && inputValue.trim() !== '') {
            addNewTask(inputValue.trim());
            setInputValue("");
        } else {
            setError('Title is required');
            setInputValue("");
        }
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (inputValue.length < 20 && inputValue.trim() !== '') {
                addNewTask(inputValue.trim());
                setInputValue("");
            }
        }
    };

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const [error, setError] = useState<string | null>(null)

    /* const taskInputRef = useRef<HTMLInputElement>(null);

    const addTaskHandler = () => {
        if (taskInputRef.current) {
            taskInputRef.current.value && addNewTask(taskInputRef.current.value);
            taskInputRef.current.value = "";
        }
    }; */

    return (
        <div>
            <div className="header">
                <h3>{title}</h3>
                <Button
                    onClick={() => {
                        removeAllHandler();
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
                {/* <input
                    minLength={2}
                    maxLength={15}
                    ref={taskInputRef}
                    value={taskInputRef.current?.value}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button onClick={addTaskHandler} title="+" disable={!Boolean(taskInputRef.current?.value)}/> */}
            </div>
            {inputValue.length >= 20 && <small className="error-message">Enter fewer than 20 characters.</small>}
            {error && <div className={'error-message'}>{error}</div>}

            <div>
                <Button
                    onClick={() => {
                        changeFilter("all");
                    }}
                    title="All"
                    className={filter === 'all' ? 'active-filter' : ''}
                />
                <Button
                    onClick={() => {
                        changeFilter("active");
                    }}
                    title="Active"
                    className={filter === 'active' ? 'active-filter' : ''}
                />
                <Button
                    onClick={() => {
                        changeFilter("completed");
                    }}
                    title="Completed"
                    className={filter === 'completed' ? 'active-filter' : ''}
                />
                <Button
                    onClick={() => {
                        changeFilter("three-tasks");
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
