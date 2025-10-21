import React from 'react';

type MainLayoutProps = {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
};

const MainLayout = ({ leftColumn, rightColumn }: MainLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
      {/* 
        Left Column: 40% on desktop, full-width on mobile.
        Background is dark gray (#1a1a1a -> bg-card).
        A vertical green border on the right acts as a divider on desktop.
      */}
      <div
        className="
          w-full md:w-2/5
          h-auto md:h-full
          bg-card
          md:border-r border-primary
          relative
          md:z-10
          flex-shrink-0
        "
      >
        {leftColumn}
      </div>
      
      {/* 
        Right Column: 60% on desktop, full-width on mobile.
        Background is pure black (#000000 -> bg-background).
        On mobile, this column takes the remaining vertical space and is scrollable.
      */}
      <div
        className="
          flex-1
          w-full md:w-3/5
          bg-background
          overflow-y-auto
          relative
          min-h-0
        "
      >
        {rightColumn}
      </div>
    </div>
  );
};

export default MainLayout;