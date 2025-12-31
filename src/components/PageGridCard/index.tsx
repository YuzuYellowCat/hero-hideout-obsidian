import React, { useMemo } from "react";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";
import PagePreviewSection from "components/PagePreviewSection";
import ContentFilterWrapper from "components/ContentFilterWrapper";

type PageGridCardProps = {
    page: PageWithPath<ImagePageProperties>;
    size?: "S" | "L";
};

const PageGridCard: React.FC<PageGridCardProps> = ({ page, size = "L" }) => {
    const [ref, loaded, onLoad] = useImageLoaded();
    const [imageName] = page.img.split(".");
    return (
        <div className={`page-grid-card card-size-${size}`}>
            <PagePreviewSection
                title={page.title}
                navigationPath={`/${page.path}`}
                color={page.color}
                hasFlourish={false}
                size={size}
                fullHover
                subtitle={page.author ? `by ${page.author}` : ""}
            >
                <div className="page-thumbnail-wrapper">
                    <ContentFilterWrapper page={page} size="S" loaded={loaded}>
                        {!loaded && <LoadingBox />}
                        <img
                            src={`/images/thumbnail/${imageName}.webp`}
                            alt={`A card for the page "${page.title}"`}
                            ref={ref}
                            onLoad={onLoad}
                        />
                    </ContentFilterWrapper>
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default PageGridCard;
