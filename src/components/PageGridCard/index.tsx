import React from "react";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";
import { PageGridCardProperties } from "utils/markdownManager";
import PagePreviewSection from "components/PagePreviewSection";

type PageGridCardProps = {
    page: PageGridCardProperties;
};

const PageGridCard: React.FC<PageGridCardProps> = ({ page }) => {
    const [ref, loaded, onLoad] = useImageLoaded();

    return (
        <div className="page-grid-card">
            <PagePreviewSection
                title={page.title}
                navigationPath={page.path}
                color={page.color}
                hasFlourish={false}
                fullHover
            >
                <div className="page-thumbnail-wrapper">
                    {!loaded && <LoadingBox />}
                    <img
                        src={require(`website-content/images/${page.img}`)}
                        alt={`A card for the page "${page.title}"`}
                        ref={ref}
                        onLoad={onLoad}
                    />
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default PageGridCard;
