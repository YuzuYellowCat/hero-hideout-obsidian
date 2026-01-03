import React from "react";
import type { PropsWithChildren } from "react";
import classNames from "classnames";
import "./index.css";

type ButtonProps = {
    color?: string;
    variant?: "primary" | "secondary";
    quiet?: boolean;
    size?: "S" | "M" | "L";
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    children,
    color = "#ffffff",
    size = "M",
    variant = "primary",
    quiet = false,
    className,
    onClick,
}) => {
    const buttonColorStyle = quiet
        ? {
              borderColor: color,
              color,
          }
        : {
              borderColor: color,
              backgroundColor: color,
          };
    return (
        <button
            className={classNames("button", className, {
                [`button-${variant}`]: true,
                [`button-size-${size}`]: true,
                "button-quiet": quiet,
            })}
            style={buttonColorStyle}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
