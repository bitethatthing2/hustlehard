"use client";

import React, { useState, useEffect } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  height?: string;
  width?: string;
  className?: string;
  zoom?: number;
  showControls?: boolean;
  scrollwheel?: boolean;
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  height = '400px',
  width = '100%',
  className = '',
  zoom = 16,
  showControls = true,
  scrollwheel = false,
  mapType = 'roadmap'
}) => {
  const { selectedLocation } = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Location data
  const locations = {
    salem: {
      address: "The Side Hustle Bar Salem, 325 High St SE, Salem, OR 97301",
      location: "325 High St SE, Salem, OR 97301",
      mapUrl: "https://www.google.com/maps/embed/v1/place",
      query: "Side+Hustle+Bar+Salem+OR"
    },
    portland: {
      address: "The Side Hustle Bar Portland, 1110 SE Division St, Portland, OR 97202",
      location: "1110 SE Division St, Portland, OR 97202",
      mapUrl: "https://www.google.com/maps/embed/v1/place",
      query: "Side+Hustle+Bar+Portland+OR"
    }
  };
  
  // Force reload of iframe when location changes
  useEffect(() => {
    setIsLoaded(false);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedLocation]);
  
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Handle iframe loading
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const currentLocation = locations[selectedLocation];
  
  // Hardcoded embed URLs for better reliability
  const portlandMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.2831380132644!2d-122.65576638446376!3d45.50493727910162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a7b3f75aeef%3A0xb30808567a1ad979!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1645558127244!5m2!1sen!2sus";
  const salemMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.155837503885!2d-123.04139512405341!3d44.94049986822883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1743394931645!5m2!1sen!2sus";
  
  // Use direct map URLs instead of API calls for reliability
  const mapSrc = selectedLocation === 'portland' ? portlandMapUrl : salemMapUrl;
  
  return (
    <div 
      className={`w-full overflow-hidden rounded-lg relative ${className}`} 
      style={{ height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mb-3"></div>
            <div className="text-white font-medium">Loading {selectedLocation === 'portland' ? 'Portland' : 'Salem'} map...</div>
          </div>
        </div>
      )}
      
      {/* Location label */}
      <div className="absolute top-2 right-2 z-20 bg-black/80 px-3 py-1 rounded-full border border-gray-700">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-bar-accent mr-1" />
          <span className="text-white text-sm font-medium">
            {selectedLocation === 'portland' ? 'Portland Location' : 'Salem Location'}
          </span>
        </div>
      </div>
      
      <iframe
        title={`Google Map - ${currentLocation.address}`}
        src={mapSrc}
        width={width}
        height={height}
        style={{ border: 0, width: '100%', height: '100%' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={handleLoad}
        className={`${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
      
      <div className="p-3 bg-black/80 border-t border-gray-700">
        <p className="text-white text-sm">{currentLocation.address}</p>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentLocation.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-xs transition"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default GoogleMap; 