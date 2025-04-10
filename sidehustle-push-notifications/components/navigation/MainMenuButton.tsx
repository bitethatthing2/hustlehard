'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MainMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting state for the portal
  useEffect(() => {
    setMounted(true);
    
    // Add event listener for opening the menu from other components
    const handleOpenMenu = () => {
      setIsOpen(true);
    };
    
    window.addEventListener('openMainMenu', handleOpenMenu);
    
    return () => {
      setMounted(false);
      window.removeEventListener('openMainMenu', handleOpenMenu);
    };
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

  const mainNavLinks = [
    {
      label: 'Home',
      href: '/',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Menu',
      href: '/menu',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: 'Order',
      href: '/order',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: 'Events',
      href: '/events',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const serviceLinks = [
    {
      label: 'Reservations',
      href: '/coming-soon/reservations',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      label: 'Catering',
      href: '/coming-soon/catering',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  const connectLinks = [
    {
      label: 'Social Media',
      href: '/social',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Meet The Pack',
      href: '/coming-soon/team',
      icon: (
        <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

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
          className="bg-black/90 w-full max-w-md rounded-lg border border-gray-700 shadow-xl max-h-[90vh] overflow-y-auto flex flex-col pointer-events-auto backdrop-blur-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700 sticky top-0 z-10 bg-black/90 backdrop-blur-md relative">
            <Button 
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-black bg-white hover:bg-white/90 relative rounded-full p-0 h-9 w-9 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="black" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
            
            {/* Empty div to maintain the space-between alignment */}
            <div></div>
          </div>

          <div className="flex flex-col p-0 overflow-y-auto">
            {/* Adding heading text in white - Moved to top */}
            <div className="text-center pt-3 pb-2">
              <h2 className="text-white text-2xl font-bold">SIDE HUSTLE BAR</h2>
              <p className="text-white text-sm mt-1">Portland's Premier Sports Bar & Restaurant</p>
            </div>
            
            {/* Adding white text description in the gap */}
            <div className="text-center px-4 py-2">
              <p className="text-white text-base">Experience the best food, drinks, and entertainment in Portland</p>
              <p className="text-white/80 text-sm mt-2">Join us for games, live music, and our famous tacos!</p>
            </div>
            
            {/* Navigation Section */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 text-base flex items-center text-white">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                NAVIGATION
              </h3>
              <div className="space-y-2">
                {mainNavLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="w-full justify-start h-14 bg-white hover:bg-white/90 border-gray-200"
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                        <div className="text-white">
                          {link.icon}
                        </div>
                      </div>
                      <span className="font-bold text-black">{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Services Section */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 text-base flex items-center text-white">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                SERVICES
              </h3>
              <div className="space-y-2">
                {serviceLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="w-full justify-start h-14 bg-white hover:bg-white/90 border-gray-200"
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                        <div className="text-white">
                          {link.icon}
                        </div>
                      </div>
                      <span className="font-bold text-black">{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Connect Section */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 text-base flex items-center text-white">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                </svg>
                CONNECT
              </h3>
              <div className="space-y-2">
                {connectLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="w-full justify-start h-14 bg-white hover:bg-white/90 border-gray-200"
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                        <div className="text-white">
                          {link.icon}
                        </div>
                      </div>
                      <span className="font-bold text-black">{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Install App Section */}
            <div className="mt-auto p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-bold mb-2 flex items-center text-black">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                INSTALL OUR APP
              </h3>
              <p className="text-black font-medium text-sm mb-4">Add our app to your home screen for the best experience:</p>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" className="bg-black hover:bg-black/90 border-gray-200 w-full justify-start h-14 text-white">
                  <Link href="/coming-soon/ios" className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 384 512">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                    </div>
                    <span className="font-bold text-white">iOS Installation Guide</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-black hover:bg-black/90 border-gray-200 w-full justify-start h-14 text-white">
                  <Link href="/coming-soon/android" className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 576 512">
                        <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55" />
                      </svg>
                    </div>
                    <span className="font-bold text-white">Android Installation Guide</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[40px]">
        <Button
          variant="default"
          onClick={() => setIsOpen(true)}
          className="rounded-full p-0 w-10 h-10 relative bg-white hover:bg-white/90 flex items-center justify-center overflow-hidden"
          aria-label="Open menu"
        >
          <Image
            src="/only_these/logos/menu_icon.png"
            alt="Menu"
            fill
            className="object-contain scale-100 rounded-full z-[60]"
          />
        </Button>
        <span className="text-[10px] font-bold text-black mt-1 text-center">Menu</span>
      </div>
      {mounted && isOpen && createPortal(<MenuContent />, document.body)}
    </>
  );
} 