import { useEffect, useState } from "react";

type UseWebLinkType = (sourceLink?: string) => {
    isLocal: boolean;
    link: string;
};

const useWebLink: UseWebLinkType = (sourceLink) => {
    const [isLocal, setIsLocal] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    useEffect(() => {
        let _link = sourceLink || "";

        setIsLocal(_link.startsWith("pages") || _link.startsWith("#"));
        if (_link.startsWith("pages")) {
            _link = _link.replace("pages", "");
            _link = _link.replace("/index", "");
            if (_link === "") {
                _link = "/";
            }
        }
        setLink(_link);
    }, [sourceLink]);

    return {
        isLocal,
        link,
    };
};

export default useWebLink;
