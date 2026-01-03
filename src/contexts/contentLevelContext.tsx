"use client";
import React, { createContext, useEffect, useMemo, useState } from "react";

export enum ContentLevel {
    SFW = "SFW",
    SUGGESTIVE = "suggestive",
    NSFW = "NSFW",
}

export const CONTENT_LEVEL_COLOR_MAP: Record<ContentLevel, string> =
    Object.freeze({
        [ContentLevel.SFW]: "#0d0",
        [ContentLevel.SUGGESTIVE]: "#dd0",
        [ContentLevel.NSFW]: "#d00",
    });

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
    getVisibilitySetting: (
        pageOverride?: PageWithPath<MarkdownPageProperties>
    ) => ContentSetting;
    setVisibilityOverride: (
        value: ContentSetting,
        pageOverride?: PageWithPath<MarkdownPageProperties>
    ) => void;
    getGlobalSetting: (level: ContentLevel) => ContentSetting;
    updateSetting: (level: ContentLevel, value: ContentSetting) => void;
};

const _notInitialized = () => {
    throw new Error("Content Level Context Not Initialized");
};

const _getLocalStorageKey = (level: ContentLevel) => {
    return `contentLevelSetting_${level}`;
};

export const ContentLevelContext = createContext<ContentLevelContextType>({
    getVisibilitySetting: _notInitialized,
    setVisibilityOverride: _notInitialized,
    getGlobalSetting: _notInitialized,
    updateSetting: _notInitialized,
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

    useEffect(() => {
        Object.values(ContentLevel).forEach((level) => {
            const localStorageValue = localStorage.getItem(
                _getLocalStorageKey(level)
            );
            if (
                localStorageValue &&
                Object.values(ContentSetting).some(
                    (setting) => setting.toString() === localStorageValue
                )
            ) {
                setContentLevel((old) => ({
                    ...old,
                    [level]: localStorageValue,
                }));
            }
        });
    }, []);

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
            getGlobalSetting: (level: ContentLevel) => {
                return contentLevel[level];
            },
            updateSetting: (level: ContentLevel, value: ContentSetting) => {
                localStorage.setItem(_getLocalStorageKey(level), value);
                setContentLevel((old) => ({
                    ...old,
                    [level]: value,
                }));
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
