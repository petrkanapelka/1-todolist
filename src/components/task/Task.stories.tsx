import { Task } from './Task';
import { v1 } from 'uuid';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../modules/store';
import { TaskType } from '../toDoList/ToDoList';

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
        changeTaskStatusHandler: action('Task status changed'),
        updatedTasksHandler: action('Task title changed'),
        removeHandler: action('Task deleted'),
        taskID: taskID,
        tlID: tlID,
        title: 'Hello',
        isDone: false
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskWithRedux = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) task = { id: v1(), title: 'Title', isDone: false }
    return <Task
        title={task.title}
        isDone={task.isDone}
        taskID={task.id} tlID={''}
        changeTaskStatusHandler={() => { }}
        updatedTasksHandler={() => { }}
        removeHandler={() => { }} />
}

export const TaskIsNotDoneStory: Story = {
};

export const TaskIsDoneStory: Story = {
    args: {
        isDone: true
    }
};

export const TaskToggleStory = {
    render: () => {
        return <TaskWithRedux />
    }
}
