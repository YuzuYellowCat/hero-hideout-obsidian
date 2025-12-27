"use client";
import React, { createContext } from "react";

type PageDataContextType = Map<string, GeneralPageType>;

export const PageDataContext = createContext<PageDataContextType>(new Map());

type PageContextProviderProps = React.PropsWithChildren<{
    pageData: PageDataContextType;
}>;

export const PageDataProvider: React.FC<PageContextProviderProps> = ({
    pageData,
    children,
}) => {
    return (
        <PageDataContext.Provider value={pageData}>
            {children}
        </PageDataContext.Provider>
    );
};
