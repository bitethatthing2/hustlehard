import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LocationToggle from './location/LocationToggle';
import { useLocation } from '@/contexts/LocationContext';

// Declare the spline-viewer custom element type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url?: string;
        className?: string;
        loading?: 'lazy' | 'eager';
        'events-target'?: 'local' | 'global';
        'cross-origin'?: 'anonymous' | 'use-credentials';
        hint?: string;
        'loading-anim'?: string;
        background?: string;
        'auto-rotate'?: string;
        'camera-target'?: string;
        'camera-orbit'?: string;
        onLoad?: () => void;
        onError?: () => void;
      }
    }
  }
}

const HeroSection: React.FC = () => {
  const { selectedLocation } = useLocation();
  const [imgError, setImgError] = useState(false);
  const [imgErrorCount, setImgErrorCount] = useState(0);
  const [prizePool, setPrizePool] = useState(5000);
  const [timeLeft, setTimeLeft] = useState('');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCountdownHighlighted, setIsCountdownHighlighted] = useState(false);
  
  // Define possible paths to try in order
  const portlandPaths = [
    '/only_these/logos/SHB_Logo_WhiteonBlackBG.png',
    '/SHB_Logo_WhiteonBlackBG.png',
    '/logo.png'
  ];
  
  const salemPaths = [
    '/only_these/logos/salem_location.png',
    '/salem_location.png',
    '/logo.png'
  ];
  
  // Get the current path to try based on location and error count
  const getImagePath = () => {
    const paths = selectedLocation === 'portland' ? portlandPaths : salemPaths;
    return paths[Math.min(imgErrorCount, paths.length - 1)];
  };
  
  const logoImage = getImagePath();
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Error loading image: ${logoImage}, trying next path...`);
    setImgErrorCount(prev => prev + 1);
    
    // Force a re-render by toggling imgError
    setImgError(prev => !prev);
    
    // Prevent the default error icon
    e.currentTarget.onerror = null;
  };
  
  // Enhanced countdown timer with seconds
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const drawingDate = new Date();
    
    // Set to next Sunday at midnight
    drawingDate.setDate(drawingDate.getDate() + (7 - drawingDate.getDay()));
    drawingDate.setHours(24, 0, 0, 0);
    
    if (now > drawingDate) {
      drawingDate.setDate(drawingDate.getDate() + 7);
    }
    
    const difference = drawingDate.getTime() - now.getTime();
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    // Highlight countdown when less than 24 hours remain
    if (days === 0 && hours < 24 && !isCountdownHighlighted) {
      setIsCountdownHighlighted(true);
    }
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, [isCountdownHighlighted]);

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second instead of every minute

    setTimeLeft(calculateTimeLeft()); // Initial calculation

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Simulate prize pool updates more frequently
  useEffect(() => {
    const smallInterval = setInterval(() => {
      setPrizePool(prev => {
        const increase = Math.floor(Math.random() * 20) + 1; // 1-20 increase
        return prev + increase;
      });
    }, 5000); // Small updates every 5 seconds

    const largeInterval = setInterval(() => {
      setPrizePool(prev => {
        const increase = Math.floor(Math.random() * 100) + 50; // 50-150 increase
        return prev + increase;
      });
    }, 30000); // Larger updates every 30 seconds

    return () => {
      clearInterval(smallInterval);
      clearInterval(largeInterval);
    };
  }, []);

  const handleModelLoad = () => {
    setIsModelLoaded(true);
  };

  const handleModelError = () => {
    console.error('Error loading 3D model');
    setIsModelLoaded(false);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden bg-black border-b border-bar-accent/30 w-full -mt-16">
      {/* Background effects and animations */}
      <div className="absolute inset-0 bg-black z-10 overflow-hidden">
        {/* Animated light beams */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/5 w-[1px] h-full bg-bar-accent animate-pulse-subtle"></div>
          <div className="absolute top-0 left-2/5 w-[1px] h-full bg-bar-accent animate-pulse-subtle animation-delay-700"></div>
          <div className="absolute top-0 left-3/5 w-[1px] h-full bg-bar-accent animate-pulse-subtle animation-delay-1300"></div>
          <div className="absolute top-0 left-4/5 w-[1px] h-full bg-bar-accent animate-pulse-subtle animation-delay-1000"></div>
          
          {/* Diagonal accent lines */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <div className="absolute top-0 -left-[100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent transform rotate-[30deg] translate-y-[10vh]"></div>
            <div className="absolute bottom-0 -left-[100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent transform rotate-[-30deg] -translate-y-[10vh]"></div>
          </div>
        </div>
      </div>
      
      <div className="w-full relative z-20 text-center px-3 flex flex-col justify-center h-full pt-24 pb-8">
        <div className="flex-grow flex flex-col items-center justify-center">
          {/* Logo with glow effect */}
          <div className="relative mb-4">
            <div className="absolute inset-0 animate-pulse-slow opacity-70 blur-md flex items-center justify-center">
              <Image 
                src={logoImage} 
                alt="The Sidehustle Bar - Glow Effect" 
                width={450}
                height={250}
                className="w-auto h-auto max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto object-contain"
                priority={false}
                unoptimized
              />
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <Image 
                src={logoImage} 
                alt="The Sidehustle Bar" 
                width={450}
                height={250}
                className="w-auto h-auto max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto object-contain"
                onError={e => {
                  console.error(`Error loading image: ${logoImage}, trying next path...`);
                  setImgErrorCount(prev => prev + 1);
                  setImgError(prev => !prev);
                  e.currentTarget.onerror = null;
                }}
                priority
                unoptimized
              />
            </div>
          </div>
          
          <div className="mt-3 mb-6 w-full flex justify-center">
            <LocationToggle />
          </div>
          
          {/* Main hero information card */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-lg md:text-xl lg:text-2xl text-white font-medium mb-8 md:mb-10 mx-auto rounded-lg backdrop-blur-lg p-5 border border-white/10 bg-black/70 holographic-border shadow-lg">
              <p className="mb-3">High-Energy Sports Bar • Restaurant • Nightclub</p>
              <p className="text-bar-accent font-semibold mb-1">Featuring Executive Chef Rebecca Sanchez</p>
              <p className="text-sm md:text-base italic mb-6">#1 Rated Mexican Food & Best Tacos in Town</p>
              
              {/* Menu button hint */}
              <div className="flex items-center justify-center mt-6 text-base md:text-lg bg-bar-accent/10 rounded-lg p-3 border border-bar-accent/20">
                <Image 
                  src="/only_these/logos/menu_icon.png"
                  alt="Menu"
                  width={32}
                  height={32}
                  className="mr-2 animate-pulse-subtle w-8 h-8"
                />
                <span>Access all features via the menu button</span>
              </div>
            </div>

            {/* VIP Merch Section */}
            <div className="w-full max-w-3xl mx-auto mt-6 px-4">
              <div className="relative p-5 bg-black/80 rounded-lg overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-bar-accent/20 via-transparent to-bar-accent/20 animate-gradient-x"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
                
                <div className="relative flex flex-col items-center">
                  {/* Header section */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-bar-accent tracking-wider relative inline-block">
                      <span className="absolute -inset-1 bg-bar-accent/20 blur-sm rounded-lg"></span>
                      <span className="relative">SIDE HUSTLE DROPPDX</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-6">
                    {/* 3D Viewer */}
                    <div className="relative group">
                      <div className="aspect-square relative bg-gradient-to-br from-black/80 to-bar-accent/5 rounded-lg overflow-hidden backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02]">
                        {!isModelLoaded && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-bar-accent border-t-transparent"></div>
                            <p className="text-white/70 text-sm">Loading Preview...</p>
                          </div>
                        )}
                        <spline-viewer 
                          url="https://prod.spline.design/Mh91AUmppB4ru-9h/scene.splinecode"
                          className="w-full h-full"
                          onLoad={handleModelLoad}
                          onError={handleModelError}
                          loading="lazy"
                          events-target="global"
                          cross-origin="anonymous"
                        />
                        {showTooltip && (
                          <div className="absolute top-2 right-2 bg-black/95 text-white px-3 py-1 rounded text-sm backdrop-blur-sm border border-bar-accent/20">
                            <p className="flex items-center gap-2">
                              <span className="text-bar-accent">👆</span>
                              Rotate to preview
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-white mb-2 flex justify-between items-baseline">
                            <span>SIDE HUSTLE DROPPDX</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold text-white">$79.99</span>
                              <span className="text-bar-accent/60 text-xs">USD</span>
                            </div>
                          </h4>
                          <p className="text-white/70 text-sm">Hand-numbered with Certificate of Authenticity</p>
                        </div>
                        
                        {/* Features List */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 bg-gradient-to-r from-black/60 to-bar-accent/5 p-2 rounded-lg border border-bar-accent/20 hover:bg-black/60 transition-colors duration-300">
                            <span className="text-bar-accent bg-black/40 p-1 rounded-md">✨</span>
                            <p className="text-sm text-white/90 font-medium">Lone Wolf Series</p>
                          </div>
                          <div className="flex items-center gap-3 bg-gradient-to-r from-black/60 to-bar-accent/5 p-2 rounded-lg border border-bar-accent/20 hover:bg-black/60 transition-colors duration-300">
                            <span className="text-bar-accent bg-black/40 p-1 rounded-md">🎨</span>
                            <p className="text-sm text-white/90 font-medium">Exclusive DROPPDX design</p>
                          </div>
                        </div>

                        {/* Prize Entry Information */}
                        <div className="mt-4 bg-gradient-to-r from-bar-accent/20 via-bar-accent/10 to-transparent p-3 rounded-lg border border-bar-accent/30 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-bar-accent text-sm font-bold">HUSTLE GIVEAWAYS</span>
                            <span className="text-white/80 text-xs px-2 py-0.5 rounded-full border border-bar-accent/30 bg-bar-accent/10">AUTO ENTRY</span>
                          </div>
                          <p className="text-white/70 text-xs mb-2">Each purchase enters you a chance to win:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🎭</span>
                              <div>
                                <p className="text-white text-xs font-medium">Artist Meet & Greets</p>
                                <p className="text-white/60 text-[10px]">VIP backstage access</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🍽️</span>
                              <div>
                                <p className="text-white text-xs font-medium">VIP Dining</p>
                                <p className="text-white/60 text-[10px]">Premium dining experience</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🎟️</span>
                              <div>
                                <p className="text-white text-xs font-medium">Event Access</p>
                                <p className="text-white/60 text-[10px]">Exclusive VIP seating</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🎧</span>
                              <div>
                                <p className="text-white text-xs font-medium">Nightclub Experience</p>
                                <p className="text-white/60 text-[10px]">VIP nightclub access</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🥊</span>
                              <div>
                                <p className="text-white text-xs font-medium">UFC Fight Nights</p>
                                <p className="text-white/60 text-[10px]">Premium boxing viewing</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-bar-accent bg-black/30 p-1 rounded-md">🌟</span>
                              <div>
                                <p className="text-white text-xs font-medium">Big Events</p>
                                <p className="text-white/60 text-[10px]">Priority tickets</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="mt-6">
                        <Link 
                          href="/shop"
                          className="group w-full bg-gradient-to-r from-bar-accent to-bar-accent/90 text-black px-6 py-3 rounded-lg font-bold text-base hover:from-bar-accent/90 hover:to-bar-accent transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <span>Shop Now</span>
                          <svg 
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-bar-accent/70 to-transparent"></div>
    </section>
  );
};

export default HeroSection; 