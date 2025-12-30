"use client";
import { DialogContext } from "contexts/dialogContext";
import React, { ImgHTMLAttributes, useCallback, useMemo } from "react";

const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (
    props
) => {
    const { showDialog, clearDialog } = React.useContext(DialogContext);
    const imageProps = useMemo(
        () => ({
            ...props,
            src: `/images/${props.src}`,
            alt: props.alt ?? "An image",
        }),
        [props]
    );

    const showThisAsDialog = useCallback(() => {
        showDialog(
            <img
                {...imageProps}
                tabIndex={0}
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
