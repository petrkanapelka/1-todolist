import { ChangeEvent, useState } from "react";

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
        editMode
            ? <input
                type="text"
                value={inputValue}
                autoFocus
                onBlur={activeEditeModeHandler}
                onChange={onChangeInputHandler}
            />
            : <span
                onDoubleClick={activeEditeModeHandler}
                className={props.isDone ? 'task-done' : 'task'}>{props.title}
            </span>
    );
};