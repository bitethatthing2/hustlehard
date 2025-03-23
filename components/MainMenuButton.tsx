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
        className="flex items-center gap-3 px-4 py-2.5 bg-black/60 backdrop-blur-sm border border-gray-800 hover:border-bar-accent/30 rounded-lg shadow-lg holographic-border transition-all duration-300"
        aria-label="Open main menu"
      >
        <Image 
          src="/only_these/logos/menu_icon.png" 
          alt="Menu" 
          width={32} 
          height={32}
          className="object-contain w-8 h-auto"
          priority
        />
        <span className="text-bar-accent font-semibold text-sm">MENU</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-72 mt-2 bg-black/95 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm animate-fade-in holographic-border">
          <div className="py-4 px-3">
            {/* Quick Help Section */}
            <div className="mb-5 px-2 py-3 bg-bar-accent/10 rounded-lg border border-bar-accent/20">
              <h3 className="text-bar-accent font-semibold mb-2 flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Welcome to Side Hustle Bar
              </h3>
              <p className="text-gray-300 text-sm mb-3">Use this menu to navigate the app and discover all features:</p>
              <ul className="text-xs text-gray-400 space-y-1.5 pl-1">
                <li className="flex items-start">
                  <span className="text-bar-accent mr-1 mt-0.5">•</span>
                  <span>View our food menu and specials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bar-accent mr-1 mt-0.5">•</span>
                  <span>Find instructions for installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bar-accent mr-1 mt-0.5">•</span>
                  <span>See our latest events and news</span>
                </li>
              </ul>
            </div>

            {/* Navigation Section */}
            <div className="mb-4 px-2">
              <h3 className="text-bar-accent font-semibold mb-2 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                NAVIGATION
              </h3>
              <div className="space-y-1">
                <Link 
                  href="/"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </Link>
                <Link 
                  href="/events"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Events
                </Link>
                <Link 
                  href="/menu"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Food Menu
                </Link>
              </div>
            </div>
            
            {/* Instructions Section */}
            <div className="mb-4 px-2">
              <h3 className="text-bar-accent font-semibold mb-2 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                APP INSTRUCTIONS
              </h3>
              <div className="space-y-1">
                <Link 
                  href="/instructions/ios"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  iOS Installation Guide
                </Link>
                <Link 
                  href="/instructions/android"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Android Installation Guide
                </Link>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="px-2">
              <h3 className="text-bar-accent font-semibold mb-2 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                CONTACT US
              </h3>
              <div className="space-y-1">
                <Link 
                  href="/contact"
                  className="block px-3 py-2.5 text-white hover:bg-white/5 rounded-md transition-colors duration-200 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer with version */}
          <div className="py-2 px-4 border-t border-white/10 text-center">
            <span className="text-gray-500 text-xs">Side Hustle Bar • v1.0</span>
          </div>
        </div>
      )}
    </div>
  );
} 