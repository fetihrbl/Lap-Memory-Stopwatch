import React from "react";

export default function Lap({ laps }) {
    return(
        <div className="laps">
            {laps.length > 0 && <h3>Laps</h3>}
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>Lap {index + 1}: {lap}</li>
                ))}
            </ul>
        </div>
    )
}