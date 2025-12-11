import React from "react";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";
import PagePreviewSection from "components/PagePreviewSection";

type PageGridCardProps = {
    page: PageWithPath<PageGridCardProperties>;
    size?: "S" | "L";
};

const PageGridCard: React.FC<PageGridCardProps> = ({ page, size = "L" }) => {
    const [ref, loaded, onLoad] = useImageLoaded();

    return (
        <div className={`page-grid-card card-size-${size}`}>
            <PagePreviewSection
                title={page.title}
                navigationPath={page.path}
                color={page.color}
                hasFlourish={false}
                size={size}
                fullHover
                subtitle={page.author ? `by ${page.author}` : ""}
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
