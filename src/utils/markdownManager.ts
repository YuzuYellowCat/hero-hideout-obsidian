const _markdownPageCache = new Map<string, MarkdownPageProperties>();

export type MarkdownPageProperties = {
    content: string;
    color: string;
    title: string;
    img?: string;
};

export type PageGridCardProperties = MarkdownPageProperties & {
    img: string;
    path: string;
};

export const getDirectMarkdownPage = async (pagePath: string) => {
    const cachePath = getNavigationPath(pagePath);

    if (_markdownPageCache.has(cachePath)) {
        return _markdownPageCache.get(cachePath) ?? null;
    }

    const pageContent = await import(`website-content/pages${pagePath}`).then(
        _dealWithResponse
    );

    return _parseMarkdownText(pageContent, cachePath);
};

export const webPathToMarkdownPage = async (path: string) => {
    if (_markdownPageCache.has(path)) {
        return _markdownPageCache.get(path) ?? null;
    }

    const correctlyFormattedPath = path.endsWith("/")
        ? path.slice(0, -1)
        : path;

    let textContent = await import(
        `website-content/pages${correctlyFormattedPath}/index.md`
    )
        .then(_dealWithResponse)
        .catch(() => {});

    if (!textContent) {
        textContent = await import(
            `website-content/pages${correctlyFormattedPath}.md`
        )
            .then(_dealWithResponse)
            .catch(() => {});
    }

    return _parseMarkdownText(textContent, correctlyFormattedPath);
};

export const getNavigationPath = (filePath: string) => {
    const navPath = filePath.endsWith("/index.md")
        ? filePath.replace("/index.md", "")
        : filePath.replace(".md", "");
    return navPath;
};

const _dealWithResponse = (module: { default: any }) => {
    return fetch(module.default).then((res) => res.text());
};

const _parseMarkdownText = (textContent: string | void, path: string) => {
    if (!textContent) {
        throw new Error("Could not find a page at path " + path);
    }

    const pageNode = rawMarkdownTransform(textContent);
    _markdownPageCache.set(path, pageNode);
    return pageNode;
};

const DEFAULT_PROPERTIES = {
    color: "#ffffff",
    title: "[TITLE NOT FOUND]",
};

export const rawMarkdownTransform = (raw: string) => {
    let content = raw.replace(/---\n[\S\s]+?---/, "");
    const propertiesString = raw.replace(content, "");
    content = content.replaceAll(/\[\[(.*)\|(.*)]\]/g, "[$2]($1)");
    let properties: Partial<MarkdownPageProperties> = {};
    propertiesString.split("\n").forEach((property) => {
        if (property === "---") {
            return undefined;
        }
        const [name, value] = property.split(": ");
        properties[name as keyof MarkdownPageProperties] = value?.replaceAll(
            '"',
            ""
        );
    });
    return {
        content,
        ...DEFAULT_PROPERTIES,
        ...properties,
    };
};

export const scrollToText = (hash: string) => {
    const parsedHash = hash.slice(1).toLowerCase();
    const headers = ["1", "2", "3", "4", "5", "6"].flatMap((num) => {
        return [...document.getElementsByTagName(`h${num}`)];
    });
    for (const element of headers) {
        const elementLink = element.textContent
            ?.replaceAll(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
            .replaceAll(" ", "%20")
            .toLowerCase();
        if (elementLink === parsedHash) {
            element.scrollIntoView();
        }
    }
};
