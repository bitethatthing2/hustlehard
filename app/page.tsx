/** @jsxImportSource react */
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchToken } from '@/firebase';
import Image from 'next/image';

export default function Home(): React.ReactElement {
  const [deviceType, setDeviceType] = useState<'unknown' | 'ios' | 'android'>('unknown');
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requested' | 'granted' | 'denied'>('idle');
  const [currentLogo, setCurrentLogo] = useState<'default' | 'salem'>('default');

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
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-black">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl mx-auto space-y-8">
        {/* Logo Display */}
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <Image
            src={currentLogo === 'default' ? '/wolf_logo.png' : '/wolf_logo_salem.png'}
            alt="Wolf Logo"
            width={384}
            height={384}
            priority
            className="object-contain"
          />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCurrentLogo((current: 'default' | 'salem') => current === 'default' ? 'salem' : 'default')}
          className="px-6 py-3 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-colors"
        >
          Toggle Logo
        </button>

        {/* Installation Instructions */}
        {deviceType !== 'unknown' && (
          <div className="w-full max-w-md p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-white mb-2 text-center">
              Install our app on your {deviceType === 'ios' ? 'iOS' : 'Android'} device
            </p>
            <Link 
              href={deviceType === 'ios' ? '/instructions/ios' : '/instructions/android'} 
              className="w-full text-black bg-white hover:bg-gray-200 px-4 py-2 rounded-md inline-block text-center font-semibold"
            >
              Installation Instructions
            </Link>
          </div>
        )}

        {/* Notification Status Section - Preserved Functionality */}
        <div className="w-full max-w-md">
          {notificationStatus === 'idle' && (
            <button
              onClick={requestNotificationPermission}
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Enable Notifications
            </button>
          )}
          
          {notificationStatus === 'requested' && (
            <div className="bg-blue-900/50 p-4 rounded-md backdrop-blur-sm">
              <p className="text-white text-center">Please respond to the notification permission prompt.</p>
            </div>
          )}
          
          {notificationStatus === 'granted' && (
            <div className="bg-green-900/50 p-4 rounded-md backdrop-blur-sm">
              <p className="text-white text-center font-medium">Notifications enabled successfully!</p>
            </div>
          )}
          
          {notificationStatus === 'denied' && (
            <div className="bg-red-900/50 p-4 rounded-md backdrop-blur-sm">
              <p className="text-white text-center font-medium">Notification permission denied.</p>
              <p className="text-white text-center mt-2">To enable notifications, please check your browser settings.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}