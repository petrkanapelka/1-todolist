import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../components/addItemForm/AddItemForm'
import { EditableSpan } from '../components/editableSpan/EditableSpan'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<any>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        // get todolists
    }, [])

    const createTodolistHandler = (title: string) => {
        // create todolist
        return title
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
    }

    const updateTodolistHandler = (id: string, title: string) => {
        // update todolist title
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
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


