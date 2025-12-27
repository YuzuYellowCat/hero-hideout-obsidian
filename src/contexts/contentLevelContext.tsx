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
        page: PageWithPath<MarkdownPageProperties>
    ) => ContentSetting;
    setVisibilityOverride: (
        page: PageWithPath<MarkdownPageProperties>,
        value: ContentSetting
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

export const ContentLevelProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [contentLevel, setContentLevel] = useState<ContentLevelRecordType>(
        DEFAULT_CONTENT_LEVEL
    );
    const [pageViewOverrides, setPageViewOverrides] = useState<
        Map<string, ContentSetting>
    >(new Map());

    const contentLevelInterface = useMemo(
        () => ({
            getVisibilitySetting: (
                page: PageWithPath<MarkdownPageProperties>
            ) => {
                return (
                    pageViewOverrides.get(page.path) ??
                    contentLevel[page.level as ContentLevel]
                );
            },
            setVisibilityOverride: (
                page: PageWithPath<MarkdownPageProperties>,
                value: ContentSetting
            ) => {
                const newMap = new Map(pageViewOverrides);
                newMap.set(page.path, value);
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
