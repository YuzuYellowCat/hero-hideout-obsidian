import React, { useEffect, useState } from "react";
import PageWrapper from "components/PageWrapper";
import ReactMarkdown from "react-markdown";
import "./index.css";
import MarkdownImage from "components/MarkdownImage";
import MarkdownAnchor from "components/MarkdownAnchor";

type MarkdownPageData = {
    content: string;
    color: string;
    title: string;
};

const _rawMarkdownTransform = (raw: string) => {
    let content = raw.replace(/---\n[\S\s]+?---/, "");
    const propertiesString = raw.replace(content, "");
    console.log(propertiesString);
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

type MarkdownPageProps = {
    path: string;
};

const MarkdownPage: React.FC<MarkdownPageProps> = ({ path }) => {
    const [page, setPage] = useState<MarkdownPageData>();

    useEffect(() => {
        const test = require(`website-content/pages/${path}.md`);
        fetch(test)
            .then((res) => res.text())
            .then((res) => {
                setPage(_rawMarkdownTransform(res));
            });
    }, [path]);

    return (
        <PageWrapper color={page?.color} title={page?.title}>
            <div className="markdown-page">
                <ReactMarkdown
                    components={{
                        img: MarkdownImage,
                        a: MarkdownAnchor,
                    }}
                >
                    {page?.content}
                </ReactMarkdown>
            </div>
        </PageWrapper>
    );
};

export default MarkdownPage;
