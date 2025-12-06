'use client';

import Header from '@/components/sections/header';
import MainLayout from '@/components/sections/main-layout';
import Interactive3DCard from '@/components/sections/Interactive3DCard';
import TerminalInterface from '@/components/sections/terminal-interface';
import NavigationMenu from '@/components/sections/navigation-menu';
import Footer from '@/components/sections/footer';

export default function Page() {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <Header />
      
      <MainLayout
        leftColumn={
          <div className="relative h-full">
            <Interactive3DCard avatarUrl="/assets/profile/avatar.jpg" />
          </div>
        }
        rightColumn={
          <div className="relative h-full flex flex-col">
            <div className="border-b border-primary/30 p-4 bg-card/50">
              <NavigationMenu />
            </div>
            <div className="flex-1 overflow-y-auto">
              <TerminalInterface />
            </div>
          </div>
        }
      />
      
      <Footer />
    </div>
  );
}
