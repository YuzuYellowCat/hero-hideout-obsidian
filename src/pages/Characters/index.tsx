import React, { ReactElement } from "react";
import PageWrapper from "components/PageWrapper";
import "./index.css";
import Link from "components/Link";

const Characters: React.FC = () => {
    let characterPreviews: ReactElement[] = [];

    return (
        <PageWrapper color="#ebfffe" title="Characters" alignItems="center">
            <div className="characters-wrapper">{characterPreviews}</div>
            <p>
                Icons by{" "}
                <Link href="https://bsky.app/profile/kiyonescarlet.bsky.social">
                    KiyoneScarlet
                </Link>
            </p>
        </PageWrapper>
    );
};

export default Characters;
