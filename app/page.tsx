/** @jsxImportSource react */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchToken } from '@/firebase';
import Image from 'next/image';

export default function Home(): React.ReactElement {
  const [deviceType, setDeviceType] = useState<'unknown' | 'ios' | 'android'>('unknown');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requested' | 'granted' | 'denied'>('idle');

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setDeviceType('ios');
    } else if (/android/i.test(userAgent)) {
      setDeviceType('android');
    }
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-b from-black to-gray-900">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl mx-auto space-y-8">
        {/* Logo Display */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 animate-pulse-slow">
          <Image
            src="/wolf_logo.png"
            alt="Side Hustle Bar Logo"
            width={384}
            height={384}
            priority
            className="object-contain filter drop-shadow-glow"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 animate-fade-in">
          The Side Hustle Bar
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 text-center mb-8 animate-fade-in-delay">
          Your go-to spot for side hustle opportunities
        </p>

        {/* Installation Instructions */}
        {deviceType !== 'unknown' && (
          <div className="w-full max-w-md p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 shadow-xl animate-slide-up">
            <p className="text-white mb-4 text-center text-lg">
              Install our app on your {deviceType === 'ios' ? 'iOS' : 'Android'} device
            </p>
            <Link 
              href={deviceType === 'ios' ? '/instructions/ios' : '/instructions/android'} 
              className="w-full bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg inline-block text-center font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Installation Guide
            </Link>
          </div>
        )}

        {/* Notification Status Section */}
        <div className="w-full max-w-md animate-fade-in-delay-2">
          {notificationStatus === 'idle' && (
            <button
              onClick={requestNotificationPermission}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Enable Notifications
            </button>
          )}
          
          {notificationStatus === 'requested' && (
            <div className="bg-blue-900/30 p-6 rounded-lg backdrop-blur-sm border border-blue-500/30 shadow-lg">
              <p className="text-white text-center text-lg">Please respond to the notification permission prompt</p>
            </div>
          )}
          
          {notificationStatus === 'granted' && (
            <div className="bg-green-900/30 p-6 rounded-lg backdrop-blur-sm border border-green-500/30 shadow-lg">
              <p className="text-white text-center text-lg font-medium">Notifications enabled successfully!</p>
            </div>
          )}
          
          {notificationStatus === 'denied' && (
            <div className="bg-red-900/30 p-6 rounded-lg backdrop-blur-sm border border-red-500/30 shadow-lg">
              <p className="text-white text-center text-lg font-medium">Notification permission denied</p>
              <p className="text-gray-300 text-center mt-2">To enable notifications, please check your browser settings</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}