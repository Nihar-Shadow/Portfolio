import React from 'react';
import Link from 'next/link';

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "education",
  "certifications",
  "leadership",
  "sudo",
  "clear",
];

const NavigationMenu = () => {
  return (
    <nav 
      aria-label="Command navigation" 
      className="flex flex-wrap justify-start items-center font-mono text-primary text-xs md:text-sm"
    >
      {COMMANDS.map((command, index) => (
        <React.Fragment key={command}>
          <Link
            href={`#${command.toLowerCase()}`}
            className="hover:text-[#00ff66] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:text-[#00ff66] rounded-sm transition-colors"
          >
            {command}
          </Link>
          {index < COMMANDS.length - 1 && (
            <span
              aria-hidden="true"
              className="text-primary select-none px-2"
            >
              |
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavigationMenu;