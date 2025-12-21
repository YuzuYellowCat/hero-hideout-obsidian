import { DialogContext } from "contexts/dialogContext";
import React, { ImgHTMLAttributes, useCallback, useMemo } from "react";

const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (
    props
) => {
    const { showDialog, clearDialog } = React.useContext(DialogContext);
    const imageProps = useMemo(
        () => ({
            ...props,
            src: require(`website-content/images/${props.src}`),
        }),
        [props]
    );

    const showThisAsDialog = useCallback(() => {
        showDialog(
            <img
                {...imageProps}
                alt={imageProps.alt}
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
            alt={imageProps.alt}
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
