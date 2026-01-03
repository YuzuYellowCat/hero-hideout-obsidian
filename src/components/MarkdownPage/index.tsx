import React from "react";
import PageWrapper from "components/PageWrapper";
import ReactMarkdown from "react-markdown";
import "./index.css";
import MarkdownImage from "components/MarkdownImage";
import MarkdownAnchor from "components/MarkdownAnchor";
import ComponentInsert from "components/ComponentInsert";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownButton from "components/MarkdownButton";
import ContentFilterWrapper from "components/ContentFilterWrapper";
import { isPageReleased } from "utils/markdownClientUtils";
import { slugToPage } from "utils/markdownServerUtils";
import TagDisplay from "components/TagDisplay";
import DateDisplay from "components/DateDisplay";

const MarkdownPage: React.FC<{
    page?: PageWithPath<GeneralPageType>;
    pageData: Map<string, GeneralPageType>;
}> = ({ page, pageData }) => {
    let definedPage = page;
    if (definedPage === undefined || !isPageReleased(definedPage)) {
        definedPage = slugToPage(["404"], pageData);
    }

    return (
        <PageWrapper color={definedPage.color} title={definedPage.title}>
            <div className="markdown-page">
                <ContentFilterWrapper page={definedPage} size="M" preventClick>
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
                        {definedPage.content}
                    </ReactMarkdown>
                </ContentFilterWrapper>
            </div>
            <div className="page-footer">
                <TagDisplay tags={definedPage.tags} />
                <DateDisplay date={definedPage.date} />
            </div>
        </PageWrapper>
    );
};

export default MarkdownPage;
