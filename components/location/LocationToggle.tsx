import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from '@/contexts/LocationContext';
import Image from 'next/image';

const LocationToggle: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <div className="relative flex items-center p-1 bg-black rounded-full border border-white/10 shadow-md w-full max-w-xs mx-auto">
      {/* Portland Button */}
      <Button
        onClick={() => setSelectedLocation('portland')}
        variant="default"
        className={cn(
          "relative z-10 px-4 py-2 rounded-full w-1/2 border-0 shadow-none",
          selectedLocation === 'portland' 
            ? "bg-white text-black font-bold hover:bg-white"
            : "bg-transparent text-white hover:bg-white hover:text-black"
        )}
      >
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <Image 
              src="/only_these/logos/welcome_to_pack.png" 
              alt="Wolf Icon" 
              width={16} 
              height={16}
              className="object-contain" 
            />
          </div>
          <span className={selectedLocation === 'portland' ? "font-bold" : ""}>PORTLAND</span>
        </div>
      </Button>

      {/* Salem Button */}
      <Button
        onClick={() => setSelectedLocation('salem')}
        variant="default"
        className={cn(
          "relative z-10 px-4 py-2 rounded-full w-1/2 border-0 shadow-none",
          selectedLocation === 'salem' 
            ? "bg-white text-black font-bold hover:bg-white"
            : "bg-transparent text-white hover:bg-white hover:text-black"
        )}
      >
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white" style={{ backgroundColor: '#FFFFFF' }}>
            <Image 
              src="/only_these/logos/welcome_to_pack.png" 
              alt="Wolf Icon" 
              width={16} 
              height={16}
              className="object-contain" 
            />
          </div>
          <span className={selectedLocation === 'salem' ? "font-bold" : ""}>SALEM</span>
        </div>
      </Button>
    </div>
  );
};

export default LocationToggle; 