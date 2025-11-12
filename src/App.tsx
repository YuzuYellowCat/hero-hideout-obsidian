import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import MarkdownPage from "pages/MarkdownPage";
import { BrowserRouter } from "react-router";

const App: React.FC = () => (
    <BrowserRouter>
        <div className="site">
            <MarkdownPage />
            <div className="bg">
                <ColorfulHex />
            </div>
        </div>
    </BrowserRouter>
);

export default App;
