"use client";
import {
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import { useContext, useMemo } from "react";
import usePageData from "./usePageData";
import { useSearchParams } from "next/navigation";
import { isPageReleased } from "utils/markdownClientUtils";

export type PageComponentOptions = {
    folder?: string;
    tags?: string[];
};

const usePages = <T extends MarkdownPageProperties>(
    options: PageComponentOptions,
    pageFilter: (page: PageWithPath<T>) => boolean = () => true
) => {
    const { getVisibilitySetting } = useContext(ContentLevelContext);
    const pages = usePageData();
    const searchParams = useSearchParams();
    const filteredPages = useMemo(
        () =>
            pages
                .keys()
                .toArray()
                .filter((path) =>
                    options.folder ? path.startsWith(options.folder) : true
                )
                .map(
                    (path) =>
                        ({
                            path,
                            ...pages.get(path),
                        } as PageWithPath<T>)
                )
                .filter((page) => {
                    const tags =
                        searchParams.get("tags")?.split(",") ?? options.tags;
                    if (
                        !page ||
                        !isPageReleased(page) ||
                        getVisibilitySetting(page) === ContentSetting.HIDE ||
                        page.tags?.includes("hidden") ||
                        (tags &&
                            !tags?.every(
                                (tag) => page.tags && page.tags.includes(tag)
                            ))
                    ) {
                        return false;
                    }
                    return pageFilter?.(page);
                })
                .sort((a, b) => {
                    if (!a.date || !b.date) {
                        return 0;
                    }
                    return b.date.getTime() - a.date.getTime();
                }),
        [pages, options, getVisibilitySetting, pageFilter]
    );

    return filteredPages;
};

export default usePages;
