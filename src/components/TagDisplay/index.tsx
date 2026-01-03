"use client";
import React from "react";
import "./index.css";
import { useRouter } from "next/navigation";

type TagDisplayProps = {
    tags?: string[];
};

const TagDisplay: React.FC<TagDisplayProps> = ({ tags }) => {
    const router = useRouter();

    if (!tags || tags.length === 0) {
        return <></>;
    }

    return (
        <div className="page-tag-list">
            <span className="page-tag-title">Tags:</span>
            {tags.map((tag) => (
                <button
                    className="page-tag"
                    onClick={() => {
                        router.push(`/search?tags=${tag}`);
                    }}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default TagDisplay;
