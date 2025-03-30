import React from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, X, Clock, Phone, Navigation } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useLocationData } from '@/hooks/useLocationData';
import { useIsMobile } from '@/hooks/use-mobile';

export const LocationSelect: React.FC = () => {
  const { showLocationModal, setShowLocationModal, setSelectedLocation } = useLocation();
  const { locationData } = useLocationData();
  const isMobile = useIsMobile();

  const getCurrentStatus = (location: 'salem' | 'portland') => {
    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const currentHour = new Date().getHours();
    
    const locationHours = locationData[location].hours[currentDay];
    const [openTime, closeTime] = locationHours.split(' - ');
    
    const openHour = parseInt(openTime.split(' ')[0]);
    let closeHour = parseInt(closeTime.split(' ')[0]);
    
    if (closeTime.includes('PM') && closeHour !== 12) {
      closeHour += 12;
    }
    
    if (closeHour === 2 && closeTime.includes('AM')) {
      closeHour += 24;
    }
    
    const isOpen = currentHour >= openHour && currentHour < closeHour;
    
    return {
      isOpen,
      status: isOpen ? 'Open' : 'Closed',
      hours: locationHours
    };
  };

  const handleSelectLocation = (location: 'salem' | 'portland') => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const LocationCard = ({ location }: { location: 'salem' | 'portland' }) => {
    const currentLocation = locationData[location];
    const { status, hours, isOpen } = getCurrentStatus(location);
    
    return (
      <Card className="card glass glass-hover border-bar-accent/30 overflow-hidden">
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={location === 'salem' 
                ? 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
                : 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'
              }
              alt={currentLocation.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-display text-white mb-1">{currentLocation.name}</h3>
            <div className="flex items-center gap-3 text-sm">
              <div className={`flex items-center ${isOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOpen ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
                <span>{status}</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-gray-300">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-bar-accent" />
                <span>Today: {hours}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-1 text-bar-accent flex-shrink-0" />
            <p className="text-sm text-gray-300">{currentLocation.address}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-1 bg-bar-accent/10 hover:bg-bar-accent/20 text-white"
              onClick={() => handleSelectLocation(location)}
            >
              Select Location
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-bar-accent/10 hover:bg-bar-accent/20 text-white"
              onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(currentLocation.address)}`, '_blank')}
            >
              <Navigation className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-bar-accent/10 hover:bg-bar-accent/20 text-white"
              onClick={() => window.open(`tel:${currentLocation.phone}`, '_blank')}
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  if (isMobile) {
    return (
      <Sheet open={showLocationModal} onOpenChange={setShowLocationModal}>
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-xl overflow-hidden bg-bar-dark">
          <SheetHeader className="px-4 py-3 border-b border-bar-accent/20 flex flex-row justify-between items-center sticky top-0 bg-bar-dark/95 backdrop-blur-sm z-10">
            <SheetTitle className="text-lg font-display text-white">Choose Your Location</SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowLocationModal(false)} 
              className="text-white h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          
          <div className="overflow-auto h-full pb-safe">
            <div className="grid grid-cols-1 gap-4 p-4">
              {(['salem', 'portland'] as const).map((location) => (
                <LocationCard key={location} location={location} />
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
      <DialogContent className="sm:max-w-[800px] p-6 bg-bar-dark border-bar-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-center text-white mb-6">Choose Your Location</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(['salem', 'portland'] as const).map((location) => (
            <LocationCard key={location} location={location} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelect; 