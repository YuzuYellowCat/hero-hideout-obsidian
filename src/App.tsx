import { ContentLevelProvider } from "contexts/contentLevelContext";
import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import { DialogProvider } from "contexts/dialogContext";
import MarkdownPage from "components/MarkdownPage";
import { PageDataProvider } from "contexts/pageDataContext";
import MetaHandler from "components/MetaHandler";
import { slugToPage } from "utils/markdownServerUtils";

const App: React.FC<{
    slug?: string[];
    pageData: Map<string, GeneralPageType>;
}> = ({ slug, pageData }) => {
    const pageWithPath = slugToPage(slug ?? [], pageData);
    return (
        <PageDataProvider pageData={pageData}>
            <ContentLevelProvider>
                <DialogProvider>
                    <div className="site">
                        <MarkdownPage page={pageWithPath} pageData={pageData} />
                        <div className="bg">
                            <ColorfulHex />
                        </div>
                    </div>
                </DialogProvider>
            </ContentLevelProvider>
        </PageDataProvider>
    );
};

export default App;
