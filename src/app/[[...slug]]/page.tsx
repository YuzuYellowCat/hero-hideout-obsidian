import App from "App";
import {
    getNavigationPath,
    getDirectMarkdownPage,
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
