"use client";
import React from "react";
import "./index.css";
import Section from "components/Section";
import TitleStripe from "components/TitleStripe";
import { useRouter, usePathname } from "next/navigation";

type HeaderProps = {
    borderColor: string;
};

const Header: React.FC<HeaderProps> = ({ borderColor }) => {
    const router = useRouter();
    const pathName = usePathname();

    const pages = require.context("website-content/pages");
    const test = pages
        .keys()
        .map((key) => {
            return key.match(/^\.\/([a-z]*)\/index.md$/)?.[1];
        })
        .filter((x) => x && !x.startsWith("_")) as string[];

    test.unshift("home");

    const links = test.map((key) => {
        const navPath = key === "home" ? "/" : "/" + key;
        const isSelected = pathName === navPath;
        const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
        return (
            <button
                style={isSelected ? {} : { color: borderColor }}
                className={`link${isSelected ? " selected" : ""}`}
                key={key}
                onClick={() => router.push(navPath)}
            >
                <span className="link-text">{displayKey}</span>
                <div
                    className="link-background"
                    style={isSelected ? { backgroundColor: borderColor } : {}}
                />
            </button>
        );
    });

    return (
        <Section color={borderColor}>
            <TitleStripe>YuzuCat</TitleStripe>
            <div className="links">{links}</div>
        </Section>
    );
};

export default Header;
