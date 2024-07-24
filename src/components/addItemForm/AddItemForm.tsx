// import { Button } from "@mui/material";
import { FC, useState, ChangeEvent, KeyboardEvent, /* useRef */ } from "react";
//import { Button } from "../button/Button";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormType = {
    addNewItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormType> = (props: AddItemFormType) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null)

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
        setError(null)
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
};