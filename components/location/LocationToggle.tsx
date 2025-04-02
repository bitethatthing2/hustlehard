import React from 'react';
import { useLocation } from '@/contexts/LocationContext';
import Image from 'next/image';

const LocationToggle: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <div className="relative flex items-center justify-between p-2 bg-black rounded-full border border-white/10 shadow-md w-full max-w-xs mx-auto">
      {/* Salem Button */}
      <button
        onClick={() => setSelectedLocation('salem')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
          selectedLocation === 'salem' 
            ? "bg-white text-black font-bold"
            : "text-white hover:bg-white/10"
        }`}
      >
        <span className={selectedLocation === 'salem' ? "font-bold" : ""}>SALEM</span>
      </button>

      {/* Center Wolf Icon */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
          <Image 
            src="/only_these/logos/welcome_to_pack.png" 
            alt="Wolf Icon" 
            width={32} 
            height={32}
            className="object-contain" 
          />
        </div>
      </div>

      {/* Portland Button */}
      <button
        onClick={() => setSelectedLocation('portland')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
          selectedLocation === 'portland' 
            ? "bg-white text-black font-bold"
            : "text-white hover:bg-white/10"
        }`}
      >
        <span className={selectedLocation === 'portland' ? "font-bold" : ""}>PORTLAND</span>
      </button>
    </div>
  );
};

export default LocationToggle; 