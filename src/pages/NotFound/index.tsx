"use client";

import React from "react";
import PageWrapper from "components/PageWrapper";
// import Button from "components/Button";

const NotFound: React.FC = () => {
    return (
        <PageWrapper
            color="#ffffff"
            title="404 - Not Found"
            alignItems="center"
        >
            <p>
                You were looking for a cat, but all you found was an empty
                cardboard box...
            </p>
            {/* <Button onClick={() => navigate("/")}>Check back at home</Button> */}
        </PageWrapper>
    );
};

export default NotFound;
