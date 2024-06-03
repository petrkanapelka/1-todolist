import { FC } from "react";

type ButtonPropsType = {
    title: string,
    onClick?: () => void
    disable?: boolean
}

export const Button: FC<ButtonPropsType> = ({ title, onClick, disable }: ButtonPropsType) => {
    return (
        <button onClick={onClick} disabled={disable}>{title} </button>
    );
};
