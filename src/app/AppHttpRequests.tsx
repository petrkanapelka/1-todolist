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
                            console.log(res.data)
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
            .post(
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
                console.log(res)
            })
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
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
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
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


