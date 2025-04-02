"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocation } from '@/contexts/LocationContext';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function DynamicFooter() {
  const { selectedLocation, locationData } = useLocation();
  const currentLocation = locationData[selectedLocation];
  
  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 relative h-16 w-40">
              <Image 
                src="/only_these/logos/SHB_Logo_WhiteonBlackBG.png"
                alt="Side Hustle Bar Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left mb-4">
              {selectedLocation === 'portland' 
                ? "Portland's premier sports bar and restaurant serving amazing food and drinks in the heart of downtown."
                : "Salem's top destination for food, drinks, and entertainment in a stylish and vibrant setting."}
            </p>
          </div>
          
          {/* Location Details Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4 text-lg">Location</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-bar-accent h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{currentLocation.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-bar-accent h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{currentLocation.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-bar-accent h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{currentLocation.email}</span>
              </li>
            </ul>
          </div>
          
          {/* Hours Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4 text-lg">Hours</h3>
            <ul className="space-y-1">
              {Object.entries(currentLocation.hours).map(([day, hours]) => (
                <li key={day} className="flex items-start justify-between">
                  <span className="text-gray-400 text-sm">{day}</span>
                  <span className="text-gray-300 text-sm">{hours}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links Section */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-gray-300 hover:text-bar-accent text-sm transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-300 hover:text-bar-accent text-sm transition-colors">
                  Order Online
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-bar-accent text-sm transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-300 hover:text-bar-accent text-sm transition-colors">
                  Locations
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-full border-gray-700">
                    <a href="https://instagram.com/sidehustlebar" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-4 w-4 text-white" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-full border-gray-700">
                    <a href="https://facebook.com/sidehustlebar" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-4 w-4 text-white" />
                    </a>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Side Hustle Bar. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-xs">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-xs">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 