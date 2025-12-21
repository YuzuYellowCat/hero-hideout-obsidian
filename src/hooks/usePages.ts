import {
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import { useContext, useEffect, useMemo, useState } from "react";
import {
    getDirectMarkdownPage,
    getNavigationPath,
    isReleasedPage,
} from "utils/markdownUtils";

export type PageComponentProps = {
    folder: string;
};

const usePages = <T extends MarkdownPageProperties>(
    folder: string,
    pageFilter: (page: PageWithPath<T>) => boolean = () => true
) => {
    const { getVisibilitySetting } = useContext(ContentLevelContext);
    const [nodes, setNodes] = useState<PageWithPath<T>[]>([]);
    const pages = useMemo(() => require.context("website-content/pages/"), []);
    const filteredPages = useMemo(
        () =>
            pages
                .keys()
                .filter((page) => page.startsWith(folder))
                .map((page) => page.slice(1)),
        [pages, folder]
    );

    useEffect(() => {
        Promise.all(
            filteredPages.map(async (page) => {
                const directMDPage = (await getDirectMarkdownPage(
                    page
                )) as T | null;
                if (!directMDPage) {
                    return;
                }
                return {
                    ...directMDPage,
                    path: getNavigationPath(page),
                };
            })
        ).then((pages) => {
            const filteredPages = pages.filter((page) => {
                if (
                    !page ||
                    !isReleasedPage(page) ||
                    getVisibilitySetting(page.level) === ContentSetting.HIDE
                ) {
                    return false;
                }
                return pageFilter?.(page);
            }) as PageWithPath<T>[];
            filteredPages.sort((a, b) => {
                if (!a.date || !b.date) {
                    return 0;
                }
                return b.date.getTime() - a.date.getTime();
            });
            setNodes(filteredPages);
        });
    }, [filteredPages, pageFilter, getVisibilitySetting]);

    return nodes;
};

export default usePages;
