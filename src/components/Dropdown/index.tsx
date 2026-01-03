import React, { SelectHTMLAttributes } from "react";
import "./index.css";

type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
    onUpdate: (newValue: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onUpdate, ...rest }) => {
    const optionsTags = options.map((option) => (
        <option
            className="dropdown-option"
            value={option.toLowerCase()}
            key={option}
        >
            {option}
        </option>
    ));
    return (
        <select
            className="dropdown"
            {...rest}
            onChange={(e) => {
                onUpdate(e.target.value);
            }}
        >
            {optionsTags}
        </select>
    );
};

export default Dropdown;
