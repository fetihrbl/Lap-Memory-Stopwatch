import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css";
import Lap from "./Lap";

export default function StopWatch() {

    const [milliseconds, setMilliseconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hourse, setHourse] = useState(0);
    const [laps, setLaps] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    const formatWithLeadingZero = (number) => {
        return number < 10 ? "0" + number : number.toString();
    }

    useEffect(() => {
        if(isRunning) {
            intervalRef.current = setInterval(() => {
                setMilliseconds(prev => {
                    if (prev >= 99) {
                        setSeconds(sec => {
                            if (sec >= 59) {
                                setMinutes(min => {
                                    if (min >= 59) {
                                        setHourse(hour => hour + 1);
                                        return 0;
                                    }
                                    return min + 1;
                                });
                                return 0;
                            }
                            return sec + 1;
                        });
                        return 0;
                    }
                    return prev + 1;
                });
            }, 10)
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleStart = () => {
        if(!isRunning) {
            setIsRunning(true);
        }
    };

    const handlePause = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current)
    };

    const handleReset = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setMilliseconds(0);
        setSeconds(0);
        setMinutes(0);
        setHourse(0);
        setLaps([]);
    }

    const handleLap = () => {
        if(!isRunning) return;

        const lapTime = `${formatWithLeadingZero(hourse)}: ${formatWithLeadingZero(minutes)}: ${formatWithLeadingZero(seconds)}: ${formatWithLeadingZero(milliseconds)}`;

        setLaps(prev => [...prev, lapTime]);
    }

    return(
        <div className="container">
            <div className="timeDisplay">
                {formatWithLeadingZero(hourse)} : {formatWithLeadingZero(minutes)} : {formatWithLeadingZero(seconds)} . {formatWithLeadingZero(milliseconds)}
            </div>

            <div className="buttons">
                <button
                     className="btn"
                     onClick={handleStart}
                     disabled={isRunning}
                     style={{ cursor: isRunning ? "not-allowed" : "pointer" }}
                >
                    Start
                </button>

                <button
                    className="btn"
                    onClick={handlePause}
                    disabled={!isRunning}
                    style={{ cursor: !isRunning ? "not-allowed" : "pointer" }}
                >
                    Pause
                </button>

                <button
                    className="btn"
                    onClick={handleLap}
                    disabled={!isRunning}
                    style={{ cursor: !isRunning ? "not-allowed" : "pointer" }}
                >
                    Lap
                </button>

                <button className="btn" onClick={handleReset}>
                    Reset
                </button>

            </div>

            <Lap laps={laps} />

        </div>
    )
}




