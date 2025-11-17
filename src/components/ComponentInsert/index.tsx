import CharacterGrid from "components/CharacterGrid";
import React, { HTMLAttributes } from "react";

const COMPONENT_MAP = {
    CharacterGrid: CharacterGrid,
};

const ComponentInsert: React.FC<
    HTMLAttributes<HTMLElement> & {
        ["data-component-id"]?: keyof typeof COMPONENT_MAP;
    }
> = (props) => {
    const componentName = props["data-component-id"];
    const ComponentOverride = componentName
        ? COMPONENT_MAP[componentName]
        : undefined;

    if (!ComponentOverride) {
        return <div {...props} />;
    }

    return <ComponentOverride />;
};

export default ComponentInsert;
