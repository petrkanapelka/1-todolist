// import { Button } from "@mui/material";
import { FC, useState, ChangeEvent, KeyboardEvent, /* useRef */ } from "react";
//import { Button } from "../button/Button";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
        if (inputValue.length < 20 && inputValue.trim() !== '') {
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
        maxWidth: '25px',
        maxHeight: '25px',
        minWidth: '25px',
        minHeight: '25px',
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
                    helperText={inputValue.length >= 20 ? 'Enter fewer than 20 characters' : error}
                    className={error || inputValue.length >= 20 ? 'error' : ''}
                    error={!!error}
                    size="small"
                    onKeyDown={onKeyDownHandler}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    id="outlined-basic"
                    label="enter title"
                    variant="outlined"
                />

                {/* <Button onClick={onClickInputHandler} title="+" disable={!Boolean(inputValue)} /> */}

                <Button size='small' variant="contained" onClick={onClickInputHandler} style={buttonStyles}>+</Button>
            </div>
            {/* {inputValue.length >= 20 && <small className="error-message">Enter fewer than 20 characters.</small>} */}

            {/* {error && <div className={'error-message'}>{error}</div>} */}
        </>
    );
};