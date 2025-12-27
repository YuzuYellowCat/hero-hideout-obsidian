import { ContentLevelProvider } from "contexts/contentLevelContext";
import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import { DialogProvider } from "contexts/dialogContext";
import MarkdownPage from "pages/MarkdownPage";
import { PageDataProvider } from "contexts/pageDataContext";
import MetaHandler from "components/MetaHandler";

const App: React.FC<{
    slug?: string[];
    pageData: Map<string, GeneralPageType>;
}> = ({ slug, pageData }) => {
    const path = slug?.join("/");
    const page = pageData.get(path ?? "") ?? pageData.get("404");
    const pageWithPath = { ...page, path } as PageWithPath<GeneralPageType>;
    return (
        <>
            <MetaHandler page={pageWithPath} />
            <PageDataProvider pageData={pageData}>
                <ContentLevelProvider>
                    <DialogProvider>
                        <div className="site">
                            <MarkdownPage page={pageWithPath} />
                            <div className="bg">
                                <ColorfulHex />
                            </div>
                        </div>
                    </DialogProvider>
                </ContentLevelProvider>
            </PageDataProvider>
        </>
    );
};

export default App;
