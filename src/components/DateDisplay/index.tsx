import React from "react";
import "./index.css";

type DateDisplayProps = {
    date?: Date;
};

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
    if (!date) {
        return <></>;
    }

    return (
        <div className="date-display">
            Posted on{" "}
            {date.toLocaleString("en", {
                year: "numeric",
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            })}
        </div>
    );
};

export default DateDisplay;
