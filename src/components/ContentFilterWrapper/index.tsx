"use client";
import {
    CONTENT_LEVEL_COLOR_MAP,
    ContentLevel,
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import React, { useContext } from "react";
import "./index.css";
import Button from "components/Button";

type ContentFilterWrapperProps = {
    page: PageWithPath<MarkdownPageProperties>;
    size: "S" | "M";
    loaded?: boolean;
    preventClick?: boolean;
};

const ContentFilterWrapper: React.FC<
    React.PropsWithChildren<ContentFilterWrapperProps>
> = ({ children, page, size, loaded = true, preventClick = false }) => {
    const { getVisibilitySetting, setVisibilityOverride } =
        useContext(ContentLevelContext);

    // Don't do anything if the setting for the current level isn't "WARN"
    if (getVisibilitySetting(page) !== ContentSetting.WARN || !loaded) {
        return <>{children}</>;
    }

    return (
        <div className={`content-filter-wrapper content-filter-size-${size}`}>
            <div className="content-filter-overlay">
                <span className="content-filter-text">
                    This page is{" "}
                    <span
                        style={{
                            color: CONTENT_LEVEL_COLOR_MAP[
                                page.level as ContentLevel
                            ],
                            fontWeight: "bold",
                        }}
                    >
                        {page.level}
                    </span>
                </span>
                <Button
                    className="content-filter-show"
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisibilityOverride(ContentSetting.SHOW, page);
                    }}
                    size={size}
                >
                    Show
                </Button>
            </div>
            <div
                className="content-filter-children"
                style={{
                    pointerEvents: preventClick ? "none" : "inherit",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ContentFilterWrapper;
