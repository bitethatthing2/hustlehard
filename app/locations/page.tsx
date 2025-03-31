"use client";

import React from 'react';
import { useLocation, LocationProvider } from '@/contexts/LocationContext';
import PortlandMap from '@/components/maps/PortlandMap';
import SalemMap from '@/components/maps/SalemMap';
import LocationDirectionButtons from '@/components/maps/LocationDirectionButtons';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import PageHeader from '@/components/shared/PageHeader';
import { PhoneCall, Mail, Clock } from 'lucide-react';

const LocationsPageContent = () => {
  const { selectedLocation, locationData } = useLocation();
  
  const portlandInfo = locationData.portland;
  const salemInfo = locationData.salem;

  // Determine which location to show first based on the selected location
  const showPortlandFirst = selectedLocation === 'portland';
  
  return (
    <div className="container mx-auto px-4 py-8 mb-24">
      <PageHeader 
        title="Our Locations" 
        subtitle="Visit us at either of our locations in Portland or Salem"
      />
      
      <div className="max-w-xl mx-auto mb-8">
        <ThemeToggle className="max-w-xs mx-auto" />
      </div>
      
      <div className="flex flex-col gap-20 mt-12">
        {/* First Location (based on selectedLocation) */}
        <div className="flex flex-col gap-8" id={showPortlandFirst ? "portland" : "salem"}>
          <h2 className="text-3xl font-bold text-white text-center">
            {showPortlandFirst ? portlandInfo.name : salemInfo.name}
          </h2>
          
          {/* Map */}
          <div className="w-full max-w-4xl mx-auto">
            {showPortlandFirst ? <PortlandMap /> : <SalemMap />}
          </div>
          
          {/* Direction Buttons */}
          <LocationDirectionButtons location={showPortlandFirst ? 'portland' : 'salem'} />
          
          {/* Location Info */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white">Contact Information</h3>
              
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-white/60" />
                <p className="text-white">{showPortlandFirst ? portlandInfo.phone : salemInfo.phone}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60" />
                <p className="text-white">{showPortlandFirst ? portlandInfo.email : salemInfo.email}</p>
              </div>
              
              <p className="text-white mt-4">
                {showPortlandFirst ? portlandInfo.address : salemInfo.address}
              </p>
            </div>
            
            <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/60" />
                <h3 className="text-xl font-semibold text-white">Hours</h3>
              </div>
              
              <div className="space-y-2">
                {Object.entries(showPortlandFirst ? portlandInfo.hours : salemInfo.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-white/80">{day}</span>
                    <span className="text-white">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Location */}
        <div className="flex flex-col gap-8" id={showPortlandFirst ? "salem" : "portland"}>
          <h2 className="text-3xl font-bold text-white text-center">
            {showPortlandFirst ? salemInfo.name : portlandInfo.name}
          </h2>
          
          {/* Map */}
          <div className="w-full max-w-4xl mx-auto">
            {showPortlandFirst ? <SalemMap /> : <PortlandMap />}
          </div>
          
          {/* Direction Buttons */}
          <LocationDirectionButtons location={showPortlandFirst ? 'salem' : 'portland'} />
          
          {/* Location Info */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white">Contact Information</h3>
              
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-white/60" />
                <p className="text-white">{showPortlandFirst ? salemInfo.phone : portlandInfo.phone}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white/60" />
                <p className="text-white">{showPortlandFirst ? salemInfo.email : portlandInfo.email}</p>
              </div>
              
              <p className="text-white mt-4">
                {showPortlandFirst ? salemInfo.address : portlandInfo.address}
              </p>
            </div>
            
            <div className="flex flex-col gap-5 bg-black/30 p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-white/60" />
                <h3 className="text-xl font-semibold text-white">Hours</h3>
              </div>
              
              <div className="space-y-2">
                {Object.entries(showPortlandFirst ? salemInfo.hours : portlandInfo.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-white/80">{day}</span>
                    <span className="text-white">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
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