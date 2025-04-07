import React from 'react';
import Logo from './Logo';
import MainMenuButton from './MainMenuButton';
import QuickNav from './QuickNav';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <QuickNav />
            </div>
            <MainMenuButton />
          </div>
        </div>
      </div>
    </header>
  );
} 