"use client";

import React from 'react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';
import { MapPin, Phone, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function MobileFooter() {
  const { selectedLocation, locationData } = useLocation();
  const currentLocation = locationData[selectedLocation];
  
  // Format phone number for tel: link
  const formattedPhone = currentLocation.phone.replace(/\D/g, '');
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold">
            {selectedLocation === 'portland' ? 'Portland Location' : 'Salem Location'}
          </h3>
          <Button variant="link" asChild className="p-0 h-auto">
            <Link href="/locations" className="text-bar-accent text-sm flex items-center">
              View Map <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <Separator className="my-2 bg-gray-800" />
        
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center">
            <MapPin className="text-bar-accent h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-xs truncate">
              {currentLocation.address}
            </span>
          </div>
          
          <div className="flex items-center">
            <Phone className="text-bar-accent h-4 w-4 mr-2 flex-shrink-0" />
            <a 
              href={`tel:${formattedPhone}`} 
              className="text-gray-300 hover:text-white text-xs"
            >
              {currentLocation.phone}
            </a>
          </div>
          
          <div className="flex items-center">
            <Clock className="text-bar-accent h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-xs">
              Today: {currentLocation.hours[getDayOfWeek()]}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between mt-3">
          <Button 
            asChild 
            variant="default" 
            size="sm" 
            className="flex-1 mr-2 bg-bar-accent hover:bg-bar-accent/90"
          >
            <Link href="/order">
              Order Online
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="flex-1 border-gray-700"
          >
            <a href={`tel:${formattedPhone}`}>
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get current day of week
function getDayOfWeek() {
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  return days[new Date().getDay()];
} 