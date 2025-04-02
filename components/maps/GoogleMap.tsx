"use client";

import React, { useState, useEffect } from 'react';
import { useLocation } from '@/contexts/LocationContext';

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
  
  // Format URL parameters
  const params = new URLSearchParams({
    key: 'AIzaSyB71GmQ4CrYfmwjKPLzTHz0_xJasKTQXPE', // This key is restricted to your domain
    q: currentLocation.query,
    zoom: zoom.toString(),
    maptype: mapType,
    language: 'en',
    region: 'us'
  });
  
  if (showControls) {
    params.append('controls', '1');
  } else {
    params.append('controls', '0');
  }
  
  if (!scrollwheel) {
    params.append('scrollwheel', '0');
  }
  
  // Add mobile optimizations
  if (isMobile) {
    params.append('mobile', '1');
  }
  
  const mapSrc = `${currentLocation.mapUrl}?${params.toString()}`;
  
  return (
    <div 
      className={`w-full overflow-hidden rounded-lg border border-gray-700 flex flex-col ${className}`} 
      style={{ height }}
    >
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-black/50">
          <div className="text-white">Loading map...</div>
        </div>
      )}
      
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
          View in Google Maps
        </a>
      </div>
    </div>
  );
};

export default GoogleMap; 