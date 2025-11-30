import React, { useEffect, useState } from "react";
import PageWrapper from "components/PageWrapper";
import ReactMarkdown from "react-markdown";
import "./index.css";
import MarkdownImage from "components/MarkdownImage";
import MarkdownAnchor from "components/MarkdownAnchor";
import { useLocation } from "react-router";
import NotFound from "pages/NotFound";
import {
    scrollToText,
    webPathToMarkdownPage,
    type MarkdownPageProperties,
} from "utils/markdownManager";
import ComponentInsert from "components/ComponentInsert";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<MarkdownPageProperties | null>(null);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        setPage(null);
        webPathToMarkdownPage(location.pathname)
            .then((pageNode) => {
                setPage(pageNode);
                scrollToText(location.hash);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    }, [location.pathname, location.hash]);

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
                        div: ComponentInsert,
                    }}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    skipHtml={false}
                >
                    {page?.content}
                </ReactMarkdown>
            </div>
        </PageWrapper>
    );
};

export default MarkdownPage;
