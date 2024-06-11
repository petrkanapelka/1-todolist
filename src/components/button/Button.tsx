import { FC } from "react";

type ButtonPropsType = {
    title: string,
    onClick?: () => void
    disable?: boolean
    className?: string
}

export const Button: FC<ButtonPropsType> = ({ title, onClick, disable, className }: ButtonPropsType) => {
    return (
        <button onClick={onClick} disabled={disable} className={className}>{title} </button>
    );
};
