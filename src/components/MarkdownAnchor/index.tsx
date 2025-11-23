import React, {
    AnchorHTMLAttributes,
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
        setIsLocal(_link?.startsWith("pages") ?? false);
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
                onClick: () => navigate(link),
                href: "",
            };
        }
        return { href: link };
    }, [isLocal, link, navigate]);

    return (
        <a
            className="markdown-anchor"
            {...props}
            {...anchorNavProps}
            target="_blank"
            rel="noopener noreferrer"
        >
            {props.children}
        </a>
    );
};

export default MarkdownAnchor;
