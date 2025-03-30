'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  className?: string;
  label?: string;
}

export default function BackButton({ className = '', label = 'Back' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center text-white px-4 py-2 rounded-lg hover:bg-bar-accent/10 transition-all duration-300 group ${className}`}
      aria-label="Go back"
    >
      <svg 
        className="w-5 h-5 mr-2 text-bar-accent group-hover:translate-x-[-2px] transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="text-sm font-medium group-hover:text-bar-accent transition-colors">
        {label}
      </span>
    </button>
  );
} 