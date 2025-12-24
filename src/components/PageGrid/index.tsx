import PageGridCard from "components/PageGridCard";
import React, { useCallback } from "react";
import "./index.css";
import usePages, { PageComponentProps } from "hooks/usePages";

type PageGridProps = PageComponentProps & {
    size?: "S" | "L";
};

const PageGrid: React.FC<PageGridProps> = ({ size, folder }) => {
    const pageFilter = useCallback((page: ImagePageProperties) => {
        return !!page.img;
    }, []);

    const pages = usePages<ImagePageProperties>(folder, pageFilter);
    const gridSize = size ?? "L";

    return (
        <div className={`page-grid size-${gridSize}`}>
            {pages.map((page) => (
                <PageGridCard page={page} key={page.path} size={gridSize} />
            ))}
        </div>
    );
};

export default PageGrid;
