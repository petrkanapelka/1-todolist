import { ChangeEvent, memo, useState } from "react";
import TextField from '@mui/material/TextField';


type Props = {
    title: string
    isDone?: boolean
    updatedItem: (newTitle: string) => void
};

export const EditableSpan = memo((props: Props) => {
    console.log('editable span called')
    const [inputValue, setInputValue] = useState(props.title);

    let error: string | null = null

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const [editMode, setEditMode] = useState(false)

    const activeEditeModeHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            props.updatedItem(inputValue)
        }
    }

    let lastTouchTime = 0;
    const touchThreshold = 300;

    const touchHandler = () => {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastTouchTime;
        if (timeDifference < touchThreshold && timeDifference > 0) {
            activeEditeModeHandler()
        }
        lastTouchTime = currentTime;
    }

    return (
        editMode ?
            <TextField
                size="small"
                value={inputValue}
                onChange={onChangeInputHandler}
                id="outlined-basic"
                label="enter title"
                variant="outlined"
                autoFocus
                onBlur={activeEditeModeHandler}

                type='text'
                helperText={inputValue.length >= 20 ? 'Enter fewer than 20 characters' : error}
                className={error || inputValue.length >= 20 ? 'error' : ''}
                error={!!error || inputValue.length >= 20}
            />
            : <span
                onTouchStart={touchHandler}
                onDoubleClick={activeEditeModeHandler}
                className={props.isDone ? 'task-done' : 'task'}>{props.title}
            </span>
    );
});