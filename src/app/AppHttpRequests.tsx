import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../components/addItemForm/AddItemForm'
import { EditableSpan } from '../components/editableSpan/EditableSpan'
import axios from 'axios'
import { API_KEY, BEARER_TOKEN } from '../api-env'


type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ApiResponse<T> = {
    data: {
        item: T
    };
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
};

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type UpdateTaskModel = {
    status: number;
    title: string;
    deadline: string;
    description: string;
    priority: number;
    startDate: string;
}

enum RESULT_CODE {
    COMPLETED = 2,
    ACTIVE = 0
}



export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{ [key: string]: DomainTask[] }>({})

    useEffect(() => {
        axios
            .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
                headers: {
                    Authorization: BEARER_TOKEN,
                },
            })
            .then(res => {
                const todolists = res.data
                setTodolists(todolists)
                todolists.forEach(tl => {
                    axios
                        .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                            headers: {
                                Authorization: BEARER_TOKEN,
                                'API-KEY': API_KEY,
                            },
                        })
                        .then(res => {
                            setTasks({ ...tasks, [tl.id]: res.data.items })
                        })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios
            .post<ApiResponse<Todolist>>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title },
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTodo = res.data.data.item
                setTodolists([newTodo, ...todolists])
            })
    }

    const removeTodolistHandler = (id: string) => {
        axios
            .delete<ApiResponse<unknown>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: BEARER_TOKEN,
                    'API-KEY': API_KEY,
                },
            })
            .then(res => {
                setTodolists(todolists.filter(tl => tl.id !== id))
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<ApiResponse<unknown>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                { title },
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                setTodolists(todolists.map(tl => tl.id === id ? { ...tl, title } : tl))
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios
            .post<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                { title },
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTask = res.data.data.item
                setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? RESULT_CODE.COMPLETED : RESULT_CODE.ACTIVE

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? { ...t, ...model } : t)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<ApiResponse<DomainTask>>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: BEARER_TOKEN,
                        'API-KEY': API_KEY,
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? { ...t, ...model } : t)
                setTasks({ ...tasks, [task.todoListId]: newTasks })
            })
    }

    return (
        <div style={{ margin: '20px' }}>
            <AddItemForm addNewItem={createTodolistHandler} />

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                title={tl.title}
                                updatedItem={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addNewItem={title => createTaskHandler(title, tl.id)} />

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === RESULT_CODE.COMPLETED ? true : false}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            title={task.title}
                                            updatedItem={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}


