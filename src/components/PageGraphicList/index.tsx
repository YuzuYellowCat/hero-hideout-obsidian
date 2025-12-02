import PageGraphicListItem, {
    type PageGraphicListItemProperties,
} from "components/PageGraphicListItem";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentProps } from "hooks/usePages";

const PageGraphicList: React.FC<PageComponentProps> = ({ folder }) => {
    const pageFilter = useCallback((page: PageGraphicListItemProperties) => {
        return !!page.graphic;
    }, []);

    const pages = usePages<PageGraphicListItemProperties>(folder, pageFilter);

    return (
        <div className="page-graphic-list">
            {pages.map((page) => (
                <PageGraphicListItem page={page} key={page.path} />
            ))}
        </div>
    );
};

export default PageGraphicList;
