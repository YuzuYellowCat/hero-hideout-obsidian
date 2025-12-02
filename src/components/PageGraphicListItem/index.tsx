import React from "react";
import "./index.css";
import { PageWithPath } from "hooks/usePages";
import { MarkdownPageProperties } from "utils/markdownManager";
import { useNavigate } from "react-router";

export type PageGraphicListItemProperties = MarkdownPageProperties & {
    graphic: string;
};

type PageGraphicListItemProps = {
    page: PageWithPath<PageGraphicListItemProperties>;
};

const PageGraphicListItem: React.FC<PageGraphicListItemProps> = ({ page }) => {
    const navigate = useNavigate();
    return (
        <div
            className="page-graphic-list-item"
            onClick={() => navigate(page.path)}
            style={{ color: page.color }}
        >
            {page.title}
        </div>
    );
};

export default PageGraphicListItem;
