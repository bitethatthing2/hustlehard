'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ServiceOption {
  name: string;
  fee: string;
  time: string;
  url: string;
  logo?: string;
}

interface DeliveryService extends ServiceOption {
  serviceFee: string;
}

const OrderOptions = () => {
  const [activeOption, setActiveOption] = useState<'delivery' | 'pickup'>('delivery');
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const installationInstructionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);
    
    // Detect Android
    const android = /Android/.test(navigator.userAgent);
    setIsAndroid(android);

    // Handle PWA install prompt for Android
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    });
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) {
      // Show instructions instead of using ref
      setShowInstructions(true);
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We no longer need the prompt
    setDeferredPrompt(null);
  };

  const handleIOSInstall = () => {
    // Show instructions instead of using ref
    setShowInstructions(true);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  const deliveryOptions: DeliveryService[] = [
    {
      name: 'Online Ordering by DoorDash',
      serviceFee: 'Service fee 15%',
      fee: 'Delivery fee $3.99',
      time: 'Delivers in 36 min',
      logo: '/only_these/logos/doordash_icon.png',
      url: 'https://order.online/store/side-hustle-bar-salem-25388462/?hideModal=true&pickup=true&rwg_token=AAiGsoaNRTLKZtOm6ldJCfYPJPa6scUukFhY65gUHZiwavX_cwm-el5irbniofQ7CT4XZiD-7cE0YKWV8mdLMEm6cBM-o-1iaA==&utm_source=gfo'
    },
    {
      name: 'DoorDash',
      serviceFee: 'Service fee 5%–15%',
      fee: 'Delivery fee may apply',
      time: 'Delivers in 34–39 min',
      logo: '/only_these/logos/doordash_icon.png',
      url: 'https://www.doordash.com/store/side-hustle-bar-salem-25388462/27964950/?pickup=true&rwg_token=AAiGsobUYuYYxPgiIqqnQ8P4ajnTH7h1F0IggFpZrafOmB3-LuNFMDQmzByD2_dM1fIzIYpO5jueP7pzWDADtrGvM_Qs2iZ-2g==&utm_campaign=gpa'
    },
    {
      name: 'Postmates',
      serviceFee: 'Fees may apply',
      fee: '',
      time: 'Delivers in 26–41 min',
      logo: '/only_these/logos/postmates.png',
      url: 'https://postmates.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas'
    },
    {
      name: 'UberEats',
      serviceFee: 'Fees may apply',
      fee: '',
      time: 'Delivers in 26–41 min',
      logo: '/only_these/logos/uber_eats.png',
      url: 'https://www.ubereats.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas'
    }
  ];

  const pickupOptions: ServiceOption[] = [
    {
      name: 'Online Ordering by DoorDash',
      fee: 'No fee',
      time: 'Ready in 17 min',
      logo: '/only_these/logos/doordash_icon.png',
      url: 'https://order.online/store/side-hustle-bar-salem-25388462/?hideModal=true&pickup=true&rwg_token=AAiGsoaNRTLKZtOm6ldJCfYPJPa6scUukFhY65gUHZiwavX_cwm-el5irbniofQ7CT4XZiD-7cE0YKWV8mdLMEm6cBM-o-1iaA==&utm_source=gfo'
    },
    {
      name: 'DoorDash',
      fee: 'No fee',
      time: 'Ready in 13–18 min',
      logo: '/only_these/logos/doordash_icon.png',
      url: 'https://www.doordash.com/store/side-hustle-bar-salem-25388462/27964950/?pickup=true&rwg_token=AAiGsobUYuYYxPgiIqqnQ8P4ajnTH7h1F0IggFpZrafOmB3-LuNFMDQmzByD2_dM1fIzIYpO5jueP7pzWDADtrGvM_Qs2iZ-2g==&utm_campaign=gpa'
    },
    {
      name: 'Postmates',
      fee: 'No fee',
      time: 'Ready in 6–21 min',
      logo: '/only_these/logos/postmates.png',
      url: 'https://postmates.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas'
    },
    {
      name: 'UberEats',
      fee: 'No fee',
      time: 'Ready in 6–21 min',
      logo: '/only_these/logos/uber_eats.png',
      url: 'https://www.ubereats.com/store/side-hustle-bar/n5ak1cjlRvuf0Hefn7Iddw?diningMode=PICKUP&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas'
    }
  ];

  const renderServiceCard = (option: ServiceOption | DeliveryService, index: number) => {
    const isDelivery = 'serviceFee' in option;
    
    return (
      <div key={index} className="border border-gray-800 rounded-xl p-5 bg-gradient-to-b from-black/60 to-black/30 hover:from-black/70 hover:to-black/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:border-gray-700 group">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-4">
            {option.logo && (
              <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full p-1.5 shadow-md">
                <Image 
                  src={option.logo} 
                  alt={option.name} 
                  width={40} 
                  height={40}
                  className="w-full h-full object-contain" 
                />
              </div>
            )}
            <h3 className="font-semibold text-white text-base">{option.name}</h3>
          </div>
          
          <div className="mt-1 space-y-2 text-sm flex-grow">
            {isDelivery && (
              <p className="text-gray-300">{(option as DeliveryService).serviceFee}</p>
            )}
            <p className="text-gray-300">{option.fee}</p>
            <p className="text-bar-accent font-medium">{option.time}</p>
          </div>
          
          <div className="mt-5">
            <Button
              asChild
              variant="default"
              className="w-full"
            >
              <Link 
                href={option.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Order Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-20">
      <div className="text-center mb-12">
        <p className="text-xl text-bar-accent font-semibold mb-8">
          Ready to order? Choose how you'd like to receive your delicious Side Hustle Bar experience:
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-12 max-w-2xl mx-auto">
        <Button
          onClick={() => setActiveOption('delivery')}
          variant={activeOption === 'delivery' ? 'default' : 'outline'}
          className="min-w-[180px] text-lg py-6 px-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/10">
              <Image 
                src="/delivery-icon.svg" 
                alt="Delivery" 
                width={24} 
                height={24}
                className="text-current" 
              />
            </div>
            <span className="font-semibold">Delivery</span>
          </div>
        </Button>
        
        <Button
          onClick={() => setActiveOption('pickup')}
          variant={activeOption === 'pickup' ? 'default' : 'outline'}
          className="min-w-[180px] text-lg py-6 px-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100/10">
              <Image 
                src="/pickup-icon.svg" 
                alt="Pickup" 
                width={24} 
                height={24}
                className="text-current" 
              />
            </div>
            <span className="font-semibold">Pickup</span>
          </div>
        </Button>
      </div>
      
      {/* Installation Instructions */}
      {showInstructions && (
        <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-6 rounded-lg mb-8 mx-auto max-w-md shadow-xl motion-safe:animate-fadeIn">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-white text-lg">Installation Guide</h3>
            <Button 
              onClick={closeInstructions}
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          
          {isIOS && (
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bar-accent/20 border border-bar-accent/30">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-7 h-7 fill-current text-bar-accent">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-lg">How to install on iOS:</h4>
              </div>
              <ol className="list-decimal pl-6 text-gray-300 space-y-4">
                <li className="pb-3 border-b border-gray-700">Tap the <span className="px-2 py-1 bg-gray-800 rounded text-white">Share</span> button at the bottom of the screen</li>
                <li className="pb-3 border-b border-gray-700">Scroll down and tap <span className="px-2 py-1 bg-gray-800 rounded text-white">Add to Home Screen</span></li>
                <li>Tap <span className="px-2 py-1 bg-gray-800 rounded text-white">Add</span> in the top right corner</li>
              </ol>
            </div>
          )}
          
          {isAndroid && (
            <div className="text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-bar-accent/20 border border-bar-accent/30">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-7 h-7 fill-current text-bar-accent">
                    <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-lg">How to install on Android:</h4>
              </div>
              <ol className="list-decimal pl-6 text-gray-300 space-y-4">
                <li className="pb-3 border-b border-gray-700">Tap the menu button (<span className="px-2 py-1 bg-gray-800 rounded text-white">⋮</span>) in the top right</li>
                <li className="pb-3 border-b border-gray-700">Tap <span className="px-2 py-1 bg-gray-800 rounded text-white">Add to Home screen</span></li>
                <li>Tap <span className="px-2 py-1 bg-gray-800 rounded text-white">Add</span> when prompted</li>
              </ol>
            </div>
          )}
        </div>
      )}
      
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          Choose your preferred {activeOption === 'delivery' ? 'delivery' : 'pickup'} service:
        </h3>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Select from our trusted partners below and have your favorite Side Hustle Bar items {activeOption === 'delivery' ? 'delivered right to your door' : 'ready for pickup at your convenience'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {activeOption === 'delivery' 
          ? deliveryOptions.map(renderServiceCard)
          : pickupOptions.map(renderServiceCard)
        }
      </div>
      
      {/* Installation Options */}
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center mt-10 mb-2">
        {isIOS && (
          <Button
            onClick={handleIOSInstall}
            variant="default"
            className="min-w-[180px] flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Install on iOS
          </Button>
        )}
        
        {isAndroid && (
          <Button
            onClick={handleAndroidInstall}
            variant="default"
            className="min-w-[180px] flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Install on Android
          </Button>
        )}
      </div>
      
      {/* Bottom installation guide section */}
      <div className="mt-20 pt-12 border-t border-gray-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-bar-accent via-amber-300 to-bar-accent">
            Unlock the full experience!
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Install our app and be the first to know about upcoming events, new menu items, exclusive artist spotlights, and even raffles and giveaways. Don't miss out - download now for instant updates!
          </p>

          {/* Bottom installation guide buttons - updated design */}
          <div className="flex flex-col md:flex-row gap-5 justify-center mx-auto">
            <Link 
              href="/instructions/ios"
              className="min-w-[240px] max-w-xs mx-auto bg-black border border-white/20 text-white hover:bg-white hover:text-black py-4 px-5 rounded-xl hover:border-white/70 shadow-md transition-all duration-300 flex items-center justify-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                </div>
                <span className="font-medium">iOS Installation Guide</span>
              </div>
            </Link>
            
            <Link 
              href="/instructions/android"
              className="min-w-[240px] max-w-xs mx-auto bg-black border border-white/20 text-white hover:bg-white hover:text-black py-4 px-5 rounded-xl hover:border-white/70 shadow-md transition-all duration-300 flex items-center justify-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 fill-current">
                    <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                  </svg>
                </div>
                <span className="font-medium">Android Installation Guide</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOptions; 