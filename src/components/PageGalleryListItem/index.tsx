import React from "react";
import "./index.css";
import PagePreviewSection from "components/PagePreviewSection";

type PageGalleryListItemProps = {
    page: PageWithPath<PageGalleryListItemProperties>;
};

const PageGalleryListItem: React.FC<PageGalleryListItemProps> = ({ page }) => {
    return (
        <div className="page-graphic-list-item">
            <PagePreviewSection
                title={page.title}
                navigationPath={page.path}
                color={page.color}
                hasFlourish={true}
                fullHover
            ></PagePreviewSection>
        </div>
    );
};

export default PageGalleryListItem;
