import fs from "fs";
import path from "path";

export const getDirectMarkdownPage = (pagePath: string) => {
    const pageContent = getPage(pagePath);

    return _parseMarkdownText(pageContent);
};

export const getPage = (pagePath: string) => {
    const fullPath = path.join(
        process.cwd(),
        "src",
        "website-content",
        "pages",
        pagePath
    );
    try {
        const contents = fs.readFileSync(fullPath, "utf8");
        return contents;
    } catch {
        return undefined;
    }
};

export const slugToPage = (
    slug: string[],
    pageData: Map<string, GeneralPageType>
) => {
    const path = slug?.join("/");
    const page = pageData.get(path ?? "") ?? pageData.get("404");
    return { ...page, path } as PageWithPath<GeneralPageType>;
};

export const webPathToMarkdownPage = (path: string) => {
    const correctlyFormattedPath = path.endsWith("/")
        ? path.slice(0, -1)
        : path;

    let textContent = getPage(`${correctlyFormattedPath}/index.md`);

    if (!textContent) {
        textContent = getPage(`${correctlyFormattedPath}.md`);
    }

    return _parseMarkdownText(textContent);
};

export const getNavigationPath = (filePath: string, cutFront = false) => {
    let navPath = filePath;
    navPath = navPath.endsWith("/index.md")
        ? navPath.replace("/index.md", "")
        : navPath.replace(".md", "");
    if (cutFront) {
        if (navPath.startsWith(".")) {
            navPath = navPath.slice(1);
        }
        if (navPath.startsWith("/")) {
            navPath = navPath.slice(1);
        }
    }

    return navPath;
};

const _parseMarkdownText = (textContent: string | void) => {
    if (!textContent) {
        // Could not find a page at this path
        return;
    }

    const pageNode = rawMarkdownTransform(textContent);
    return pageNode;
};

const DEFAULT_PROPERTIES = {
    color: "#ffffff",
    title: "[TITLE NOT FOUND]",
    level: "SFW",
};

export const rawMarkdownTransform = (raw: string) => {
    let content = raw.replace(/---\n[\S\s]+?---/, "");
    const propertiesString = raw.replace(content, "");
    content = content.replaceAll(/\[\[(.*)\|(.*)]\]/g, "[$2]($1)");
    let properties: { [key: string]: any } = {};
    propertiesString.split("\n").forEach((property) => {
        if (property === "---") {
            return undefined;
        }
        const [name, value] = property.split(": ");
        properties[name] = value?.replaceAll('"', "");
    });
    if (properties.date) {
        properties.date = new Date(properties.date);
        if (properties.date.valueOf() > Date.now().valueOf()) {
            // This page has not been released yet
            return;
        }
    }
    if (properties.isNSFW === "true") {
        properties.level = "NSFW";
        delete properties.isNSFW;
    } else if (properties.isSuggestive === "true") {
        properties.level = "suggestive";
        delete properties.isSuggestive;
    }

    const page = {
        content,
        ...DEFAULT_PROPERTIES,
        ...properties,
    };

    return page as GeneralPageType;
};
