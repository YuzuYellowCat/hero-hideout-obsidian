"use client";
import PageGalleryListItem from "components/PageGalleryListItem";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentOptions } from "hooks/usePages";

const PageGraphicList: React.FC<PageComponentOptions> = (props) => {
    const pages = usePages<GalleryPageProperties>(props);

    return (
        <div className="page-graphic-list">
            {pages.map((page) => (
                <PageGalleryListItem page={page} key={page.path} />
            ))}
        </div>
    );
};

export default PageGraphicList;
