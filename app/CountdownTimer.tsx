'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  hours?: number;
  minutes?: number;
  seconds?: number;
  total: number;
}

interface CountdownTimerProps {
  setIsTimeUp: (value: boolean) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ setIsTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        setIsTimeUp(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [setIsTimeUp]);

  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(new Date().setHours(23, 59, 59, 999)) - +new Date();
    let timeLeft: TimeLeft = { total: difference };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof TimeLeft] || interval === 'total') {
      return null;
    }

    return (
      <motion.div
        key={interval}
        className="text-5xl md:text-7xl font-bold text-purple-600 m-2 p-4 bg-white bg-opacity-30 rounded-lg shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <span className="countdown-number">{timeLeft[interval as keyof TimeLeft]}</span>
        <span className="countdown-label text-sm block">{interval}</span>
      </motion.div>
    );
  });

  return (
    <div className="flex justify-center items-center flex-wrap mb-8 z-10">
      {timerComponents.length ? timerComponents : <span>Time up!</span>}
    </div>
  );
};

export default CountdownTimer;
