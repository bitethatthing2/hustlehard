/** @jsxImportSource react */
"use client";

import { useEffect, useState } from 'react';
import { fetchToken } from '@/firebase';
import { LocationProvider } from '@/contexts/LocationContext';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

// Import components dynamically to avoid hydration issues
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), {
  ssr: false,
  loading: () => <div className="min-h-[80vh] flex items-center justify-center bg-black">Loading...</div>
});

const InstagramFeedSection = dynamic(() => import('@/components/social/InstagramFeedSection'), {
  ssr: false,
  loading: () => <div className="py-12 flex items-center justify-center bg-black">Loading Instagram feed...</div>
});

// Use the new ReviewsSection component instead of GoogleReviewsSection
const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection'), {
  ssr: false,
  loading: () => <div className="py-12 flex items-center justify-center bg-black">Loading reviews...</div>
});

export default function Home(): React.ReactElement {
  const [deviceType, setDeviceType] = useState<'unknown' | 'ios' | 'android'>('unknown');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requested' | 'granted' | 'denied'>('idle');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setDeviceType('ios');
    } else if (/android/i.test(userAgent)) {
      setDeviceType('android');
    }

    // Handle PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Reset installable state when PWA is installed
    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    });
  }, []);

  const requestNotificationPermission = async () => {
    setNotificationStatus('requested');
    
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        setNotificationStatus('granted');
        // Get FCM token
        try {
          await fetchToken();
        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      } else {
        setNotificationStatus('denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setNotificationStatus('denied');
    }
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  };

  return (
    <LocationProvider>
      <div className="flex flex-col items-center justify-between w-full bg-black">
        {/* Hero Section with App Installation */}
        <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center bg-black">Loading...</div>}>
          <HeroSection />
        </Suspense>
        
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Instagram Feed Section */}
          <Suspense fallback={<div className="py-12 flex items-center justify-center bg-black">Loading Instagram feed...</div>}>
            <InstagramFeedSection />
          </Suspense>
          
          {/* Reviews Section */}
          <Suspense fallback={<div className="py-12 flex items-center justify-center bg-black">Loading reviews...</div>}>
            <ReviewsSection />
          </Suspense>
        </div>
      </div>
    </LocationProvider>
  );
}