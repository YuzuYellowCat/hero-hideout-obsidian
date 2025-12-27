"use client";
import DialogWrapper from "components/DialogWrapper";
import React, { createContext, useMemo, useState } from "react";

type DialogContextType = {
    showDialog: (element: React.ReactElement) => void;
    clearDialog: () => void;
};

export const DialogContext = createContext<DialogContextType>({
    showDialog: () => {
        throw new Error("Dialog Context Not Initialized");
    },
    clearDialog: () => {
        throw new Error("Dialog Context Not Initialized");
    },
});

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [dialogContents, setDialogContents] = useState<
        React.ReactElement | undefined
    >();

    const dialogInterface: DialogContextType = useMemo(
        () => ({
            showDialog: (element: React.ReactElement) => {
                setDialogContents(element);
            },
            clearDialog: () => {
                setDialogContents(undefined);
            },
        }),
        []
    );

    const dialog = useMemo(() => {
        if (!dialogContents) {
            return <></>;
        }
        return <DialogWrapper>{dialogContents}</DialogWrapper>;
    }, [dialogContents]);
    return (
        <DialogContext.Provider value={dialogInterface}>
            {children}
            {dialog}
        </DialogContext.Provider>
    );
};
