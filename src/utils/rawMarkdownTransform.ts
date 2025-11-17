export type MarkdownPageData = {
    content: string;
    color: string;
    title: string;
};

export const rawMarkdownTransform = (raw: string) => {
    let content = raw.replace(/---\n[\S\s]+?---/, "");
    const propertiesString = raw.replace(content, "");
    content = content.replaceAll(/\[\[(.*)\|(.*)]\]/g, "[$2]($1)");
    let properties: Partial<MarkdownPageData> = {};
    propertiesString.split("\n").forEach((property) => {
        if (property === "---") {
            return undefined;
        }
        const [name, value] = property.split(": ");
        properties[name as keyof MarkdownPageData] = value?.replaceAll('"', "");
    });
    return {
        content,
        color: properties.color ?? "#ffffff",
        title: properties.title ?? "[TITLE NOT FOUND]",
    };
};
