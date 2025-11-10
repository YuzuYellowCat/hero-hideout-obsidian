import React, { ImgHTMLAttributes } from "react";

const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (
    props
) => {
    return (
        <img
            {...props}
            src={require(`website-content/images/${props.src}`)}
            alt={props.alt}
        />
    );
};

export default MarkdownImage;
