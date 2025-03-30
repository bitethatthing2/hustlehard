import React from 'react';
import { MapPin, Bell, Clock, Utensils, Music, Phone, Mail } from 'lucide-react';
import { useLocationData } from '@/hooks/useLocationData';
import { useLocation } from '@/contexts/LocationContext';

const InfoSection: React.FC = () => {
  const { currentLocation } = useLocationData();
  const { selectedLocation } = useLocation();
  
  return (
    <section className="py-16 md:py-20 bg-black w-full relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[40%] h-[1px] bg-gradient-to-l from-bar-accent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[1px] bg-gradient-to-r from-bar-accent to-transparent"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4">
        {/* Location description */}
        <div className="mb-12 text-center">
          <h2 className="section-title text-center mx-auto mb-6">{currentLocation.name}</h2>
          <p className="text-gray-300 text-lg mb-6 mx-auto max-w-3xl">{currentLocation.description}</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {currentLocation.serviceOptions.map((option, index) => (
              <span key={index} className="bg-bar-accent/20 text-white text-sm px-4 py-1.5 rounded-full border border-bar-accent/30 shadow-sm">
                {option}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Card */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-bar-accent/40 rounded-lg p-6 shadow-lg holographic-border transform transition-transform hover:scale-[1.01] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bar-accent/10 flex items-center justify-center mb-5">
                <MapPin className="h-8 w-8 text-bar-accent" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-4">Our Location</h3>
              
              <div className="bg-black/50 border border-gray-800 rounded-lg p-5 w-full mb-5">
                <p className="text-gray-300 text-base md:text-lg mb-3">
                  {currentLocation.address}
                </p>
                
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="flex items-center justify-center">
                    <Phone className="h-4 w-4 text-bar-accent mr-2" />
                    <span className="text-white">{currentLocation.phone}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="h-4 w-4 text-bar-accent mr-2" />
                    <span className="text-white">{currentLocation.email}</span>
                  </div>
                </div>
              </div>
              
              <a 
                href={`https://maps.google.com/maps?q=${encodeURIComponent(currentLocation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-bar-accent/20 hover:bg-bar-accent/30 text-white transition-colors duration-200 flex items-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
          
          {/* Operating Hours & Features */}
          <div className="bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-bar-accent/40 rounded-lg p-6 shadow-lg holographic-border transform transition-transform hover:scale-[1.01] duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-bar-accent/10 flex items-center justify-center mb-5">
                <Clock className="h-8 w-8 text-bar-accent" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-4">Hours & Features</h3>
              
              {/* Hours */}
              <div className="bg-black/50 border border-gray-800 rounded-lg p-4 w-full mb-6">
                <p className="font-semibold text-bar-accent mb-3">Opening Hours</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-left">
                    <p className="text-gray-400 text-sm">Monday - Thursday</p>
                    <p className="text-white">11am - 1am</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-sm">Friday - Saturday</p>
                    <p className="text-white">11am - 2am</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-sm">Sunday</p>
                    <p className="text-white">11am - 12am</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-400 text-sm">Happy Hour</p>
                    <p className="text-white">3pm - 6pm Daily</p>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="bg-bar-accent/10 border border-bar-accent/20 rounded-lg p-3 flex flex-col items-center">
                  <Utensils className="h-5 w-5 text-bar-accent mb-2" />
                  <span className="text-white text-xs">Full Kitchen</span>
                </div>
                <div className="bg-bar-accent/10 border border-bar-accent/20 rounded-lg p-3 flex flex-col items-center">
                  <Music className="h-5 w-5 text-bar-accent mb-2" />
                  <span className="text-white text-xs">Live Music</span>
                </div>
                <div className="bg-bar-accent/10 border border-bar-accent/20 rounded-lg p-3 flex flex-col items-center">
                  <Bell className="h-5 w-5 text-bar-accent mb-2" />
                  <span className="text-white text-xs">Notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection; 