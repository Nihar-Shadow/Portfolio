"use client";

import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formats the date and time to match the example: "10/17/2025, 9:49:36 PM"
      const formattedTime = now.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setCurrentTime(formattedTime);
    };

    // Set the time immediately on mount, then update every second.
    updateClock();
    const timerId = setInterval(updateClock, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <footer 
      className="w-full bg-background border-t-2 border-primary font-mono text-xs flex items-center justify-between p-3 md:p-4"
    >
      <div className="flex items-center">
        <span className="text-accent">nihar@portfolio:~$</span>
        <span className="text-primary animate-blink ml-1" aria-hidden="true">█</span>
      </div>
      <span className="text-muted">
        {currentTime}
      </span>
    </footer>
  );
};

export default Footer;