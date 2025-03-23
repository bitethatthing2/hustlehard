import React from 'react';
import { useLocation } from '@/contexts/LocationContext';

const LocationToggle: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <div className="relative flex items-center bg-black/80 p-1.5 rounded-full border border-bar-accent/30 backdrop-blur-sm holographic-border shadow-lg w-[280px]">
      {/* Sliding Indicator */}
      <div
        className={`absolute h-[calc(100%-6px)] top-[3px] w-[calc(50%-3px)] rounded-full bg-gradient-to-r from-bar-accent/30 to-bar-accent/20 border border-bar-accent/50 shadow-lg transition-transform duration-300 ease-in-out ${
          selectedLocation === 'salem' ? 'translate-x-[calc(100%+3px)]' : 'translate-x-[3px]'
        }`}
      >
        <div className="absolute inset-0 bg-white/5 rounded-full"></div>
      </div>
      
      {/* Portland Button */}
      <button
        onClick={() => setSelectedLocation('portland')}
        className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 text-sm font-bold tracking-wider w-1/2 ${
          selectedLocation === 'portland'
            ? 'text-white'
            : 'text-white/50 hover:text-white/80'
        }`}
      >
        PORTLAND
      </button>

      {/* Salem Button */}
      <button
        onClick={() => setSelectedLocation('salem')}
        className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 text-sm font-bold tracking-wider w-1/2 ${
          selectedLocation === 'salem'
            ? 'text-white'
            : 'text-white/50 hover:text-white/80'
        }`}
      >
        SALEM
      </button>
    </div>
  );
};

export default LocationToggle; 