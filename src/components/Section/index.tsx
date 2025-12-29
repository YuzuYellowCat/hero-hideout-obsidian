import React from "react";
import type { PropsWithChildren } from "react";
import "./index.css";
import Paw from "images/paw.svg";

type SectionProps = {
    color: string;
    title?: string;
};

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
    children,
    color,
    title,
}) => {
    return (
        <div
            className="section"
            style={{
                borderColor: color,
            }}
        >
            {title && (
                <span style={{ color }} className="section-title">
                    {title}
                    <span className="title-flourish"> › › ›</span>
                </span>
            )}
            <Paw className="corner-paw" style={{ stroke: color }} />
            <div className="section-content">{children}</div>
        </div>
    );
};

export default Section;
