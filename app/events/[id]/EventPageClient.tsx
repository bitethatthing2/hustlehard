'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventType } from '../eventsData';
import PageHeader from '@/components/shared/PageHeader';

interface EventPageClientProps {
  event: EventType;
  relatedEvents: EventType[];
}

export default function EventPageClient({ event, relatedEvents }: EventPageClientProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="aspect-[21/9] relative rounded-xl overflow-hidden">
            <Image
              src={imageError ? '/images/fallback-event.jpg' : event.image}
              alt={event.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <PageHeader
              title={event.title}
              subtitle={event.date}
              showBackButton={true}
              className="py-0 px-0"
            />
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-black/30 border border-white/20 rounded-xl p-4 md:p-6 mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Event Details</h2>
              <p className="text-white whitespace-pre-wrap">{event.fullDescription || event.description}</p>
            </div>

            {/* Gallery Section */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="bg-black/30 border border-white/20 rounded-xl p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {event.gallery.map((image: string, index: number) => (
                    <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${event.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/30 border border-white/20 rounded-xl p-4 md:p-6 sticky top-20">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                <p className="text-white">{event.location}</p>
                {event.address && (
                  <p className="text-white/70 text-sm mt-1">{event.address}</p>
                )}
              </div>

              {event.ticketLink && (
                <a
                  href={event.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-transparent border border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors mb-4"
                >
                  Get Tickets
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}

              {/* Social Share */}
              <div className="border-t border-white/20 pt-4 mt-4">
                <h3 className="text-lg font-bold text-white mb-3">Share Event</h3>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-white/80 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-white/80 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white hover:text-white/80 transition-colors"
                    aria-label="View on Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">More Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {relatedEvents.map(relatedEvent => (
                <Link
                  key={relatedEvent.id}
                  href={`/events/${relatedEvent.id}`}
                  className="group block bg-black/30 border border-white/20 rounded-xl overflow-hidden hover:border-white/50 transition-colors"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-bold text-white group-hover:text-white/80 transition-colors">
                      {relatedEvent.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">{relatedEvent.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 