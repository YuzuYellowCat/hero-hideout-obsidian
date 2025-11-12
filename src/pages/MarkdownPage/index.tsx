import React, { useEffect, useState } from "react";
import PageWrapper from "components/PageWrapper";
import ReactMarkdown from "react-markdown";
import "./index.css";
import MarkdownImage from "components/MarkdownImage";
import MarkdownAnchor from "components/MarkdownAnchor";
import { useLocation } from "react-router";
import NotFound from "pages/NotFound";

type MarkdownPageData = {
    content: string;
    color: string;
    title: string;
};

const _rawMarkdownTransform = (raw: string) => {
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

const MarkdownPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<MarkdownPageData | null>(null);
    const location = useLocation();

    useEffect(() => {
        (async () => {
            setLoading(true);
            setPage(null);
            const correctlyFormattedPath = location.pathname.endsWith("/")
                ? location.pathname.slice(0, -1)
                : location.pathname;
            let textContent = await import(
                `website-content/pages${correctlyFormattedPath}/index.md`
            )
                .then((module) => fetch(module.default))
                .then((res) => res.text())
                .catch(() => {});
            if (!textContent) {
                textContent = await import(
                    `website-content/pages${correctlyFormattedPath}.md`
                )
                    .then((module) => fetch(module.default))
                    .then((res) => res.text())
                    .catch(() => {});
            }

            if (textContent) {
                setPage(_rawMarkdownTransform(textContent));
            }
            setLoading(false);
        })();
    }, [location.pathname]);

    if (loading) {
        return <></>;
    }

    if (!loading && page === null) {
        return <NotFound />;
    }

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
