import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Timer = () => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const TimerInt =
      seconds > 0 &&
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    return () => {
      clearInterval(TimerInt as number);
    };
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/");
    }
  }, [seconds, navigate]);

  return (
    <h5 className="mt-5 fw-normal">
      Du omdirigeras om {seconds} sekunder . . .
    </h5>
  );
};
