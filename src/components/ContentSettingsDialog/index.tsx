import BaseDialog from "components/BaseDialog";
import Dropdown from "components/Dropdown";
import {
    CONTENT_LEVEL_COLOR_MAP,
    ContentLevel,
    ContentLevelContext,
    ContentSetting,
} from "contexts/contentLevelContext";
import React, { useContext } from "react";
import "./index.css";

const _capitalizeStrings = (value: string) => {
    return value.at(0)?.toUpperCase() + value.slice(1);
};

const ContentSettingsDialog: React.FC = () => {
    const dropdownOptions =
        Object.values(ContentSetting).map(_capitalizeStrings);

    const { getGlobalSetting, updateSetting } = useContext(ContentLevelContext);

    const settings = Object.values(ContentLevel).map((level) => (
        <div className="content-setting-row" key={level}>
            <label>
                Visibility setting for{" "}
                <span style={{ color: CONTENT_LEVEL_COLOR_MAP[level] }}>
                    {level}
                </span>{" "}
                content:
            </label>
            <Dropdown
                options={dropdownOptions}
                defaultValue={getGlobalSetting(level)}
                onUpdate={(value) =>
                    updateSetting(level, value as ContentSetting)
                }
            />
        </div>
    ));
    return (
        <BaseDialog title="Content Settings">
            <p>
                This website contains adult content. By enabling NSFW or
                suggestive content, you verify that you are over 18 years of
                age.
            </p>
            <div className="content-settings">{settings}</div>
        </BaseDialog>
    );
};

export default ContentSettingsDialog;
