import React, { useMemo } from "react";
import "./index.css";
import LoadingBox from "components/LoadingBox";
import useImageLoaded from "hooks/useImageLoaded";
import PagePreviewSection from "components/PagePreviewSection";
import ContentFilterWrapper from "components/ContentFilterWrapper";
import Image from "next/image";

type PageGridCardProps = {
    page: PageWithPath<ImagePageProperties>;
    size?: "S" | "L";
};

const PageGridCard: React.FC<PageGridCardProps> = ({ page, size = "L" }) => {
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
                    <ContentFilterWrapper page={page} size="S">
                        <Image
                            src={`/images/${page.img}`}
                            width={0}
                            height={0}
                            sizes="300px"
                            alt={`A card for the page "${page.title}"`}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </ContentFilterWrapper>
                </div>
            </PagePreviewSection>
        </div>
    );
};

export default PageGridCard;
