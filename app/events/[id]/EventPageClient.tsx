'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { eventsData } from '../eventsData';
import PageHeader from '@/components/shared/PageHeader';

// Related Event Card Component
function RelatedEventCard({ event }: { event: typeof eventsData[0] }) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/only_these/logos/logo.png';
  
  return (
    <Link 
      href={`/events/${event.id}`}
      className="flex items-center gap-3 group hover:bg-black/20 p-2 rounded-lg transition-colors"
    >
      <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-800/80"></div>
        <Image 
          src={imageError ? fallbackImage : event.image}
          alt={event.title}
          fill
          className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      </div>
      <div>
        <h4 className="text-white font-medium group-hover:text-bar-accent transition-colors">{event.title}</h4>
        <p className="text-gray-400 text-sm">{event.date}</p>
      </div>
    </Link>
  );
}

interface EventPageClientProps {
  event: typeof eventsData[0];
  relatedEvents: typeof eventsData;
}

export default function EventPageClient({ event, relatedEvents }: EventPageClientProps) {
  // State for image error handling
  const [imageError, setImageError] = useState(false);
  const [galleryErrors, setGalleryErrors] = useState<{[key: number]: boolean}>({});
  
  // Fallback image
  const fallbackImage = '/only_these/logos/logo.png';
  
  return (
    <div className="container mx-auto px-4 text-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] mb-12 overflow-hidden rounded-xl">
        {/* Background gradient as a fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-gray-800/90 z-0"></div>
        
        <Image 
          src={imageError ? fallbackImage : event.image} 
          alt={event.title}
          fill
          className="object-cover object-center z-10"
          onError={() => setImageError(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-20"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-30">
          <PageHeader
            title={event.title}
            className="p-0 text-left"
            showBackButton={false}
          />
          
          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            
            {event.upcoming && (
              <div className="flex items-center ml-auto">
                <span className="px-3 py-1 bg-bar-accent text-black text-sm font-bold rounded-full">
                  Upcoming
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-bar-accent">About the Event</h2>
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: event.fullDescription }}
            />
          </section>
          
          {/* Event Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-bar-accent">Event Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.gallery.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-gray-800/80"></div>
                    <Image 
                      src={galleryErrors[index] ? fallbackImage : img} 
                      alt={`${event.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      onError={() => setGalleryErrors(prev => ({...prev, [index]: true}))}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Social Media */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-bar-accent">Share This Event</h2>
            <div className="flex gap-4">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://sidehustlebar.com/events/${event.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1877F2] text-white hover:bg-opacity-90 transition-opacity"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${event.title} at Side Hustle Bar!`)}&url=${encodeURIComponent(`https://sidehustlebar.com/events/${event.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-opacity"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              
              <a 
                href={`https://www.instagram.com/sidehustle_bar/`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-[#E1306C] text-white hover:bg-opacity-90 transition-opacity"
                aria-label="Follow on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Event Details */}
          <div className="bg-black/60 border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4 text-bar-accent">Event Details</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-400 text-sm">Date & Time</h4>
                <p className="text-white">{event.date}</p>
              </div>
              
              <div>
                <h4 className="text-gray-400 text-sm">Location</h4>
                <p className="text-white">{event.location}</p>
                <p className="text-gray-300 text-sm">{event.address}</p>
              </div>
              
              <div>
                <h4 className="text-gray-400 text-sm">Tickets</h4>
                {event.upcoming && event.ticketLink ? (
                  <a 
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center w-full px-4 py-3 mt-2 bg-bar-accent text-black rounded-md font-bold text-sm hover:bg-bar-accent/90 transition-colors transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Purchase Tickets
                  </a>
                ) : (
                  <p className="text-gray-300">
                    {event.upcoming ? "Tickets available soon" : "Event has ended"}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Related Events */}
          <div className="bg-black/60 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-bar-accent">Other Events</h3>
            
            <div className="space-y-4">
              {relatedEvents.map(relatedEvent => (
                <RelatedEventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
