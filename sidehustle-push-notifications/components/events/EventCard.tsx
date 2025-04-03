'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
  image: string;
  upcoming: boolean;
}

export default function EventCard({ id, title, date, description, link, image, upcoming }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Use logo as fallback image to ensure we always have something to display
  const fallbackImage = '/only_these/logos/logo.png';
  
  return upcoming ? (
    <div 
      className="bg-black/60 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden group transform hover:scale-[1.02] transition-all duration-300"
    >
      <Link href={`/events/${id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute top-0 left-0 bg-black text-white font-bold py-1 px-4 rounded-br-lg z-10">
            Upcoming
          </div>
          <div className="absolute inset-0 bg-black/80 z-0"></div>
          <Image 
            src={imageError ? fallbackImage : image} 
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 z-5"
            onError={() => setImageError(true)}
            priority={upcoming}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 z-10"></div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/events/${id}`} className="block hover:bg-white/10 transition-colors">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        </Link>
        <p className="text-white font-medium mb-2">{date}</p>
        <p className="text-white mb-4">{description}</p>
        <div className="flex gap-3">
          <Link 
            href={`/events/${id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-transparent border border-white text-white rounded-md font-bold text-sm hover:bg-white/10 transition-colors transform hover:scale-[1.05] active:scale-[0.98]"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Event Details
          </Link>
          
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 border border-white/50 text-white rounded-md font-medium text-sm hover:bg-white/10 transition-colors"
            aria-label="View on Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div 
      className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-white/30 transition-all duration-300"
    >
      <Link href={`/events/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 z-0"></div>
          <Image 
            src={imageError ? fallbackImage : image} 
            alt={title}
            width={400}
            height={240}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 z-5"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 z-10"></div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/events/${id}`} className="block hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-bold mb-1 text-white">{title}</h3>
        </Link>
        <p className="text-white text-sm mb-2">{date}</p>
        <p className="text-white text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex gap-2">
          <Link 
            href={`/events/${id}`}
            className="inline-flex items-center text-white hover:bg-white/10 text-sm transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </Link>
          <span className="text-white">•</span>
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:bg-white/10 text-sm transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
} 