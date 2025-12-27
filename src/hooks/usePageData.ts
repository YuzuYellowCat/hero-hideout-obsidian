import { PageDataContext } from "contexts/pageDataContext";
import { useContext } from "react";

const usePageData = () => {
    const pageData = useContext(PageDataContext);
    if (!pageData) {
        throw new Error("no page :(");
    }
    return pageData;
};

export default usePageData;
