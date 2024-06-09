import { useEffect, useState } from "react";

const sound = document.getElementById("beep");

const Pomodoro = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [status, setStatus] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(1500);

  const [isTimerOn, setIsTimerOn] = useState(false);

  const reset = () => {
    clearInterval(timer);
    setBreakLength(5);
    setSessionLength(25);
    setStatus("Session");
    setIsTimerOn(false);
    setTimeLeft(1500);
    sound.pause();
    sound.currentTime = 0;
  };

  useEffect(() => {
    let timer;
    if (isTimerOn) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev == 0) {
            sound.play();
            if (status === "Session") {
              setStatus("Break");
              return breakLength * 60;
            } else {
              setStatus("Session");
              return sessionLength * 60;
            }
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerOn]);

  const showTimeLeft = (sec) => {
    let showMins = Math.floor(sec / 60);
    let showSecs = sec % 60;

    showMins = showMins < 10 ? "0" + showMins : showMins;
    showSecs = showSecs < 10 ? "0" + showSecs : showSecs;

    return showMins + ":" + showSecs;
  };

  const handleControl = () => {
    setIsTimerOn(!isTimerOn);
  };

  const handleBreakIncrement = () => {
    setBreakLength(Math.min(breakLength + 1, 60));
  };

  const handleBreakDecrement = () => {
    setBreakLength(Math.max(breakLength - 1, 1));
  };

  const handleSessionIncrement = () => {
    setSessionLength(Math.min(sessionLength + 1, 60));
    setTimeLeft(sessionLength * 60 + 60);
  };

  const handleSessionDecrement = () => {
    setSessionLength(Math.max(sessionLength - 1, 1));
    setTimeLeft(sessionLength * 60 - 60);
  };

  return (
    <div id="pomodoro">
      <div id="title">
        <h2>25 + 5 Clock</h2>
      </div>
      <div id="clock">
        <div id="break-label">
          BREAK LENGHT
          <div id="break">
            <div id="break-decrement" onClick={handleBreakDecrement}>
              -
            </div>
            <div id="break-length">{breakLength}</div>
            <div id="break-increment" onClick={handleBreakIncrement}>
              +
            </div>
          </div>
        </div>
        <div id="session-label">
          SESSION LENGHT
          <div id="session">
            <div id="session-decrement" onClick={handleSessionDecrement}>
              -
            </div>
            <div id="session-length">{sessionLength}</div>
            <div id="session-increment" onClick={handleSessionIncrement}>
              +
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="timer">
          <div id="state">
            <h2>{status}</h2>
          </div>
          <div id="time-left">{showTimeLeft(timeLeft)}</div>
          <div id="timer-label">
            <div id="start_stop" onClick={handleControl}>
              {isTimerOn ? "Pause" : "Play"}
            </div>
            <div id="reset" onClick={reset}>
              Reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;

//https://www.pacdv.com/sounds/miscellaneous_sounds/wind-chime-2.mp3
