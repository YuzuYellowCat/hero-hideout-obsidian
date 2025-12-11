import PageGridCard from "components/PageGridCard";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentProps } from "hooks/usePages";

const PageGrid: React.FC<PageComponentProps> = ({ folder }) => {
    const pageFilter = useCallback((page: PageGridCardProperties) => {
        return !!page.img;
    }, []);

    const pages = usePages<PageGridCardProperties>(folder, pageFilter);

    return (
        <div className="page-grid">
            {pages.map((page) => (
                <PageGridCard page={page} key={page.path} />
            ))}
        </div>
    );
};

export default PageGrid;
