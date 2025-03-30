import React from 'react';
import { useLocation } from '@/contexts/LocationContext';

const LocationToggle: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <div className="relative flex items-center bg-black/80 p-1.5 rounded-full border-2 border-bar-accent/50 backdrop-blur-sm holographic-border shadow-lg w-[280px]">
      {/* Enhanced outer glow effect for the container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-bar-accent/30 via-white/10 to-bar-accent/30 blur-lg opacity-70 rounded-full"></div>
      
      {/* Sliding Indicator with enhanced glow */}
      <div
        className={`absolute h-[calc(100%-6px)] top-[3px] w-[calc(50%-3px)] rounded-full bg-gradient-to-r from-bar-accent/50 to-bar-accent/30 border border-bar-accent/70 shadow-lg transition-transform duration-300 ease-in-out pulsing-shadow ${
          selectedLocation === 'salem' ? 'translate-x-[calc(100%+3px)]' : 'translate-x-[3px]'
        }`}
      >
        <div className="absolute inset-0 bg-white/10 rounded-full"></div>
        {/* Additional inner glow for the active indicator */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-bar-accent/20 to-transparent blur-sm"></div>
      </div>
      
      {/* Portland Button */}
      <button
        onClick={() => setSelectedLocation('portland')}
        className={`relative z-10 px-4 py-2 rounded-full transition-all duration-300 text-sm font-bold tracking-wider w-1/2 ${
          selectedLocation === 'portland'
            ? 'text-white drop-shadow-glow'
            : 'text-white/60 hover:text-white/90 hover:drop-shadow-glow'
        }`}
      >
        PORTLAND
      </button>

      {/* Salem Button */}
      <button
        onClick={() => setSelectedLocation('salem')}
        className={`relative z-10 px-4 py-2 rounded-full transition-all duration-300 text-sm font-bold tracking-wider w-1/2 ${
          selectedLocation === 'salem'
            ? 'text-white drop-shadow-glow'
            : 'text-white/60 hover:text-white/90 hover:drop-shadow-glow'
        }`}
      >
        SALEM
      </button>
    </div>
  );
};

export default LocationToggle; 