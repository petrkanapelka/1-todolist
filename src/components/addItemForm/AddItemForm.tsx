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


    const validateImput = () => {
        if (inputValue.length < 15 && inputValue.trim() !== '') {
            props.addNewItem(inputValue.trim());
            setInputValue("");
        } else {
            setError('Title is required');
            setInputValue("");
        }
    }

    const onClickInputHandler = () => {
        validateImput()
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            validateImput()
        }
    };

    const buttonStyles = {
        maxWidth: '35px',
        maxHeight: '35px',
        minWidth: '35px',
        minHeight: '35px',
        // fontSize: '20px'
    }

    return (
        <>
            <div className="inputField">
                {/*  <input maxLength={20}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                /> */}
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
                //disabled={inputValue.length >= 14}
                />

                {/* <Button onClick={onClickInputHandler} title="+" disable={!Boolean(inputValue)} /> */}

                {/* <Button
                    disabled={inputValue.length >= 15}
                    size='small'
                    variant="contained"
                    onClick={onClickInputHandler}
                    style={buttonStyles}
                >+</Button> */}
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
            {/* {inputValue.length >= 20 && <small className="error-message">Enter fewer than 20 characters.</small>} */}

            {/* {error && <div className={'error-message'}>{error}</div>} */}
        </>
    );
};