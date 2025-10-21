"use client";

import { useState, useEffect } from 'react';

const TerminalInterface = () => {
  const welcomeCommand = "welcome";
  const [typedCommand, setTypedCommand] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Start typing after a brief moment to show the initial prompt
    const startTimer = setTimeout(() => setStartTyping(true), 1000);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    if (typedCommand.length < welcomeCommand.length) {
      const timer = setTimeout(() => {
        setTypedCommand(welcomeCommand.slice(0, typedCommand.length + 1));
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 300); // Short pause after typing is complete
      return () => clearTimeout(timer);
    }
  }, [startTyping, typedCommand]);

  const welcomeMessage = `Hi, I'm Nihar Pradhan, a Software & AI Engineer.

Welcome to my interactive 'AI powered' portfolio terminal!
Type 'help' to see available commands.`;

  return (
    <div className="relative flex flex-col h-full bg-black font-mono text-sm md:text-base leading-[1.6] p-6">
      <div className="flex-grow text-white">
        {/* The line that gets typed */}
        <div>
          <span className="text-[#4a9eff]">nihar@portfolio:~$</span>
          <span className="text-[#00ff00] ml-2">{typedCommand}</span>
          {!showContent && <span className="cursor ml-1 text-white">█</span>}
        </div>

        {/* Content that appears after typing is finished */}
        {showContent && (
          <>
            <div className="whitespace-pre-wrap mt-4">
              {welcomeMessage}
            </div>

            {/* New prompt line */}
            <div className="mt-4">
              <span className="text-[#4a9eff]">nihar@portfolio:~$</span>
              <span className="cursor ml-1 text-white">█</span>
            </div>
          </>
        )}
      </div>

      {/* Timestamp */}
      <div className="absolute bottom-6 right-6 text-xs text-[#666666]">
        10/17/2025, 9:49:36 PM
      </div>
    </div>
  );
};

export default TerminalInterface;