"use client";

import React, { useEffect } from 'react';
import { useLocation, LocationProvider } from '@/contexts/LocationContext';
import PortlandMap from '@/components/maps/PortlandMap';
import SalemMap from '@/components/maps/SalemMap';
import LocationDirectionButtons from '@/components/maps/LocationDirectionButtons';
import PageHeader from '@/components/shared/PageHeader';
import { PhoneCall, Mail, Clock } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import GoogleMap from '@/components/maps/GoogleMap';
import { LocationSwitch } from '@/components/ui/location-switch';

const LocationsPageContent = () => {
  const { selectedLocation, locationData } = useLocation();
  const { theme } = useTheme();
  
  // Get the active location data
  const activeLocation = selectedLocation === 'portland' ? locationData.portland : locationData.salem;
  
  // YouTube embed URLs for each location (replace with actual URLs)
  const portlandEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359640.0992522873!2d-123.1637501704348!3d45.233873097998526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1743394983254!5m2!1sen!2sus";
  const salemEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.155837503885!2d-123.04139512405341!3d44.94049986822883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1743394931645!5m2!1sen!2sus";
  
  // Get the current embed URL based on selected location
  const currentEmbedUrl = selectedLocation === 'portland' ? portlandEmbedUrl : salemEmbedUrl;
  
  return (
    <div className="container mx-auto px-4 py-8 mb-24">
      <PageHeader 
        title="Our Locations" 
        subtitle="Visit us at either of our locations in Portland or Salem"
      />
      
      <div className="flex flex-col items-center mb-6">
        {/* Location Switch - Prominently displayed */}
        <div className="w-full max-w-md mx-auto">
          <LocationSwitch className="w-full mx-auto" />
        </div>
        
        {/* Active Location Title */}
        <h2 className="text-3xl font-bold text-white text-center mt-6 mb-4">
          {activeLocation.name}
        </h2>
      </div>
      
      {/* Active Location Map - Directly below toggle */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="mb-6">
          {selectedLocation === 'portland' ? <PortlandMap /> : <SalemMap />}
        </div>
        <LocationDirectionButtons location={selectedLocation} />
      </div>
      
      {/* YouTube Embed Section - Changes based on location toggle */}
      <div className="w-full max-w-4xl mx-auto mt-8 mb-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <Image 
              src="/only_these/logos/hustle_pdx_for_maps.png"
              alt="Side Hustle Map Icon"
              width={80}
              height={80}
              className="w-16 h-16 object-contain"
            />
            <h3 className="text-2xl font-bold text-white text-center">
              {selectedLocation === 'portland' ? 'SIDEHUSTLE PDX' : 'SIDEHUSTLE SALEM'}
            </h3>
          </div>
          
          <GoogleMap
            height="500px" 
            className="w-full" 
            showControls={true}
            scrollwheel={false}
          />
          
          <p className="text-white/80 mt-4 text-center max-w-2xl">
            {selectedLocation === 'portland' 
              ? 'THE WOLF IS IN DOWNTOWN PDX' 
              : 'THE WOLF IS IN DOWNTOWN SALEM'}
          </p>
        </div>
      </div>
      
      {/* Location Details for the active location */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
        <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold text-white">Contact Information</h3>
          
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-white/60" />
            <p className="text-white">{activeLocation.phone}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-white/60" />
            <p className="text-white">{activeLocation.email}</p>
          </div>
          
          <p className="text-white mt-4">
            {activeLocation.address}
          </p>
        </div>
        
        <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-white/60" />
            <h3 className="text-xl font-semibold text-white">Hours</h3>
          </div>
          
          <div className="space-y-2">
            {Object.entries(activeLocation.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center">
                <span className="text-white/80">{day}</span>
                <span className="text-white">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LocationsPage() {
  return (
    <LocationProvider>
      <LocationsPageContent />
    </LocationProvider>
  );
} 