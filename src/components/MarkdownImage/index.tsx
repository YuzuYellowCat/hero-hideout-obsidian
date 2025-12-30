"use client";
import { DialogContext } from "contexts/dialogContext";
import React, { ImgHTMLAttributes, useCallback, useMemo } from "react";

const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (
    props
) => {
    const { showDialog, clearDialog } = React.useContext(DialogContext);
    const [imageName] = props.src ? props.src.split(".") : [""];
    if (!imageName) {
        return <></>;
    }

    const imageProps = useMemo(
        () => ({
            ...props,
            alt: props.alt ?? "An image",
        }),
        [props]
    );

    const showThisAsDialog = useCallback(() => {
        showDialog(
            <img
                {...imageProps}
                tabIndex={0}
                src={`/images/full/${imageName}.webp`}
                onKeyDown={(e) => {
                    if (e.code === "Escape") {
                        clearDialog();
                    }
                }}
            />
        );
    }, [showDialog, clearDialog, imageProps]);

    return (
        <img
            className="md-img"
            {...imageProps}
            src={`/images/full-optimized/${imageName}.webp`}
            tabIndex={0}
            onClick={showThisAsDialog}
            onKeyDown={(e) => {
                if (e.code === "Enter") {
                    showThisAsDialog();
                }
            }}
        />
    );
};

export default MarkdownImage;
