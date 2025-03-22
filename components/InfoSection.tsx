import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Bell } from 'lucide-react';
import { useLocationData } from '@/hooks/useLocationData';
import { useLocation } from '@/contexts/LocationContext';

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
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  
  // Google Maps URLs - using simpler URLs that are less likely to have issues
  const mapUrls = {
    portland: "https://maps.google.com/maps?q=Side+Hustle+Portland+OR&output=embed",
    salem: "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR&output=embed"
  };
  
  // Direct Google Maps links
  const directMapsUrls = {
    portland: "https://maps.google.com/maps?q=Side+Hustle+Portland+OR&z=15",
    salem: "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR&z=15"
  };

  // Reset map loaded state when location changes
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
        <div className="mt-8 mb-12 w-full">
          <div className="bg-black border border-gray-800 hover:border-bar-accent/30 rounded-lg overflow-hidden holographic-border">
            <div className="p-4 md:p-6 pb-2">
              <h3 className="font-display text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 text-center">Find Us</h3>
              <div className="map-container">
                {!mapLoaded && (
                  <div className="map-loading-indicator">
                    Loading map for {selectedLocation === 'portland' ? 'Portland' : 'Salem'}...
                  </div>
                )}
                
                {/* Use the ID-based approach for the map-fix.js script to find */}
                <div 
                  ref={iframeContainerRef}
                  className="map-iframe-container"
                  id={`map-container-${selectedLocation}`}
                />
              </div>
              {/* Direct link to Google Maps - always reliable */}
              <div className="text-center mt-2">
                <a 
                  href={directMapsUrls[selectedLocation]}
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