import { useEffect, useState } from 'react';

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(timer);
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="text-xl font-semibold">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
