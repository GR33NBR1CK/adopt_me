import { createPortal } from "react-dom";
import React, { MutableRefObject, useEffect, useRef } from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
    const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")!;
        modalRoot.appendChild(elRef.current as Node);

        return () => {
            modalRoot.removeChild(elRef.current as Node);
        };
    }, []);

    return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
