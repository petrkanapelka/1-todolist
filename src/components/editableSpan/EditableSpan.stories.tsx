import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
    },
    args: {
        title: 'Hello',
        updatedItem: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {};
