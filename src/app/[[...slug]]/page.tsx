import App from "App";
import type { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import {
    getNavigationPath,
    getDirectMarkdownPage,
    slugToPage,
} from "utils/markdownServerUtils";

const pageContext = require.context("website-content/pages");
const fullKeys = [""].concat(pageContext.keys());

const pageCache = new Map<string, GeneralPageType>();

fullKeys.forEach((path) => {
    const navPath = getNavigationPath(path, true);
    const page = getDirectMarkdownPage(path);
    if (page) {
        pageCache.set(navPath, page);
    }
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = slugToPage(slug, pageCache);
    let optionalMetadata: OpenGraph = {};
    if ((page as ImagePageProperties).img) {
        const imagePage = page as ImagePageProperties;
        const pathSections = page.path.split("/").filter((x) => x);
        optionalMetadata = {
            type: "article",
            authors: imagePage.author,
            images: {
                url: `/images/${imagePage.img}`,
                alt: `Cover image for ${imagePage.title}`,
            },
            ...(imagePage.date
                ? { publishedTime: imagePage.date.toISOString() }
                : {}),
            ...(pathSections.length > 2
                ? { section: pathSections[pathSections.length - 2] }
                : {}),
        };
    }

    const metaData: Metadata = {
        title: page.title,
        openGraph: {
            type: "website",
            url: `https://yuzucat.com${page.path}`,
            siteName: "yuzucat.com",
            title: page.title,
            ...optionalMetadata,
        },
    };

    return metaData;
}

export function generateStaticParams() {
    return fullKeys.map((path) => ({
        slug: getNavigationPath(path, true).split("/"),
    }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    return <App slug={slug} pageData={pageCache} />;
}
