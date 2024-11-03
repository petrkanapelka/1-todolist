import { FC, useState, ChangeEvent, KeyboardEvent, memo, /* useRef */ } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

export type AddItemFormType = {
    addNewItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormType> = memo((props: AddItemFormType) => {
    const { addNewItem } = props

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };


    const validateInput = () => {
        if (inputValue.length < 1150 && inputValue.trim() !== '') {
            addNewItem(inputValue.trim());
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
                    helperText={inputValue.length >= 1150 ? 'Enter fewer than 15 characters' : error}
                    className={error || inputValue.length >= 1150 ? 'error' : ''}
                    error={!!error || inputValue.length >= 1150}
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
                    // disabled={inputValue.length >= 15}
                    color="primary"
                    onClick={onClickInputHandler}>
                    <AddIcon />
                </Button>
            </div>
        </>
    );
});