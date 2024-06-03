import { FC, useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { Button } from "../button/Button";
import { FilteredProps } from "../../App";
import { log } from "console";

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeHandler: (id: string) => void;
    removeAllHandler: () => void;
    addNewTask: (title: string) => void;
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
}: ToDoListPropsType) => {
    const [filter, setFilter] = useState("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter((task) => task.isDone === false);
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter((task) => task.isDone === true);
    }

    if (filter === "three-tasks") {
        tasksForTodolist = tasks.filter((task, indx) => indx <= 2);
    }

    const changeFilter = (status: FilteredProps) => {
        setFilter(status);
    };

    const taskElements: Array<JSX.Element> | JSX.Element =
        tasks.length !== 0 ? (
            tasksForTodolist.map((task) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
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
        if (inputValue.length < 15 && inputValue) {
            addNewTask(inputValue);
            setInputValue("");
        }
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.length < 15 && inputValue) {
                addNewTask(inputValue);
                setInputValue("");
            }
        }
    };

    /* const taskInputRef = useRef<HTMLInputElement>(null);

    const addTaskHandler = () => {
        if (taskInputRef.current) {
            taskInputRef.current.value && addNewTask(taskInputRef.current.value);
            taskInputRef.current.value = "";
        }
    }; */
    return (
        <div>
            <h3>{title}</h3>
            <div className="inputField">
                <input maxLength={15} value={inputValue} onChange={onChangeInputHandler} onKeyDown={onKeyDownHandler} />
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
            {inputValue.length >= 15 && <small style={{ fontSize: '12px', color: 'red' }}>Enter fewer than 15 characters.</small>}
            <ul>{taskElements}</ul>
            <Button
                onClick={() => {
                    removeAllHandler();
                }}
                title="Delete all tasks"
            />
            <div>
                <Button
                    onClick={() => {
                        changeFilter("all");
                    }}
                    title="All"
                />
                <Button
                    onClick={() => {
                        changeFilter("active");
                    }}
                    title="Active"
                />
                <Button
                    onClick={() => {
                        changeFilter("completed");
                    }}
                    title="Completed"
                />
                <Button
                    onClick={() => {
                        changeFilter("three-tasks");
                    }}
                    title="Show first three tasks"
                />
            </div>
        </div>
    );
};
