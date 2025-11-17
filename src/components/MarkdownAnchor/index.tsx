import React, { AnchorHTMLAttributes } from "react";

const MarkdownAnchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
    props
) => {
    console.log(props);
    let link = props.href || "";
    if (link.startsWith("pages")) {
        link = link?.replace("pages", "");
        link = link?.replace("/index", "");
    }
    return (
        <a {...props} href={link}>
            {props.children}
        </a>
    );
};

export default MarkdownAnchor;
