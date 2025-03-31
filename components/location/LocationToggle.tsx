import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from '@/contexts/LocationContext';

const LocationToggle: React.FC = () => {
  const { selectedLocation, setSelectedLocation } = useLocation();

  return (
    <div className="relative flex items-center p-1 bg-background/20 backdrop-blur-sm rounded-full border border-white/10 shadow-md w-full max-w-xs mx-auto">
      {/* Sliding indicator */}
      <div
        className={cn(
          "absolute h-[calc(100%-8px)] top-[4px] w-[calc(50%-4px)] rounded-full bg-white/10 border border-white/20 shadow-sm transition-transform duration-300 ease-in-out",
          selectedLocation === 'salem' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-[4px]'
        )}
      />
      
      {/* Portland Button */}
      <Button
        onClick={() => setSelectedLocation('portland')}
        variant={selectedLocation === 'portland' ? 'default' : 'ghost'}
        className={cn(
          "relative z-10 px-4 py-2 rounded-full w-1/2 border-0 shadow-none bg-transparent",
          selectedLocation === 'portland' 
            ? "text-black font-bold bg-white"
            : "text-white hover:text-white/90 hover:bg-white/10"
        )}
      >
        PORTLAND
      </Button>

      {/* Salem Button */}
      <Button
        onClick={() => setSelectedLocation('salem')}
        variant={selectedLocation === 'salem' ? 'default' : 'ghost'}
        className={cn(
          "relative z-10 px-4 py-2 rounded-full w-1/2 border-0 shadow-none bg-transparent",
          selectedLocation === 'salem' 
            ? "text-black font-bold bg-white"
            : "text-white hover:text-white/90 hover:bg-white/10"
        )}
      >
        SALEM
      </Button>
    </div>
  );
};

export default LocationToggle; 