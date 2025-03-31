'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function MainMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting state for the portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Menu content component
  const MenuContent = () => (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
      >
        <div 
          className="bg-black/90 w-full max-w-md rounded-lg border-2 border-bar-accent/40 shadow-2xl max-h-[90vh] flex flex-col pointer-events-auto backdrop-blur-md holographic-border glow-bar-accent"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-bar-accent/30 sticky top-0 z-10 bg-black/90 backdrop-blur-md">
            <h2 className="text-white font-bold text-lg drop-shadow-glow-sm">Menu</h2>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-bar-accent p-2 rounded-full transition-colors duration-300 hover:bg-bar-accent/10"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4 custom-scrollbar">
            {/* Online Order Section */}
            <div className="mb-6 px-4 py-4 bg-bar-accent/20 rounded-lg border-2 border-bar-accent/40 shadow-inner hover:border-bar-accent/50 transition-colors">
              <h3 className="text-bar-accent font-bold mb-2 flex items-center text-base">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Online
              </h3>
              <p className="text-gray-300 text-sm mb-4">Choose delivery or pickup options from our food menu:</p>
              <Link 
                href="/order"
                className="w-full flex items-center justify-center px-4 py-3 bg-bar-accent text-black rounded-md font-bold text-sm hover:bg-bar-accent/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                View Ordering Options
              </Link>
            </div>
            
            {/* Quick Help Section */}
            <div className="mb-6 px-4 py-4 bg-bar-accent/10 rounded-lg border-2 border-bar-accent/30 hover:border-bar-accent/40 transition-colors">
              <h3 className="text-bar-accent font-bold mb-2 flex items-center text-base">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Welcome to Side Hustle Bar
              </h3>
              <p className="text-gray-300 text-sm mb-3">Use this menu to navigate the app and discover all features:</p>
              <ul className="text-xs text-gray-300 space-y-2 pl-2">
                <li className="flex items-start">
                  <span className="text-bar-accent mr-2 mt-0.5 font-bold">•</span>
                  <span>View our food menu and specials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bar-accent mr-2 mt-0.5 font-bold">•</span>
                  <span>Find instructions for installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bar-accent mr-2 mt-0.5 font-bold">•</span>
                  <span>See our latest events and news</span>
                </li>
              </ul>
            </div>

            {/* Navigation Section */}
            <div className="mb-6 px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                NAVIGATION
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Home</span>
                  </div>
                </Link>
                <Link 
                  href="/events"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Events</span>
                  </div>
                </Link>
                <Link 
                  href="/menu"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Food Menu</span>
                  </div>
                </Link>
                <Link 
                  href="/order"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Order Online</span>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* New Sections */}
            <div className="mb-6 px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                SERVICES
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/reservations"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">VIP Reservations</span>
                  </div>
                </Link>
                <Link 
                  href="/catering"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Book Catering</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* About Us Section */}
            <div className="mb-6 px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ABOUT US
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/djs"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Side Hustle DJs</span>
                  </div>
                </Link>
                <Link 
                  href="/team"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Meet The Pack</span>
                  </div>
                </Link>
                <Link 
                  href="/blog"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Becky's Blog</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Employment Section */}
            <div className="mb-6 px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                EMPLOYMENT
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/careers"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Job Opportunities</span>
                  </div>
                </Link>
                <Link 
                  href="/employee-portal"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Employee Scheduling</span>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Instructions Section */}
            <div className="mb-6 px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                APP INSTRUCTIONS
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/instructions/ios"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">iOS Installation Guide</span>
                  </div>
                </Link>
                <Link 
                  href="/instructions/android"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Android Installation Guide</span>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="px-2">
              <h3 className="text-bar-accent font-bold mb-3 text-base flex items-center px-2">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                CONTACT US
              </h3>
              <div className="space-y-2">
                <Link 
                  href="/contact"
                  className="block px-4 py-3.5 text-black bg-white hover:bg-white hover:from-bar-accent/30 hover:to-bar-accent/10 rounded-lg transition-all duration-300 flex items-center border border-gray-700 hover:border-bar-accent holographic-bg hover:shadow-glow-sm transform hover:translate-x-1 shadow-[0_0_8px_2px_rgba(59,130,246,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-bar-accent/20 flex items-center justify-center mr-3 holographic-bg">
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-black group-hover:text-bar-accent">Contact Information</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="py-3 px-4 border-t border-bar-accent/30 text-center bg-black/60 backdrop-blur-md">
            <span className="text-gray-400 text-xs">Side Hustle Bar • v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex items-center gap-2">
      <ThemeToggle />
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-black/80 backdrop-blur-md border-2 border-gray-800 hover:border-bar-accent rounded-lg shadow-lg holographic-border transition-all duration-300 hover:bg-black/90 hover:scale-105 hover:shadow-xl"
        aria-label="Open main menu"
        {...(isOpen ? {'aria-expanded': 'true'} : {'aria-expanded': 'false'})}
      >
        <Image 
          src="/only_these/logos/menu_icon.png" 
          alt="Menu" 
          width={32} 
          height={32}
          className="object-contain w-6 h-auto sm:w-8 drop-shadow-glow"
          priority
        />
        <span className="text-bar-accent font-bold text-sm tracking-wide">MENU</span>
      </button>

      {/* Render menu content with portal to ensure it appears on top */}
      {mounted && isOpen && createPortal(<MenuContent />, document.body)}
    </div>
  );
} 