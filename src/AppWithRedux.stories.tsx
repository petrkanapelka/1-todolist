import type { Meta, StoryObj } from '@storybook/react';
import AppWithRedux from './AppWithRedux';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {

    },
};

export default meta;

type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {};
