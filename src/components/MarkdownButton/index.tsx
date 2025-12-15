import React, { ButtonHTMLAttributes, useCallback } from "react";
import { useNavigate } from "react-router";
import useWebLink from "hooks/useWebLink";
import Button from "components/Button";

type MarkdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    quiet?: boolean;
    variant?: "primary" | "secondary";
};

const MarkdownButton: React.FC<MarkdownButtonProps> = (props) => {
    const navigate = useNavigate();
    const { link, isLocal } = useWebLink(props.href);

    const onClick = useCallback(
        (event: React.MouseEvent) => {
            if (isLocal) {
                event.preventDefault();
                navigate(link);
            } else {
                window.open(link, "_blank");
            }
        },
        [isLocal, link, navigate]
    );

    return (
        <Button {...props} onClick={onClick}>
            {props.children}
        </Button>
    );
};

export default MarkdownButton;
