import { useEffect, useMemo, useState } from "react";
import {
    getDirectMarkdownPage,
    getNavigationPath,
    type MarkdownPageProperties,
} from "utils/markdownManager";

export type PageComponentProps = {
    folder: string;
};

export type PageWithPath<T> = T & {
    path: string;
};

const usePages = <T extends MarkdownPageProperties>(
    folder: string,
    pageFilter: (page: PageWithPath<T>) => boolean = () => true
) => {
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
                if (!page) {
                    return false;
                }
                return pageFilter?.(page);
            }) as PageWithPath<T>[];
            setNodes(filteredPages);
        });
    }, [filteredPages, pageFilter]);

    return nodes;
};

export default usePages;
