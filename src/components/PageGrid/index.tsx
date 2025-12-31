"use client";
import PageGridCard from "components/PageGridCard";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentOptions } from "hooks/usePages";

type PageGridProps = PageComponentOptions & {
    size?: "S" | "L";
};

const PageGrid: React.FC<PageGridProps> = (props) => {
    const pageFilter = useCallback((page: ImagePageProperties) => {
        return !!page.img;
    }, []);

    const pages = usePages<ImagePageProperties>(props, pageFilter);
    const gridSize = props.size ?? "L";

    return (
        <div className={`page-grid size-${gridSize}`}>
            {pages.map((page) => (
                <PageGridCard page={page} key={page.path} size={gridSize} />
            ))}
        </div>
    );
};

export default PageGrid;
