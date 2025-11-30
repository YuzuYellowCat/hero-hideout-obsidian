import React, {
    type AnchorHTMLAttributes,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router";
import "./index.css";

const MarkdownAnchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (
    props
) => {
    const navigate = useNavigate();
    const [link, setLink] = useState<string>("");
    const [isLocal, setIsLocal] = useState<boolean>(false);

    useEffect(() => {
        let _link = props.href || "";

        setIsLocal(_link?.startsWith("pages") || _link.startsWith("#"));
        if (_link.startsWith("pages")) {
            _link = _link?.replace("pages", "");
            _link = _link?.replace("/index", "");
            if (_link === "") {
                _link = "/";
            }
        }
        setLink(_link);
    }, [props.href]);

    const anchorNavProps = useMemo(() => {
        if (isLocal) {
            return {
                onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    navigate(link);
                },
                href: "",
                pointerEvents: "none",
            };
        }
        return { href: link, target: "_blank", rel: "noopener noreferrer" };
    }, [isLocal, link, navigate]);

    return (
        <a className="markdown-anchor" {...props} {...anchorNavProps}>
            {props.children}
        </a>
    );
};

export default MarkdownAnchor;
