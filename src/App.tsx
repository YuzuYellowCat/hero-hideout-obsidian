import "./App.css";
import ColorfulHex from "components/ColorfulHex";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Characters from "pages/Characters";
import MarkdownPage from "pages/MarkdownPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="site">
                <Routes>
                    <Route
                        path="/"
                        element={<MarkdownPage path="home/index" />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route
                        path="/test"
                        element={<MarkdownPage path="test/index" />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <div className="bg">
                    <ColorfulHex />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
