'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MainMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center p-2 bg-black border border-gray-800 hover:border-bar-accent/30 rounded-lg shadow-lg holographic-border overflow-hidden transition-all duration-300 min-w-[60px] min-h-[60px]"
        aria-label="Open main menu"
      >
        <div className="rounded-md overflow-hidden mb-1">
          <Image 
            src="/only_these/logos/menu_icon.png" 
            alt="Menu" 
            width={48} 
            height={48}
            className="object-cover"
          />
        </div>
        <span className="text-white text-xs font-medium">Menu</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-64 mt-2 bg-black/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm animate-fade-in">
          <div className="py-3 px-2">
            <div className="mb-4 px-3">
              <h3 className="text-bar-accent font-semibold mb-1">Navigation</h3>
              <div className="space-y-2">
                <Link 
                  href="/"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/events"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </Link>
                <Link 
                  href="/menu"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Food Menu
                </Link>
              </div>
            </div>
            
            <div className="mb-4 px-3">
              <h3 className="text-bar-accent font-semibold mb-1">Instructions</h3>
              <div className="space-y-2">
                <Link 
                  href="/instructions/ios"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  iOS Instructions
                </Link>
                <Link 
                  href="/instructions/android"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Android Instructions
                </Link>
              </div>
            </div>
            
            <div className="px-3">
              <h3 className="text-bar-accent font-semibold mb-1">Contact</h3>
              <div className="space-y-2">
                <Link 
                  href="/contact"
                  className="block px-3 py-2 text-white hover:bg-white/5 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 