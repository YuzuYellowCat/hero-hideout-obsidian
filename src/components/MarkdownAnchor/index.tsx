"use client";
import React, { type AnchorHTMLAttributes, useMemo } from "react";
import { useRouter } from "next/navigation";
import "./index.css";
import useWebLink from "hooks/useWebLink";

const MarkdownAnchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
    props
) => {
    const router = useRouter();
    const { link, isLocal } = useWebLink(props.href);

    const anchorNavProps = useMemo(() => {
        if (isLocal) {
            return {
                onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    router.push(link);
                },
                href: "",
                pointerEvents: "none",
            };
        }
        return { href: link, target: "_blank", rel: "noopener noreferrer" };
    }, [isLocal, link, router]);

    return (
        <a className="markdown-anchor" {...props} {...anchorNavProps}>
            {props.children}
        </a>
    );
};

export default MarkdownAnchor;
