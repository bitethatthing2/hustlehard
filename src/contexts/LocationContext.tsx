'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type LocationType = 'portland' | 'salem';

interface LocationData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  serviceOptions: string[];
  hours: {
    [key: string]: string;
  };
  embedUrl: string;
}

interface LocationContextType {
  selectedLocation: LocationType;
  setSelectedLocation: (location: LocationType) => void;
  showLocationModal: boolean;
  setShowLocationModal: (show: boolean) => void;
  locationData: {
    [key in LocationType]: LocationData;
  };
}

const defaultLocationData = {
  portland: {
    name: "The Side Hustle Bar - Portland",
    description: "Our original location in downtown Portland. Come enjoy our famous tacos, craft cocktails, and vibrant nightlife atmosphere.",
    address: "327 SW Morrison St, Portland, OR 97204",
    phone: "(503) 555-1234",
    email: "contact@thesidehustleportland.com",
    serviceOptions: ["Dine-in", "Takeout", "Full Bar", "Late Night", "Weekend Brunch"],
    hours: {
      Monday: "11 AM - 1 AM",
      Tuesday: "11 AM - 1 AM",
      Wednesday: "11 AM - 1 AM",
      Thursday: "11 AM - 1 AM",
      Friday: "11 AM - 2 AM",
      Saturday: "11 AM - 2 AM",
      Sunday: "11 AM - 12 AM"
    },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.930311185878!2d-122.6788063!3d45.5196783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a0688b1627d%3A0xb04e56408f27d08e!2s327%20SW%20Morrison%20St%2C%20Portland%2C%20OR%2097204!5e0!3m2!1sen!2sus!4v1678886400001!5m2!1sen!2sus"
  },
  salem: {
    name: "The Side Hustle Bar - Salem",
    description: "Our newest location in the heart of Salem. Experience our award-winning Mexican cuisine and signature cocktails in a stylish setting.",
    address: "145 Liberty St NE Suite #101, Salem, OR 97301",
    phone: "(503) 555-5678",
    email: "contact@thesidehustlesalem.com",
    serviceOptions: ["Dine-in", "Takeout", "Full Bar", "Live Music", "Patio Seating"],
    hours: {
      Monday: "11 AM - 1 AM",
      Tuesday: "11 AM - 1 AM",
      Wednesday: "11 AM - 1 AM",
      Thursday: "11 AM - 1 AM",
      Friday: "11 AM - 2 AM",
      Saturday: "11 AM - 2 AM",
      Sunday: "11 AM - 12 AM"
    },
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.9999999999995!2d-123.035!3d44.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a1c50000001%3A0x123456789abcdef0!2s145%20Liberty%20St%20NE%20%23101%2C%20Salem%2C%20OR%2097301!5e0!3m2!1sen!2sus!4v1678886500001!5m2!1sen!2sus"
  }
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('portland');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationData] = useState(defaultLocationData);

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      showLocationModal,
      setShowLocationModal,
      locationData
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export type { LocationType, LocationData };
export { LocationContext }; 
