import React from "react";
import PagePreviewSection from "components/PagePreviewSection";
import { ReactComponent as Paw } from "images/paw.svg";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";
import { MarkdownPageProperties } from "utils/markdownManager";

type PagePreviewProps = {
    page: MarkdownPageProperties;
};

const PagePreview: React.FC<PagePreviewProps> = ({ page }) => {
    const [ref, loaded, onLoad] = useImageLoaded();

    const thumbnail = page.img ? (
        <img
            className="character-thumbnail"
            src={require(`website-content/images/${page.img}`)}
            alt={`Associated with the page ${page.title}`}
            ref={ref}
            onLoad={onLoad}
        />
    ) : (
        <div className="character-thumbnail">
            <Paw stroke={page.color} strokeWidth={4} />
        </div>
    );
    return (
        <div className="character-preview">
            <PagePreviewSection
                title={page.title}
                navigationPath={`/characters/${page.title}`}
                color={page.color}
                hasFlourish={false}
                fullHover
            >
                <div className="character-thumbnail-wrapper">
                    {!loaded && <LoadingBox />}
                    {thumbnail}
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default PagePreview;
