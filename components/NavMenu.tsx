'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-white bg-black border border-white rounded-md"
      >
        Instructions
        <svg 
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-black border border-white rounded-md shadow-lg">
          <div className="py-1">
            <Link 
              href="/instructions/ios" 
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              iOS Instructions
            </Link>
            <Link 
              href="/instructions/android" 
              className="block px-4 py-2 text-white hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Android Instructions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 