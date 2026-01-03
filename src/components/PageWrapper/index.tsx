"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import type { PropsWithChildren } from "react";
import "./index.css";
import Section from "components/Section";
import LoadingBox from "components/LoadingBox";
import { usePathname } from "next/navigation";

type PageWrapperProps = {
    color?: string;
    title?: string;
    alignItems?: "start" | "end" | "center" | "inherit";
};

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = ({
    children,
    color = "#000",
    title,
    alignItems = "inherit",
}) => {
    const [hasNavigated, setHasNavigated] = useState<boolean>(false);
    // Get the current pathname from the router
    const pathname = usePathname();

    // Create a ref to store the previous pathname
    const ref = useRef(pathname);
    useEffect(() => {
        if (ref.current !== pathname) {
            setHasNavigated(true);
        }
    }, [pathname]);

    return (
        <div className="page">
            <Header borderColor={color} />
            <Section color={color} title={title}>
                {hasNavigated ? (
                    <LoadingBox className="loading-placeholder" />
                ) : (
                    <div
                        className="page-contents"
                        style={{
                            alignItems,
                        }}
                    >
                        {children}
                    </div>
                )}
            </Section>
        </div>
    );
};

export default PageWrapper;
