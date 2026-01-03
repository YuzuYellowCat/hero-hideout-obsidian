"use client";
import React, { createContext, useMemo, useState } from "react";

export enum ContentLevel {
    SFW = "SFW",
    SUGGESTIVE = "suggestive",
    NSFW = "NSFW",
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
    [ContentLevel.NSFW]: ContentSetting.WARN,
};

type ContentLevelContextType = {
    getVisibilitySetting: (
        pageOverride?: PageWithPath<MarkdownPageProperties>
    ) => ContentSetting;
    setVisibilityOverride: (
        value: ContentSetting,
        pageOverride?: PageWithPath<MarkdownPageProperties>
    ) => void;
    updateSetting: (level: ContentLevel, value: ContentSetting) => void;
};

export const ContentLevelContext = createContext<ContentLevelContextType>({
    getVisibilitySetting: () => {
        throw new Error("Content Level Context Not Initialized");
    },
    setVisibilityOverride: () => {
        throw new Error("Content Level Context Not Initialized");
    },
    updateSetting: () => {
        throw new Error("Content Level Context Not Initialized");
    },
});

export const ContentLevelProvider: React.FC<
    React.PropsWithChildren<{ page: PageWithPath<MarkdownPageProperties> }>
> = ({ children, page }) => {
    const [contentLevel, setContentLevel] = useState<ContentLevelRecordType>(
        DEFAULT_CONTENT_LEVEL
    );
    const [pageViewOverrides, setPageViewOverrides] = useState<
        Map<string, ContentSetting>
    >(new Map());

    const contentLevelInterface = useMemo(
        () => ({
            getVisibilitySetting: (
                pageOverride?: PageWithPath<MarkdownPageProperties>
            ) => {
                return (
                    pageViewOverrides.get(pageOverride?.path ?? page.path) ??
                    contentLevel[
                        (pageOverride?.level ?? page.level) as ContentLevel
                    ]
                );
            },
            setVisibilityOverride: (
                value: ContentSetting,
                pageOverride?: PageWithPath<MarkdownPageProperties>
            ) => {
                const newMap = new Map(pageViewOverrides);
                newMap.set(pageOverride?.path ?? page.path, value);
                setPageViewOverrides(newMap);
            },
            updateSetting: (level: ContentLevel, value: ContentSetting) => {
                setContentLevel({
                    ...contentLevel,
                    [level]: value,
                });
            },
        }),
        [contentLevel, pageViewOverrides]
    );
    return (
        <ContentLevelContext.Provider value={contentLevelInterface}>
            {children}
        </ContentLevelContext.Provider>
    );
};
