'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    address: "123 Main St, Portland, OR 97201",
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
    }
  },
  salem: {
    name: "The Side Hustle Bar - Salem",
    description: "Our newest location in the heart of Salem. Experience our award-winning Mexican cuisine and signature cocktails in a stylish setting.",
    address: "456 State St, Salem, OR 97301",
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
    }
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