import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Bell } from 'lucide-react';
import { useLocationData } from '@/hooks/useLocationData';
import { useLocation } from '@/contexts/LocationContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

// Declare the global window type extension
declare global {
  interface Window {
    ensureIframeLoads?: (iframe: HTMLIFrameElement) => void;
  }
}

const InfoSection: React.FC = () => {
  const { currentLocation } = useLocationData();
  const { selectedLocation } = useLocation();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Direct link to maps
  const directMapsUrl = selectedLocation === 'portland' 
    ? "https://maps.google.com/maps?q=Side+Hustle+Portland+OR&z=15"
    : "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR&z=15";
  
  // Much simpler URL format that works in more browsers
  const simpleMapUrl = selectedLocation === 'portland'
    ? "https://maps.google.com/maps?q=Side+Hustle+Portland+OR&output=embed"
    : "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR&output=embed";
  
  // Use IntersectionObserver to detect when the map is in view
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setMapVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1, // 10% of the element is visible
      rootMargin: '200px', // Start loading when element is 200px from viewport
    });
    
    observer.observe(mapContainerRef.current);
    
    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current);
      }
    };
  }, []);
  
  // Effect to handle iframe reference after it's created
  useEffect(() => {
    if (mapVisible) {
      // Create a new iframe element for simplicity and reliability 
      const container = document.querySelector('.map-container');
      if (container) {
        const existingIframe = container.querySelector('iframe');
        if (existingIframe) {
          existingIframe.remove();
        }

        const iframe = document.createElement('iframe');
        iframe.src = simpleMapUrl;
        iframe.className = 'map-iframe w-full h-full';
        iframe.style.border = '0';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.loading = 'lazy';
        
        iframe.onload = () => {
          setMapLoaded(true);
          iframe.classList.add('map-iframe-visible');
        };
        
        container.appendChild(iframe);
      }
    }
  }, [mapVisible, simpleMapUrl]);
  
  // Reset map state when location changes
  useEffect(() => {
    setMapLoaded(false);
  }, [selectedLocation]);
  
  return (
    <section className="py-12 md:py-16 bg-black w-full">
      <div className="w-full max-w-[100%] px-2">
        {/* Location description */}
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">{currentLocation.name}</h2>
          <p className="text-gray-300 text-lg mb-4 mx-auto">{currentLocation.description}</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {currentLocation.serviceOptions.map((option, index) => (
              <span key={index} className="bg-bar-accent/20 text-white text-sm px-3 py-1 rounded-full border border-bar-accent/30">
                {option}
              </span>
            ))}
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Location */}
          <div className="bg-black border border-gray-800 hover:border-bar-accent/30 rounded-lg p-4 md:p-6 shadow-lg holographic-border">
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-10 w-10 md:h-12 md:w-12 text-bar-accent mb-3 md:mb-4" />
              <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Location</h3>
              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                {currentLocation.address}
              </p>
              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                <strong className="text-white">Phone:</strong> {currentLocation.phone}<br />
                <strong className="text-white">Email:</strong> {currentLocation.email}
              </p>
            </div>
          </div>
          
          {/* Connect */}
          <div className="bg-black border border-gray-800 hover:border-bar-accent/30 rounded-lg p-4 md:p-6 shadow-lg holographic-border">
            <div className="flex flex-col items-center text-center">
              <Bell className="h-10 w-10 md:h-12 md:w-12 text-bar-accent mb-3 md:mb-4" />
              <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Stay Connected</h3>
              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                Enable notifications to stay updated with our latest events, special offers, and happy hour announcements.
              </p>
            </div>
          </div>
        </div>
        
        {/* Google Maps embed */}
        <div className="mt-8 mb-12 w-full" ref={mapContainerRef}>
          <div className="bg-black border border-gray-800 hover:border-bar-accent/30 rounded-lg overflow-hidden holographic-border">
            <div className="p-4 md:p-6 pb-2">
              <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 text-center">Find Us</h3>
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md map-container" style={{ minHeight: "300px" }}>
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-center p-4">
                    Loading map...
                  </div>
                )}
                {/* The iframe will be injected by the useEffect */}
              </AspectRatio>
              {/* Direct link to Google Maps */}
              <div className="text-center mt-2">
                <a 
                  href={directMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bar-accent text-sm hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 