"use client";

import { useEffect, useRef, useState } from 'react';

const TerminalInterface = () => {
  // Auto-typed welcome intro
  const welcomeCommand = "welcome";
  const [typedCommand, setTypedCommand] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // Interactive terminal state
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Help typing effect
  const helpText = `
Available commands:
about           - Learn about me
projects        - View my projects
skills          - See my technical skills
experience      - My work experience
contact         - How to reach me
education       - My educational background
certifications  - View my certifications
leadership      - Leadership and community involvement
clear           - Clear the terminal

Type any command to continue...`;
  const [typedHelp, setTypedHelp] = useState("");
  const [isTypingHelp, setIsTypingHelp] = useState(false);

  // About typing effect
  const [typedAbout, setTypedAbout] = useState("");
  const [isTypingAbout, setIsTypingAbout] = useState(false);

  // General response typing effect
  const [currentTypingCommand, setCurrentTypingCommand] = useState<string | null>(null);
  const [typedResponse, setTypedResponse] = useState("");
  const [isTypingResponse, setIsTypingResponse] = useState(false);

  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const startTimer = setTimeout(() => setStartTyping(true), 800);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    // Update timestamp on mount to avoid SSR hydration mismatch
    setTimestamp(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    if (typedCommand.length < welcomeCommand.length) {
      const timer = setTimeout(() => {
        setTypedCommand(welcomeCommand.slice(0, typedCommand.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
        // Focus container to start capturing keystrokes
        containerRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startTyping, typedCommand]);

  useEffect(() => {
    if (!isTypingHelp) return;

    if (typedHelp.length < helpText.length) {
      const timer = setTimeout(() => {
        setTypedHelp(helpText.slice(0, typedHelp.length + 10));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setOutputs((prev) => [...prev, helpText]);
        setIsTypingHelp(false);
        setTypedHelp("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTypingHelp, typedHelp, helpText]);

  useEffect(() => {
    if (!isTypingAbout) return;

    if (typedAbout.length < commandInfo.about.length) {
      const timer = setTimeout(() => {
        setTypedAbout(commandInfo.about.slice(0, typedAbout.length + 10));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setOutputs((prev) => [...prev, commandInfo.about]);
        setIsTypingAbout(false);
        setTypedAbout("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTypingAbout, typedAbout]);

  useEffect(() => {
    if (!isTypingResponse || !currentTypingCommand) return;

    const responseText = commandInfo[currentTypingCommand as keyof typeof commandInfo];
    if (typedResponse.length < responseText.length) {
      const timer = setTimeout(() => {
        setTypedResponse(responseText.slice(0, typedResponse.length + 8));
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        // Process the response text to make links clickable when adding to outputs
        setOutputs((prev) => [...prev, responseText]);
        setIsTypingResponse(false);
        setTypedResponse("");
        setCurrentTypingCommand(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTypingResponse, typedResponse, currentTypingCommand]);

  const welcomeMessage = `Hi, I'm Nihar Pradhan, a Cybersecurity & AI Engineer.

Welcome to my interactive 'AI powered' portfolio terminal!
Type 'help' to see available commands.`;



  // Define information for each command
  const commandInfo = {
    about: `
About Me:
[👋 Hi there! I'm Nihar Ranjan Pradhan, a passionate and driven B.Tech student specializing in Computer Science with a focus on IoT and Cyber Security at CV Raman Global University.

🚀 My goal is to build a career where I can contribute to creating secure and innovative tech solutions while continuously learning and evolving in this dynamic industry.]

Key Interests:
- [Play games, read books, and explore new technologies.]

Fun Fact:
- [I enjoy solving complex problems and am always eager to learn new technologies.]
    `,
    projects: `
My Projects:

Project 1: AI DIFFENCE SYSTEM
- Description: [Army is a comprehensive developer toolkit tailored for building advanced tactical, surveillance, and command systems using modern web technologies.
It combines a robust architecture with a rich set of UI components, backend prediction services, and security-focused features to streamline the development of mission-critical applications.

Why Army?
This project empowers developers to craft scalable, secure, and real-time operational interfaces.]

- Technologies: [TypeScript • React • FastAPI • Tailwind • Vite • ESLint • Python • PostCSS • Zustand • Socket.IO • Jest • Prettier]

- Link: https://ai-powered-defence-system.netlify.app

Project 2: EduTracker
- Description: [Collage Attendance Tracker is a web application that helps colleges keep track of student attendance in a more efficient and organized manner.
It allows colleges to easily record and manage student attendance, generate reports, and provide insights into attendance patterns.]

- Technologies: [HTML,CSS,JAVASCRIPT]
- Link: https://attance.netlify.app
    `,
    skills: `
Technical Skills:

Programming Languages:
- [HTML , CSS,  JavaScript, Python , Bash.]

Frameworks & Libraries:
- [ React, Node.js.]

Tools & Technologies:
- [ Git, Docker.]

Soft Skills:
- [ Problem-solving, Communication,]
    `,
    experience: `
Work Experience:
[Add your professional experience here, in reverse chronological order.]

Position 1: [Job Title] at [Company Name]
- Duration: [Start Date] - [End Date]
- Responsibilities: [List key responsibilities]
- Achievements: [List key achievements]

Position 2: [Job Title] at [Company Name]
- Duration: [Start Date] - [End Date]
- Responsibilities: [List key responsibilities]
- Achievements: [List key achievements]
    `,
    contact: `
Contact Information:

Email: niharpradhan198@gmail.com
LinkedIn: https://www.linkedin.com/in/nihar-ranjan-pradhan-aa9877331/
GitHub: https://github.com/Nihar-Shadow
Location: [Odisha]
    `,
    education: `
Education:

Degree 1: [Ongoing Btech in Computer Science] 
- Institution: [CV Raman Global University]
- Duration: [2025] - [2028]
- Relevant Coursework: [Data Structures, Algorithms, Database Management, Cyber Security, AI, Machine Learning]

    `,
    certifications: `
Certifications:
[For certificate you can visit my linkdin profile]
LinkedIn: https://www.linkedin.com/in/nihar-ranjan-pradhan-aa9877331/

    `,
    leadership: `
Leadership & Community Involvement:
[Add your leadership roles and community involvement here.]

Role 1: [Leadership Role or Position]
- Organization: [Organization Name]
- Duration: [Start Date] - [End Date]
- Responsibilities: [List responsibilities]
- Impact: [Describe the impact]

Community Involvement:
- [List community activities, volunteering, etc.]
    `,
  };

  function runCommand(cmdRaw: string) {
    const cmd = cmdRaw.trim().toLowerCase();

    if (!cmd) return;

    if (cmd === 'clear') {
      setOutputs([]);
      return;
    }

    if (cmd === 'about') {
      setIsTypingAbout(true);
      return;
    }

    // Check if command is known and display info with typing effect
    if (cmd in commandInfo) {
      setCurrentTypingCommand(cmd);
      setIsTypingResponse(true);
      return;
    }

    setOutputs((prev) => [
      ...prev,
      `Command not found: '${cmd}'. Type 'help' to see available commands.`
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!showContent) return;
    if (isTypingHelp) return;
    if (isTypingAbout) return;
    if (isTypingResponse) return;

    // Basic terminal-like input handling
    if (e.key === 'Enter') {
      e.preventDefault();
      // Update timestamp on command execution to avoid SSR hydration mismatch
      setTimestamp(new Date().toLocaleString());
      const current = input;
      const cmd = current.trim().toLowerCase();
      // Echo the prompt + command into outputs for history
      if (current.trim().length > 0) {
        setOutputs((prev) => [
          ...prev,
          <div key={Date.now()}>
            <span className="text-[#4a9eff]">nihar@portfolio:~$</span>
            <span className="text-[#00ff00] ml-2">{current}</span>
          </div>
        ]);
      }
      if (cmd === 'help') {
        setIsTypingHelp(true);
      } else {
        runCommand(current);
      }
      setInput("");
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      // Regular printable characters
      setInput((prev) => prev + e.key);
      return;
    }

    // Ignore other control keys for now
  }

  // Function to make URLs clickable in text
  const makeLinksClickable = (text: string) => {
    if (!text) return text;
    
    // Fix for duplicate URLs - use a more precise regex
    const urlRegex = /https?:\/\/[^\s]+/g;
    
    // Find all URLs in the text
    const urls = [...text.matchAll(urlRegex)];
    
    // If no URLs, return the original text
    if (urls.length === 0) return text;
    
    // Create result with clickable links
    let result = [];
    let lastIndex = 0;
    
    urls.forEach((match, i) => {
      const url = match[0];
      const startIndex = match.index || 0;
      
      // Add text before the URL
      if (startIndex > lastIndex) {
        result.push(text.substring(lastIndex, startIndex));
      }
      
      // Add the URL as a clickable link
      result.push(
        <a 
          key={`link-${i}`} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 hover:underline"
        >
          {url}
        </a>
      );
      
      lastIndex = startIndex + url.length;
    });
    
    // Add any remaining text after the last URL
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }
    
    return result;
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative flex flex-col h-full bg-black font-mono text-sm md:text-base leading-[1.6] p-6 outline-none"
    >
      <div className="flex-grow text-white">
        {/* Auto-typed intro line */}
        <div>
          <span className="text-[#4a9eff]">nihar@portfolio:~$</span>
          <span className="text-[#00ff00] ml-2">{typedCommand}</span>
          {!showContent && <span className="cursor ml-1 text-white">█</span>}
        </div>

        {/* Content area */}
        {showContent && (
          <>
            <div className="whitespace-pre-wrap mt-4">{welcomeMessage}</div>

            {/* Output history */}
            {outputs.map((line, idx) => (
              <div key={idx} className="whitespace-pre-wrap mt-2 text-[#dddddd]">
                {typeof line === 'string' ? makeLinksClickable(line) : line}
              </div>
            ))}

            {/* Typing help text */}
            {isTypingHelp && (
              <div className="whitespace-pre-wrap mt-2 text-[#dddddd]">
                {typedHelp}
                {typedHelp.length < helpText.length && <span className="cursor ml-1 text-white">█</span>}
              </div>
            )}

            {/* Typing about text */}
            {isTypingAbout && (
              <div className="whitespace-pre-wrap mt-2 text-[#dddddd]">
                {typedAbout}
                {typedAbout.length < commandInfo.about.length && <span className="cursor ml-1 text-white">█</span>}
              </div>
            )}

            {/* Typing response text */}
            {isTypingResponse && currentTypingCommand && (
              <div className="whitespace-pre-wrap mt-2 text-[#dddddd]">
                {typedResponse}
                {typedResponse.length < commandInfo[currentTypingCommand as keyof typeof commandInfo].length && <span className="cursor ml-1 text-white">█</span>}
              </div>
            )}

            {/* Current prompt */}
            {!isTypingHelp && !isTypingAbout && !isTypingResponse && (
              <div className="mt-4">
                <span className="text-[#4a9eff]">nihar@portfolio:~$</span>
                <span className="text-[#00ff00] ml-2">{input}</span>
                <span className="cursor ml-1 text-white">█</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Timestamp */}
      <div className="absolute bottom-6 right-6 text-xs text-[#666666]">
        {timestamp}
      </div>
    </div>
  );
};

export default TerminalInterface;
