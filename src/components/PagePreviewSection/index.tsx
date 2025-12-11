import React, { useMemo } from "react";
import "./index.css";
import { useNavigate } from "react-router";

type PagePreviewSectionProps = {
    title: string;
    subtitle?: string;
    navigationPath: string;
    color?: string;
    hasFlourish?: boolean;
    fullHover?: boolean;
    size?: "S" | "L";
};

const PagePreviewSection: React.FC<
    React.PropsWithChildren<PagePreviewSectionProps>
> = ({
    title,
    navigationPath,
    children,
    subtitle,
    hasFlourish = true,
    fullHover = false,
    color = "#fff",
    size = "L",
}) => {
    const navigate = useNavigate();
    const subtitleComponent = useMemo(() => {
        if (!subtitle) {
            return;
        }
        return <div className="page-preview-subtitle">{subtitle}</div>;
    }, [subtitle]);
    return (
        <button
            className={`page-preview preview-size-${size}`}
            style={{
                borderColor: color,
            }}
            onClick={() => navigate(navigationPath)}
        >
            <div className="page-preview-title">
                <h3 className="page-preview-title-text">{title}</h3>
                {hasFlourish && (
                    <span className="page-preview-title-flourish">›</span>
                )}
                <div
                    className="page-preview-title-bg"
                    style={{
                        backgroundColor: color,
                    }}
                />
            </div>
            {subtitleComponent}
            <div className="page-preview-content">{children}</div>
            <div
                className="page-preview-bg"
                style={{
                    backgroundColor: color,
                    opacity: 0.25,
                    display: fullHover ? "flex" : "none",
                }}
            />
        </button>
    );
};

export default PagePreviewSection;
