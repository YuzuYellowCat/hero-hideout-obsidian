"use client";
import PageGalleryListItem from "components/PageGalleryListItem";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentProps } from "hooks/usePages";

const PageGraphicList: React.FC<PageComponentProps> = ({ folder }) => {
    const pageFilter = useCallback((page: GalleryPageProperties) => {
        return page.isGallery === "true";
    }, []);

    const pages = usePages<GalleryPageProperties>(folder, pageFilter);

    return (
        <div className="page-graphic-list">
            {pages.map((page) => (
                <PageGalleryListItem page={page} key={page.path} />
            ))}
        </div>
    );
};

export default PageGraphicList;
