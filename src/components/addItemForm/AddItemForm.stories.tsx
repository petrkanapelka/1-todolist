import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';

import { AddItemForm, AddItemFormType } from './AddItemForm';
import { TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, memo, useState, ChangeEvent, KeyboardEvent } from 'react';

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        addNewItem: {
            description: 'Button clicked inside form',
            action: 'clicked',
        },
    },
    args: {
        addNewItem: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

const AddItemFormError: FC<AddItemFormType> = memo((props: AddItemFormType) => {


    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>('Title is required')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };


    const validateInput = () => {
        if (inputValue.length < 15 && inputValue.trim() !== '') {
            props.addNewItem(inputValue.trim());
            setInputValue("");
        } else {
            setError('Title is required');
            setInputValue("");
        }
    }

    const onClickInputHandler = () => {
        validateInput()
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === "Enter") {
            validateInput()
        }
    };

    const buttonStyles = {
        maxWidth: '35px',
        maxHeight: '35px',
        minWidth: '35px',
        minHeight: '35px',
    }

    return (
        <>
            <div className="inputField">
                <TextField
                    type='text'
                    helperText={inputValue.length >= 15 ? 'Enter fewer than 15 characters' : error}
                    className={error || inputValue.length >= 15 ? 'error' : ''}
                    error={!!error || inputValue.length >= 15}
                    size="small"
                    onKeyDown={onKeyDownHandler}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    id="outlined-basic"
                    label="enter title"
                    variant="outlined"
                />

                <Button
                    style={buttonStyles}
                    variant="contained"
                    size='small'
                    disabled={inputValue.length >= 15}
                    color="primary"
                    onClick={onClickInputHandler}>
                    <AddIcon />
                </Button>
            </div>
        </>
    );
});

export const AddItemFormErrorStory = {
    render: () => <AddItemFormError addNewItem={action('Button clicked inside form')} />
}