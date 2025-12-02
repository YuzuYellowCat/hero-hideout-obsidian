import PageGraphicList from "components/PageGraphicList";
import PageGrid from "components/PageGrid";
import React, { HTMLAttributes } from "react";

const COMPONENT_MAP = {
    PageGrid,
    PageGraphicList,
};

const ComponentInsert: React.FC<
    HTMLAttributes<HTMLElement> & {
        ["data-component-id"]?: keyof typeof COMPONENT_MAP;
        ["data-props"]?: string;
    }
> = (props) => {
    const componentName = props["data-component-id"];
    const propsString = props["data-props"];
    const ComponentOverride = componentName
        ? COMPONENT_MAP[componentName]
        : undefined;

    if (!ComponentOverride) {
        return <div {...props} />;
    }

    const componentProps = propsString ? JSON.parse(propsString) : {};

    return <ComponentOverride {...componentProps} />;
};

export default ComponentInsert;
