import PageGridCard from "components/PageGridCard";
import React, { useEffect, useMemo, useState } from "react";
import {
    getDirectMarkdownPage,
    getNavigationPath,
    PageGridCardProperties,
} from "utils/markdownManager";
import "./index.css";

type PageGridProps = {
    folder: string;
};

const PageGrid: React.FC<PageGridProps> = ({ folder }) => {
    const [nodes, setNodes] = useState<PageGridCardProperties[]>([]);
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
                const test = await getDirectMarkdownPage(page);
                return {
                    ...test,
                    path: getNavigationPath(page),
                };
            })
        ).then((pages) => {
            const filteredPages = pages.filter((page) => {
                return page !== null && page.img;
            }) as PageGridCardProperties[];
            setNodes(filteredPages);
        });
    }, [filteredPages]);

    return (
        <div className="page-grid">
            {nodes.map((node) => (
                <PageGridCard page={node} key={node.title} />
            ))}
        </div>
    );
};

export default PageGrid;
