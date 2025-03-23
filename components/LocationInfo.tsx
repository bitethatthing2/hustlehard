import React from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { useLocationData } from '@/hooks/useLocationData';

export const LocationInfo: React.FC = () => {
  const { setShowLocationModal } = useLocation();
  const { currentLocation } = useLocationData();
  
  const handleChangeLocation = () => {
    setShowLocationModal(true);
  };
  
  // Get current day for hours display
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const todayHours = currentLocation.hours[today] || "Closed";
  
  // Check if currently open
  const isOpen = () => {
    const currentHour = new Date().getHours();
    const [openTime, closeTime] = todayHours.split(' - ');
    
    const openHour = parseInt(openTime.split(' ')[0]);
    let closeHour = parseInt(closeTime.split(' ')[0]);
    
    if (closeTime.includes('PM') && closeHour !== 12) {
      closeHour += 12;
    }
    
    if (closeHour === 2 && closeTime.includes('AM')) {
      closeHour += 24;
    }
    
    return currentHour >= openHour && currentHour < closeHour;
  };

  const openStatus = isOpen();
  
  return (
    <div className="card glass glass-hover">
      <div className="gradient-animate p-0.5 rounded-lg">
        <div className="bg-bar-dark/95 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-bar-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-white mb-1">{currentLocation.name}</h3>
                <div className="flex items-center text-sm text-gray-300 gap-2">
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-bar-accent" />
                    <span className="truncate max-w-[200px]">{currentLocation.address.split(',')[0]}</span>
                  </div>
                  <span className="text-gray-600">•</span>
                  <div className={`flex items-center ${openStatus ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${openStatus ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
                    <span className="text-sm font-medium">{openStatus ? 'Open Now' : 'Closed'}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-bar-accent/50 text-white hover:bg-bar-accent/20 transition-all duration-300"
                onClick={handleChangeLocation}
              >
                Change
              </Button>
            </div>
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 p-3">
            <div className="glass rounded-lg p-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 text-bar-accent mr-2" />
                <span className="text-sm font-medium text-white">Hours</span>
              </div>
              <p className="text-sm text-gray-300">Today: {todayHours}</p>
            </div>
            
            <div className="glass rounded-lg p-3 hover:bg-white/5 transition-colors">
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 text-bar-accent mr-2" />
                <span className="text-sm font-medium text-white">Contact</span>
              </div>
              <a 
                href={`tel:${currentLocation.phone}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {currentLocation.phone}
              </a>
            </div>
          </div>
          
          {/* Actions */}
          <div className="border-t border-bar-accent/20 p-3 flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 bg-bar-accent/10 hover:bg-bar-accent/20 text-white"
              onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(currentLocation.address)}`, '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 bg-bar-accent/10 hover:bg-bar-accent/20 text-white"
              onClick={() => window.open(`tel:${currentLocation.phone}`, '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo; 