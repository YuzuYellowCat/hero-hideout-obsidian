"use client";
import {
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import { useContext, useMemo } from "react";
import usePageData from "./usePageData";
import { isPageReleased } from "utils/markdownClientUtils";

export type PageComponentProps = {
    folder: string;
};

const usePages = <T extends MarkdownPageProperties>(
    folder: string,
    pageFilter: (page: PageWithPath<T>) => boolean = () => true
) => {
    const { getVisibilitySetting } = useContext(ContentLevelContext);
    const pages = usePageData();
    const filteredPages = useMemo(
        () =>
            pages
                .keys()
                .toArray()
                .filter((path) => path.startsWith(folder))
                .map(
                    (path) =>
                        ({
                            path,
                            ...pages.get(path),
                        } as PageWithPath<T>)
                )
                .filter((page) => {
                    if (
                        !page ||
                        !isPageReleased(page) ||
                        getVisibilitySetting(page) === ContentSetting.HIDE
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
        [pages, folder, getVisibilitySetting, pageFilter]
    );

    return filteredPages;
};

export default usePages;
