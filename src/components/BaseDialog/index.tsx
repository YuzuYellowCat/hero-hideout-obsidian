import React, { useContext, useEffect, useRef } from "react";
import XIcon from "images/x-icon.svg";

import "./index.css";
import { DialogContext } from "contexts/dialogContext";

type BaseDialogProps = React.PropsWithChildren<{
    title: string;
}>;

const BaseDialog: React.FC<BaseDialogProps> = ({ children, title }) => {
    const { clearDialog } = useContext(DialogContext);
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialogRef && dialogRef.current) {
            // Set this so that the next tab is in the dialog for keyboard nav
            dialogRef.current.focus();
            dialogRef.current.blur();
        }
    }, [dialogRef]);
    return (
        <dialog
            open
            tabIndex={-1}
            className="base-dialog"
            ref={dialogRef}
            onClick={(e) => {
                // Don't trigger the underlay click
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div className="dialog-header">
                <span className="dialog-title">{title}</span>
                <button onClick={clearDialog} className="dialog-x-wrapper">
                    <XIcon className="dialog-x" />
                </button>
            </div>
            <div className="dialog-divider" />
            <div className="dialog-content">{children}</div>
        </dialog>
    );
};

export default BaseDialog;
