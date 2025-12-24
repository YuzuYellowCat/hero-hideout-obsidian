import React from "react";
import { Helmet } from "react-helmet";

type MetaHandlerProps = {
    page: PageWithPath<GeneralPageType>;
};

const MetaHandler: React.FC<MetaHandlerProps> = ({ page }) => {
    const optionalMetaTags = [];

    // If there's an image string, we want to add image-specific info into it
    if ((page as ImagePageProperties).img) {
        const imagePage = page as ImagePageProperties;
        optionalMetaTags.push(
            <meta
                property="og:image"
                content={require(`website-content/images/${imagePage.img}`)}
            />,
            <meta property="og:image:alt" content="TODO put alt text here" />
        );

        // Only add article meta tags for image pages
        if (imagePage.author) {
            optionalMetaTags.push(
                <meta property="article:author" content={imagePage.author} />
            );
        }

        const pathSections = page.path.split("/").filter((x) => x);
        if (pathSections.length > 1) {
            optionalMetaTags.push(
                <meta
                    property="article:section"
                    content={pathSections[pathSections.length - 2]}
                />
            );
        }

        if (page.date) {
            optionalMetaTags.push(
                <meta
                    property="article:published_time"
                    content={page.date.toISOString()}
                />
            );
        }
    }

    return (
        <Helmet>
            <title>{page.title}</title>
            <meta property="og:title" content={page.title} />
            <meta property="og:type" content="website" />
            <meta
                property="og:url"
                content={`https://yuzucat.com${page.path}`}
            />
            <meta property="og:site_name" content="yuzucat.com" />
            {optionalMetaTags}
        </Helmet>
    );
};

export default MetaHandler;
