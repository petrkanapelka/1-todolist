import { ChangeEvent, useState } from "react";
import TextField from '@mui/material/TextField';


type Props = {
    title: string
    isDone?: boolean
    updatedItem: (newTitle: string) => void
};
export const EditableSpan = (props: Props) => {
    const [inputValue, setInputValue] = useState(props.title);

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
                // helperText={inputValue.length >= 20 ? 'Enter fewer than 20 characters' : error}
                // className={error || inputValue.length >= 20 ? 'error' : ''}
                // error={!!error}
                size="small"
                // onKeyDown={onKeyDownHandler}
                value={inputValue}
                onChange={onChangeInputHandler}
                id="outlined-basic"
                label="enter title"
                variant="outlined"
                autoFocus
                onBlur={activeEditeModeHandler}
            />
            : <span
                onDoubleClick={activeEditeModeHandler}
                className={props.isDone ? 'task-done' : 'task'}>{props.title}
            </span>
    );
};