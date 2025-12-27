import React from "react";
import PageWrapper from "components/PageWrapper";
import ReactMarkdown from "react-markdown";
import "./index.css";
import MarkdownImage from "components/MarkdownImage";
import MarkdownAnchor from "components/MarkdownAnchor";
import NotFound from "pages/NotFound";
import ComponentInsert from "components/ComponentInsert";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownButton from "components/MarkdownButton";
import ContentFilterWrapper from "components/ContentFilterWrapper";
import MetaHandler from "components/MetaHandler";
import { isPageReleased } from "utils/markdownClientUtils";

const MarkdownPage: React.FC<{ page?: PageWithPath<GeneralPageType> }> = ({
    page,
}) => {
    if (page === undefined || !isPageReleased(page)) {
        return <NotFound />;
    }

    return (
        <PageWrapper color={page.color} title={page.title}>
            <div className="markdown-page">
                <ContentFilterWrapper page={page} size="M">
                    <ReactMarkdown
                        components={{
                            img: MarkdownImage,
                            a: MarkdownAnchor,
                            div: ComponentInsert,
                            button: MarkdownButton,
                        }}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        skipHtml={false}
                    >
                        {page.content}
                    </ReactMarkdown>
                </ContentFilterWrapper>
            </div>
        </PageWrapper>
    );
};

export default MarkdownPage;
