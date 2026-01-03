import { ContentLevelProvider } from "contexts/contentLevelContext";
import ColorfulHex from "components/ColorfulHex";
import { DialogProvider } from "contexts/dialogContext";
import MarkdownPage from "components/MarkdownPage";
import { PageDataProvider } from "contexts/pageDataContext";
import { slugToPage } from "utils/markdownServerUtils";

const App: React.FC<{
    slug?: string[];
    pageData: Map<string, GeneralPageType>;
}> = ({ slug, pageData }) => {
    const pageWithPath = slugToPage(slug ?? [], pageData);
    return (
        <PageDataProvider pageData={pageData}>
            <ContentLevelProvider page={pageWithPath}>
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
