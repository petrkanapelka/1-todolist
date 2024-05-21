import { FC } from "react";

type ButtonPropsType = {
    title: string
}

export const Button: FC<ButtonPropsType> = ({title}: ButtonPropsType) => {
    return (
        <button>{title}</button>
    );
};
