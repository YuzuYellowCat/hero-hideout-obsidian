"use client";
import React, { ButtonHTMLAttributes, useCallback } from "react";
import { useRouter } from "next/navigation";
import useWebLink from "hooks/useWebLink";
import Button from "components/Button";

type MarkdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    quiet?: boolean;
    variant?: "primary" | "secondary";
};

const MarkdownButton: React.FC<MarkdownButtonProps> = (props) => {
    const router = useRouter();
    const { link, isLocal } = useWebLink(props.href);

    const onClick = useCallback(
        (event: React.MouseEvent) => {
            if (isLocal) {
                event.preventDefault();
                router.push(link);
            } else {
                window.open(link, "_blank");
            }
        },
        [isLocal, link, router]
    );

    return (
        <Button {...props} onClick={onClick}>
            {props.children}
        </Button>
    );
};

export default MarkdownButton;
