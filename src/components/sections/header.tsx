'use client';

export default function Header() {
  return (
    <header className="bg-black border-b-2 border-[#00ff00] p-4">
      <div className="font-mono">
        <h1 className="text-[#00ff00] text-xl md:text-2xl font-bold">
        Nihar Pradhan
        </h1>
        <h2 className="text-[#808080] text-xs md:text-sm mt-1">
          CyberSecurity Analyst
        </h2>
      </div>
    </header>
  );
}