"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocation } from '@/contexts/LocationContext';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, ArrowUp, ShoppingCart, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function DynamicFooter() {
  const { selectedLocation, locationData } = useLocation();
  const currentLocation = locationData[selectedLocation];
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Add scroll to top functionality
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Format phone number for tel: link
  const formattedPhone = currentLocation.phone.replace(/\D/g, '');
  
  return (
    <section className="w-full bg-black relative">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-md shadow-lg hover:bg-gray-200 transition-all flex items-center gap-2 font-bold"
          aria-label="Return to top"
        >
          <span className="text-black">Return to Top</span>
          <ArrowUp className="h-4 w-4 text-black" />
        </button>
      )}
      
      <div className="container mx-auto py-12 px-8">
        {/* Newsletter signup */}
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mb-4">
            <Users className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="mb-6 flex-1 text-center">
            <h3 className="text-white font-bold text-2xl mb-2">Join Our Community</h3>
            <p className="text-gray-400">Get updates on events, specials, and more!</p>
          </div>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email"
              className="px-4 py-3 rounded bg-black border border-gray-700 text-white focus:border-white focus:outline-none" 
            />
            <a href="#" className="flex items-center justify-center py-3 px-6 bg-white hover:bg-gray-100 text-black font-bold text-base rounded-md">
              <Mail className="h-5 w-5 text-black mr-2" strokeWidth={2.5} />
              <span className="text-black">Subscribe</span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row flex-wrap gap-10 lg:gap-16">
          {/* Logo and Description Section */}
          <div className="flex flex-col flex-1 min-w-[250px]">
            <div className="mb-6 relative h-16 w-40">
              <Image 
                src="/only_these/logos/SHB_Logo_WhiteonBlackBG.png"
                alt="Side Hustle Bar Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 mb-6">
              {selectedLocation === 'portland' 
                ? "Portland's premier sports bar and restaurant serving amazing food and drinks in the heart of downtown."
                : "Salem's top destination for food, drinks, and entertainment in a stylish and vibrant setting."}
            </p>
            
            <div className="mt-auto flex space-x-4">
              <a 
                href="https://instagram.com/sidehustlebar" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="h-10 w-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-5 w-5 text-black" strokeWidth={2.5} />
              </a>
              <a 
                href="https://facebook.com/sidehustlebar" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="h-10 w-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Facebook className="h-5 w-5 text-black" strokeWidth={2.5} />
              </a>
            </div>
          </div>
          
          {/* Location Details Section */}
          <div className="flex flex-col flex-1 min-w-[250px]">
            <h3 className="text-white font-bold mb-5 text-xl">Visit {currentLocation.name.split('-')[1].trim()}</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{currentLocation.address}</p>
                  <Link href="/locations" className="text-white text-sm hover:underline mt-1 inline-block">
                    Get directions
                  </Link>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${formattedPhone}`} className="text-gray-300 hover:text-white">
                    {currentLocation.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`mailto:${currentLocation.email}`} className="text-gray-300 hover:text-white">
                    {currentLocation.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="text-white h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Today: {currentLocation.hours[getDayOfWeek()]}</p>
                  <button className="text-white text-sm hover:underline mt-1" onClick={() => document.getElementById('hours-details')?.classList.toggle('hidden')}>
                    View all hours
                  </button>
                  <div id="hours-details" className="hidden mt-2 space-y-1">
                    {Object.entries(currentLocation.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-400 text-xs">{day}</span>
                        <span className="text-gray-300 text-xs">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links Section */}
          <div className="flex flex-1 min-w-[250px]">
            <div className="w-1/2">
              <h3 className="text-white font-bold mb-5 text-xl">Menu</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/menu/food" className="text-gray-300 hover:text-white transition-colors">
                    Food Menu
                  </Link>
                </li>
                <li>
                  <Link href="/menu/drinks" className="text-gray-300 hover:text-white transition-colors">
                    Drinks
                  </Link>
                </li>
                <li>
                  <Link href="/menu/happy-hour" className="text-gray-300 hover:text-white transition-colors">
                    Happy Hour
                  </Link>
                </li>
                <li>
                  <Link href="/menu/specials" className="text-gray-300 hover:text-white transition-colors">
                    Daily Specials
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="w-1/2">
              <h3 className="text-white font-bold mb-5 text-xl">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-gray-300 hover:text-white transition-colors">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Call to Action Section */}
          <div className="flex flex-col flex-1 min-w-[250px]">
            <h3 className="text-white font-bold mb-5 text-xl">Ready to Order?</h3>
            <div className="rounded-lg py-4 flex flex-col">
              <p className="text-gray-300 mb-4">Order online for pickup or delivery</p>
              <a 
                href="/order" 
                className="flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-gray-100 text-black font-bold text-base rounded-md mb-4"
              >
                <ShoppingCart className="h-5 w-5 text-black" strokeWidth={2.5} />
                <span className="text-black">Order Online</span>
              </a>
              <a 
                href="/reservations"
                className="flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-gray-100 text-black font-bold text-base rounded-md"
              >
                <Calendar className="h-5 w-5 text-black" strokeWidth={2.5} />
                <span className="text-black">Make a Reservation</span>
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-10 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Side Hustle Bar. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to get current day of week
function getDayOfWeek() {
  const days = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  return days[new Date().getDay()];
} 