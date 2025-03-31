import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';
import { fetchToken } from '@/firebase';
import VideoCarousel from '../shared/VideoCarousel';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from 'next-themes';

const HeroSection: React.FC = () => {
  const { selectedLocation } = useLocation();
  const [imgError, setImgError] = useState(false);
  const [imgErrorCount, setImgErrorCount] = useState(0);
  const [deviceType, setDeviceType] = useState<'unknown' | 'ios' | 'android'>('unknown');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requested' | 'granted' | 'denied'>('idle');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const { theme } = useTheme();

  // Define the image paths for light and dark mode
  const portlandLogoPath = '/only_these/logos/SHB_Logo_WhiteonBlackBG.png';
  const salemLogoPath = '/salem_location.png';
  
  // Get the current logo based on theme
  const logoImage = theme === 'dark' ? portlandLogoPath : salemLogoPath;
  
  // Google Maps embed URLs for Portland and Salem locations
  const portlandMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359640.0992522873!2d-123.1637501704348!3d45.233873097998526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1743394983254!5m2!1sen!2sus";
  const salemMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.155837503885!2d-123.04139512405341!3d44.94049986822883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1743394931645!5m2!1sen!2sus";
  
  // Get the current map URL based on theme
  const currentMapUrl = theme === 'dark' ? portlandMapUrl : salemMapUrl;
  
  // Handle theme change to refresh the image
  const handleThemeChange = (newTheme: string) => {
    console.log('Theme changed to:', newTheme);
  };

  // Detect device type and PWA installability on mount
  useEffect(() => {
    // Device type detection
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    console.log('User Agent:', ua);
    
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      console.log('Setting device type to iOS');
      setDeviceType('ios');
    } else if (/android/i.test(ua)) {
      console.log('Setting device type to Android');
      setDeviceType('android');
    } else {
      // If not iOS and not Android, show Android install option
      console.log('Setting device type to Android (default)');
      setDeviceType('android');
    }

    // PWA installation prompt detection
    const handleBeforeInstallPrompt = (e: any) => {
      console.log('Received beforeinstallprompt event');
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Handle PWA installation
  const handleInstallClick = async () => {
    if (deviceType === 'ios') {
      // Show iOS installation instructions with more detail
      alert('To install on iOS:\n\n1. Tap the Share button (📤) at the bottom of the screen\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right corner');
      return;
    }

    if (!deferredPrompt) {
      console.log('No installation prompt available');
      // If on Android but no prompt, might be because it's already installed or not eligible
      if (deviceType === 'android') {
        alert('If you don\'t see the install prompt, this app might already be installed or your browser might not support installation.');
      }
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user's choice
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } catch (error) {
      console.error('Error during PWA installation:', error);
      alert('There was an error installing the app. Please try again.');
    }
  };

  // Handle notification permission request
  const handleNotificationRequest = async () => {
    setNotificationStatus('requested');
    try {
      const token = await fetchToken();
      if (token) {
        setNotificationStatus('granted');
      } else {
        setNotificationStatus('denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setNotificationStatus('denied');
    }
  };

  // Common button styling
  const iconClasses = "w-7 h-7 object-contain";
  const textClasses = "text-base font-medium";

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="relative z-10 min-h-screen">
        <section className="relative min-h-[85vh] flex flex-col bg-black border-b border-gray-800 w-full -mt-16">
          <div className="w-full max-w-full relative z-20 text-center px-3 flex flex-col justify-center h-full pt-24 pb-8">
            <div className="flex-grow flex flex-col items-center justify-center">
              {/* Logo */}
              <div className="relative mb-4 pt-6">
                <div className="relative z-10 flex items-center justify-center">
                  <Image 
                    src={logoImage} 
                    alt="The Sidehustle Bar" 
                    width={450}
                    height={250}
                    className="w-auto h-auto max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto object-contain"
                    onError={e => {
                      console.error(`Error loading image: ${logoImage}`);
                      e.currentTarget.onerror = null;
                    }}
                    priority
                    unoptimized
                  />
                </div>
              </div>

              {/* Remove Welcome To Pack Image Section */}
              <div className="mt-3 mb-6 w-full flex justify-center">
                <ThemeToggle onToggle={handleThemeChange} />
              </div>

              {/* Order Options Section - Moved directly under location toggle */}
              <div className="w-full max-w-md mx-auto mb-8">
                <div className="text-center mb-2">
                  <p className="text-lg text-white font-medium">
                    Ready to order? Choose an option:
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 px-4">
                  <Link href="/order?option=delivery" className="flex-1">
                    <Button
                      variant="default"
                      className="text-md py-5 px-6 w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/50">
                          <Image 
                            src="/only_these/icons/delivery-icon-white.svg" 
                            alt="Delivery" 
                            width={20} 
                            height={20}
                            className="text-white" 
                          />
                        </div>
                        <span className="text-lg font-semibold">Delivery</span>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link href="/order?option=pickup" className="flex-1">
                    <Button
                      variant="outline"
                      className="text-md py-5 px-6 w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/50">
                          <Image 
                            src="/only_these/icons/pickup-icon-white.svg" 
                            alt="Pickup" 
                            width={20} 
                            height={20}
                            className="text-white" 
                          />
                        </div>
                        <span className="text-lg font-semibold">Pickup</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Main hero information card */}
              <div className="w-full max-w-2xl mx-auto">
                <div className="text-lg md:text-xl lg:text-2xl text-white font-medium mb-8 md:mb-10 mx-auto rounded-lg p-5 border border-gray-700 bg-black">
                  <p className="mb-3">High-Energy Sports Bar • Restaurant • Nightclub</p>
                  <p className="font-semibold mb-1">Featuring Executive Chef Rebecca Sanchez</p>
                  <p className="text-sm md:text-base italic">#1 Rated Mexican Food & Best Tacos in Town</p>
                  
                  {/* Install buttons container */}
                  <div className="flex flex-col items-center gap-6 mt-6">
                    {/* Menu Feature Highlight */}
                    <div className="w-full max-w-md p-4 rounded-lg bg-black border border-gray-700 relative">
                      <div className="relative z-10 flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-full border border-gray-600 flex items-center justify-center">
                          <Image
                            src="/menu_icon.png"
                            alt="Home Menu Button"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <p className="text-base font-medium">Check Out Our Main Menu</p>
                      </div>
                      <p className="text-sm text-white relative z-10 p-3 rounded-lg border border-gray-700">
                        Click the home menu button to experience all the app features, settings, and navigation options in one convenient place.
                      </p>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4">
                      {deviceType === 'ios' ? (
                        <Button
                          onClick={handleInstallClick}
                          className="w-full min-w-[180px] flex items-center gap-2 bg-transparent border border-white"
                        >
                          <Image
                            src="/only_these/ios_pwa_install.png"
                            alt="Install on iOS"
                            width={24}
                            height={24}
                            className={iconClasses}
                          />
                          <span className={textClasses}>Add to Home Screen</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleInstallClick}
                            className="w-full min-w-[180px] flex items-center gap-2 bg-transparent border border-white"
                          >
                            <Image
                              src="/only_these/android_pwa_install.png"
                              alt="Install on Android"
                              width={24}
                              height={24}
                              className={iconClasses}
                            />
                            <span className={textClasses}>Install App</span>
                          </Button>
                          
                          {notificationStatus === 'idle' && (
                            <Button
                              onClick={handleNotificationRequest}
                              className="w-full min-w-[180px] flex items-center gap-2 bg-transparent border border-white"
                            >
                              <Image
                                src="/only_these/logos/icon_enable_notifications.png"
                                alt="Enable Notifications"
                                width={28}
                                height={28}
                                className={iconClasses}
                              />
                              <span className={textClasses}>Enable Notifications</span>
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed Section - Changes based on theme toggle */}
              <div className="w-full max-w-4xl mx-auto mt-6 mb-8 px-3 sm:px-4">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Image 
                      src="/hustle_pdx_for maps.png"
                      alt="Side Hustle Map Icon"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
                    <h3 className="text-2xl font-bold text-white text-center">
                      {theme === 'dark' ? 'SIDEHUSTLE PDX' : 'SIDEHUSTLE SALEM'}
                    </h3>
                  </div>
                  
                  <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    <div className="aspect-video w-full">
                      <iframe
                        src={currentMapUrl}
                        title={`${theme === 'dark' ? 'Portland' : 'Salem'} Location Map`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mt-4 text-center max-w-2xl">
                    {theme === 'dark' 
                      ? 'THE WOLF IS IN DOWNTOWN PDX' 
                      : 'THE WOLF IS IN DOWNTOWN SALEM'}
                  </p>
                </div>
              </div>

              {/* Video Carousel Section */}
              <div className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8 px-3 sm:px-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    <Image 
                      src="/only_these/logos/welcome_to_pack.png" 
                      alt="Wolf Icon" 
                      width={40} 
                      height={40} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" 
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Lone Wolf Collection</h2>
                    <Image 
                      src="/only_these/logos/welcome_to_pack.png" 
                      alt="Wolf Icon" 
                      width={40} 
                      height={40} 
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" 
                    />
                  </div>
                  <div className="mt-2 sm:mt-0 text-center sm:text-left">
                    <span className="text-xs sm:text-sm text-gray-300 px-3 py-1 bg-white/10 rounded-full">Exclusive designs</span>
                  </div>
                </div>
                <VideoCarousel />
                
                {/* Shop Now Button */}
                <div className="w-full flex justify-center mb-4 sm:mb-0 mt-6">
                  <div className="w-full max-w-md p-4 rounded-lg bg-black border border-gray-700 relative">
                    {/* Button with Shadcn UI styling */}
                    <div className="relative z-10">
                      <Button
                        asChild
                        size="lg"
                        className="w-full py-6 text-lg font-bold flex items-center justify-center gap-4"
                      >
                        <Link href="/shop">
                          <Image
                            src="/menu_icon.png"
                            alt="Shop"
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
                          />
                          <span>SHOP NOW</span>
                          <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                          </svg>
                        </Link>
                      </Button>
                      <div className="mt-3 text-center">
                        <p className="text-sm sm:text-base text-white font-medium">
                          Explore our exclusive merchandise collection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection; 