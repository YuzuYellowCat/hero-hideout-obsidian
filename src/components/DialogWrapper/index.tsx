"use client";
import React, { useEffect } from "react";
import "./index.css";
import { DialogContext } from "contexts/dialogContext";

const DialogWapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        const stopScroll = (e: Event) => {
            // Todo -- stop da scrolling
            e.preventDefault();
            e.stopPropagation();
        };
        window.addEventListener("scroll", stopScroll);
        return () => {
            window.removeEventListener("scroll", stopScroll);
        };
    }, []);

    const { clearDialog } = React.useContext(DialogContext);
    return (
        <div className="dialog-underlay" onClick={clearDialog}>
            {children}
        </div>
    );
};

export default DialogWapper;
