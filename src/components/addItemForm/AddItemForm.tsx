import { FC, useState, ChangeEvent, KeyboardEvent, /* useRef */ } from "react";
import { Button } from "../button/Button";

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

    return (
        <>
            <div className="inputField">
                <input maxLength={20}
                    value={inputValue}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <Button onClick={onClickInputHandler} title="+" disable={!Boolean(inputValue)} />
            </div>
            {inputValue.length >= 20 && <small className="error-message">Enter fewer than 20 characters.</small>}

            {error && <div className={'error-message'}>{error}</div>}
        </>
    );
};