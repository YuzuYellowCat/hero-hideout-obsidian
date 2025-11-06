import React, { useMemo } from "react";
import PageWrapper from "components/PageWrapper";
import { useNavigate } from "react-router";
import NotFound from "pages/NotFound";
import Button from "components/Button";

const CharacterPage: React.FC = () => {
    const navigate = useNavigate();

    const character = useMemo(
        () => ({
            name: "Test",
            color: "#ffffff",
            isGuest: false,
        }),
        []
    );

    if (!character || character.isGuest) {
        // If this character isn't found, show the 404 page
        return <NotFound />;
    }

    return (
        <PageWrapper
            color={character.color}
            title={character.name}
            alignItems="center"
        >
            <p>
                {
                    "//TODO -- Fill with gallery of art & comms featuring this character"
                }
            </p>
            {false && <Button onClick={() => navigate("ref")}>View Ref</Button>}
        </PageWrapper>
    );
};

export default CharacterPage;
