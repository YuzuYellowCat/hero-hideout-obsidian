import { ContentLevelProvider } from "contexts/contentLevelContext";
import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import { DialogProvider } from "contexts/dialogContext";
import MarkdownPage from "pages/MarkdownPage";
import { BrowserRouter } from "react-router";

const App: React.FC = () => (
    <BrowserRouter>
        <ContentLevelProvider>
            <DialogProvider>
                <div className="site">
                    <MarkdownPage />
                    <div className="bg">
                        <ColorfulHex />
                    </div>
                </div>
            </DialogProvider>
        </ContentLevelProvider>
    </BrowserRouter>
);

export default App;
