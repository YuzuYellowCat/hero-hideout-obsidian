import React, { type AnchorHTMLAttributes, useMemo } from "react";
import { useNavigate } from "react-router";
import "./index.css";
import useWebLink from "hooks/useWebLink";

const MarkdownAnchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
    props
) => {
    const navigate = useNavigate();
    const { link, isLocal } = useWebLink(props.href);

    const anchorNavProps = useMemo(() => {
        if (isLocal) {
            return {
                onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    navigate(link);
                },
                href: "",
                pointerEvents: "none",
            };
        }
        return { href: link, target: "_blank", rel: "noopener noreferrer" };
    }, [isLocal, link, navigate]);

    return (
        <a className="markdown-anchor" {...props} {...anchorNavProps}>
            {props.children}
        </a>
    );
};

export default MarkdownAnchor;
