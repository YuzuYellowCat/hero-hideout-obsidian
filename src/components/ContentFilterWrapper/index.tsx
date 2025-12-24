import {
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import React, { useContext } from "react";
import "./index.css";
import Button from "components/Button";

type ContentFilterWrapperProps = {
    page: PageWithPath<MarkdownPageProperties>;
    size: "S" | "M";
};

const ContentFilterWrapper: React.FC<
    React.PropsWithChildren<ContentFilterWrapperProps>
> = ({ children, page, size }) => {
    const { getVisibilitySetting, setVisibilityOverride } =
        useContext(ContentLevelContext);
    // Don't do anything if the setting for the current level isn't "WARN"
    if (getVisibilitySetting(page) !== ContentSetting.WARN) {
        return <>{children}</>;
    }

    return (
        <div className={`content-filter-wrapper content-filter-size-${size}`}>
            <div className="content-filter-overlay">
                <span className="content-filter-text">
                    This page is {page.level}
                </span>
                <Button
                    className="content-filter-show"
                    onClick={(e) => {
                        e.stopPropagation();
                        setVisibilityOverride(page, ContentSetting.SHOW);
                    }}
                    size={size}
                >
                    Show
                </Button>
            </div>
            <div className="content-filter-children">{children}</div>
        </div>
    );
};

export default ContentFilterWrapper;
