import { FC } from "react";

type ButtonPropsType = {
    title: string,
    onClick?: () => void
}

export const Button: FC<ButtonPropsType> = ({ title, onClick }: ButtonPropsType) => {
    return (
        <button onClick={onClick}>{title}</button>
    );
};
