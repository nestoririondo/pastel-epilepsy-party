import { useEffect, useState } from "react";

const TimeStop = ({ win }) => {
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  let intervalId = null;

  useEffect(() => {
    intervalId = setInterval(() => {
      if (!win) {
        const bestTime = document.querySelector(".current-time");
        bestTime.classList.remove("best-time");
        setTime((time) => time + 1);
      } else {
        clearInterval(intervalId);
        if (time < bestTime || bestTime === 0) {
          setBestTime(time);
          const bestTime = document.querySelector(".current-time");
          bestTime.classList.add("best-time");
        }
        setTime(0);
      }
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, [win]);

  const formattedTime = (something) => {
    const minutes = Math.floor(something / 6000);
    const seconds = Math.floor((something % 6000) / 100);
    const milliseconds = something % 100;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  return (
    <div className="timer">
      <div className="time">Time: <span>{formattedTime(time)}</span></div>
      <div className="explanation">Select all tiles as fast as you can!</div>
      <div className="current-time">Best Time: <span>{formattedTime(bestTime)}</span></div>
    </div>
  );
};

export default TimeStop;
