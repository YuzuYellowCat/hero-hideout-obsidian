"use client";
import {
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import { DialogContext } from "contexts/dialogContext";
import usePageData from "hooks/usePageData";
import React, {
    ImgHTMLAttributes,
    useCallback,
    useContext,
    useMemo,
} from "react";

const MarkdownImage: React.FC<ImgHTMLAttributes<HTMLImageElement>> = (
    props
) => {
    const { showDialog, clearDialog } = React.useContext(DialogContext);
    const pageData = usePageData();
    const { getVisibilitySetting } = useContext(ContentLevelContext);
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
        if (getVisibilitySetting() !== ContentSetting.SHOW) {
        }
        showDialog(
            <img
                {...imageProps}
                tabIndex={0}
                src={`/images/full-optimized/${imageName}.webp`}
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
