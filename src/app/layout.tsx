import type { Metadata, Viewport } from "next";
import "../index.css";

export const metadata: Metadata = {
    title: "Yuzu's Hero Hideout",
    description: "Web site created with Next.js.",
    manifest: "%PUBLIC_URL%/manifest.json",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <noscript>
                    You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}
