import React, { createContext, useMemo, useState } from "react";

export enum ContentLevel {
    SFW = "sfw",
    SUGGESTIVE = "suggestive",
    NSFW = "nsfw",
}

export enum ContentSetting {
    SHOW = "show",
    WARN = "warn",
    HIDE = "hide",
}

type ContentLevelRecordType = Record<ContentLevel, ContentSetting>;

const DEFAULT_CONTENT_LEVEL: ContentLevelRecordType = {
    [ContentLevel.SFW]: ContentSetting.SHOW,
    [ContentLevel.SUGGESTIVE]: ContentSetting.WARN,
    [ContentLevel.NSFW]: ContentSetting.HIDE,
};

type ContentLevelContextType = {
    getVisibilitySetting: (level: ContentLevel) => ContentSetting;
    updateSetting: (level: ContentLevel, value: ContentSetting) => void;
};

export const ContentLevelContext = createContext<ContentLevelContextType>({
    getVisibilitySetting: () => {
        throw new Error("Content Level Context Not Initialized");
    },
    updateSetting: () => {
        throw new Error("Content Level Context Not Initialized");
    },
});

export const ContentLevelProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [contentLevel, setContentLevel] = useState<ContentLevelRecordType>(
        DEFAULT_CONTENT_LEVEL
    );

    const contentLevelInterface = useMemo(
        () => ({
            getVisibilitySetting: (level: ContentLevel) => {
                return contentLevel[level];
            },
            updateSetting: (level: ContentLevel, value: ContentSetting) => {
                setContentLevel({
                    ...contentLevel,
                    [level]: value,
                });
            },
        }),
        [contentLevel]
    );
    return (
        <ContentLevelContext.Provider value={contentLevelInterface}>
            {children}
        </ContentLevelContext.Provider>
    );
};
