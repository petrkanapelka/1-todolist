import { Task } from './Task';
import { v1 } from 'uuid';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../modules/store';
import { TaskType } from '../toDoList/ToDoList';
import { useState } from 'react';

const tlID = v1();
const taskID = v1();

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Task status changed'),
        updateTaskTitle: action('Task title changed'),
        removeHandler: action('Task deleted'),
        taskID: taskID,
        tlID: tlID,
        title: 'Hello',
        isDone: false
    }
};

export default meta;
type Story = StoryObj<typeof Task>;



export const TaskIsNotDoneStory: Story = {
};

export const TaskIsDoneStory: Story = {
    args: {
        isDone: true
    }
};
const TaskWithRedux = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    let [isDone, setIsDone] = useState(task.isDone)
    return <Task
        title={task.title}
        isDone={isDone}
        taskID={task.id}
        tlID={'todolistId1'}
        changeTaskStatus={() => setIsDone(!isDone)}
        updateTaskTitle={action('Task title changed')}
        removeHandler={action('Task deleted')} />
}

export const TaskToggleStory = {
    render: () => {
        return <TaskWithRedux />
    }
}
