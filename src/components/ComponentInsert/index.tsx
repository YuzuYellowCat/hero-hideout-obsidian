import React, { HTMLAttributes, Suspense } from "react";

const COMPONENT_MAP = {
    CharacterGrid: React.lazy(() => import("components/CharacterGrid")),
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

    return (
        <Suspense fallback={<></>}>
            <ComponentOverride />
        </Suspense>
    );
};

export default ComponentInsert;
