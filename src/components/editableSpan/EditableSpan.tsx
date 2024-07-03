import { ChangeEvent, useState } from "react";
import TextField from '@mui/material/TextField';


type Props = {
    title: string
    isDone?: boolean
    updatedItem: (newTitle: string) => void
};
export const EditableSpan = (props: Props) => {
    const [inputValue, setInputValue] = useState(props.title);
    const [error, setError] = useState<string | null>(null)

    const validateImput = () => {
        if (inputValue.length <= 15 && inputValue.trim() !== '') {
            setInputValue("");
        } else {
            setError('Title is required');
            setInputValue("");
        }
    }

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
            // ? <input
            //     type="text"
            //     value={inputValue}
            //     autoFocus
            //     onBlur={activeEditeModeHandler}
            //     onChange={onChangeInputHandler}
            // />
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
            // onKeyDown={onKeyDownHandler}
            // onChange={onChangeInputHandler}
            />
            : <span
                onTouchStart={touchHandler}
                onDoubleClick={activeEditeModeHandler}
                className={props.isDone ? 'task-done' : 'task'}>{props.title}
            </span>
    );
};