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
  const [useStaticMap, setUseStaticMap] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Google Maps embed URL based on selected location
  const mapEmbedUrl = selectedLocation === 'portland' 
    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.159563601747!2d-122.67878942359386!3d45.518537171074875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1742617552675!5m2!1sen!2sus"
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.156024280599!2d-123.0413951236238!3d44.940496071070314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1742617510961!5m2!1sen!2sus";
  
  // Static map image URLs as fallback
  const staticMapUrl = selectedLocation === 'portland'
    ? "https://maps.googleapis.com/maps/api/staticmap?center=Side+Hustle+Portland+OR&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7CSide+Hustle+Portland+OR&key=AIzaSyDgj1UEy7_iTt8-Xg_6s6-H9ASiFKCELwM"
    : "https://maps.googleapis.com/maps/api/staticmap?center=Side+Hustle+Bar+Salem+OR&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7CSide+Hustle+Bar+Salem+OR&key=AIzaSyDgj1UEy7_iTt8-Xg_6s6-H9ASiFKCLwM";
  
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
    if (mapVisible && !useStaticMap) {
      // Add a small delay to ensure the iframe is in the DOM
      const timer = setTimeout(() => {
        const iframe = document.querySelector('.map-iframe') as HTMLIFrameElement;
        if (iframe && window.ensureIframeLoads) {
          window.ensureIframeLoads(iframe);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [mapVisible, useStaticMap]);
  
  // Reset map state when location changes
  useEffect(() => {
    setMapLoaded(false);
    setUseStaticMap(false);
    setLoadAttempts(0);
  }, [selectedLocation]);
  
  const handleMapLoad = () => {
    setMapLoaded(true);
    setLoadAttempts(0);
  };

  const handleMapError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error('Error loading map', e);
    setMapLoaded(false);
    
    // Try reloading the iframe a few times before falling back to static image
    setLoadAttempts(prev => {
      const newAttempts = prev + 1;
      if (newAttempts >= 3) {
        setUseStaticMap(true);
        return 0;
      }
      
      // Try reloading the iframe
      const iframe = e.target as HTMLIFrameElement;
      if (iframe) {
        setTimeout(() => {
          const currentSrc = iframe.src;
          iframe.src = 'about:blank';
          setTimeout(() => {
            iframe.src = currentSrc;
          }, 50);
        }, 1000);
      }
      
      return newAttempts;
    });
  };
  
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
              <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md map-container">
                {!mapLoaded && !useStaticMap && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-center p-4">
                    Loading map...
                  </div>
                )}
                
                {useStaticMap ? (
                  // Fallback static map image
                  <div className="w-full h-full relative">
                    <Image 
                      src={staticMapUrl}
                      alt={`Map of ${currentLocation.name}`}
                      fill
                      style={{objectFit: 'cover'}}
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  // Interactive map iframe
                  mapVisible && (
                    <iframe 
                      src={mapEmbedUrl}
                      className={`map-iframe w-full h-full ${mapLoaded ? 'map-iframe-visible' : 'map-iframe-hidden'}`}
                      allowFullScreen 
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${currentLocation.name} Map`}
                      onLoad={handleMapLoad}
                      onError={handleMapError}
                    ></iframe>
                  )
                )}
              </AspectRatio>
              {/* Direct link to Google Maps */}
              <div className="text-center mt-2">
                <a 
                  href={selectedLocation === 'portland' 
                    ? "https://maps.google.com/maps?q=Side+Hustle+Portland+OR"
                    : "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bar-accent text-sm hover:underline"
                >
                  Open in Google Maps
                </a>
                {useStaticMap && (
                  <button 
                    onClick={() => {
                      setUseStaticMap(false);
                      setMapLoaded(false);
                      setLoadAttempts(0);
                    }}
                    className="text-bar-accent text-sm hover:underline ml-4"
                  >
                    Try interactive map
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 