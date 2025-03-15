"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchToken } from '@/firebase';
import NavMenu from '@/components/NavMenu';

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The Side Hustle Bar
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <NavMenu />
        </div>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold text-center">Welcome to The Side Hustle Bar</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Unlock your potential, reach your goals and live your best life
          </h2>
          
          {deviceType !== 'unknown' && (
            <div className="mb-4 p-4 bg-gray-900 rounded-lg">
              <p className="mb-2">We&apos;ve detected you&apos;re using an <strong>{deviceType === 'ios' ? 'iOS' : 'Android'}</strong> device.</p>
              <Link 
                href={deviceType === 'ios' ? '/instructions/ios' : '/instructions/android'} 
                className="text-white bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md inline-block mt-2 text-black font-semibold"
              >
                Install our app
              </Link>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-3">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/food-and-drink-menu" className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors text-center">
                See our Menu
              </Link>
              <Link href="sms:503-437-2803" className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors text-center">
                Book Catering Services
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-3">Stay Updated</h3>
            
            {notificationStatus === 'idle' && (
              <button
                onClick={requestNotificationPermission}
                className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
              >
                Enable Notifications
              </button>
            )}
            
            {notificationStatus === 'requested' && (
              <div className="bg-blue-900 p-4 rounded-md">
                <p>Please respond to the notification permission prompt.</p>
              </div>
            )}
            
            {notificationStatus === 'granted' && (
              <div className="bg-green-900 p-4 rounded-md">
                <p className="font-medium">Notifications enabled successfully!</p>
                <p className="mt-2">You will now receive updates about events and specials.</p>
              </div>
            )}
            
            {notificationStatus === 'denied' && (
              <div className="bg-red-900 p-4 rounded-md">
                <p className="font-medium">Notification permission denied.</p>
                <p className="mt-2">To enable notifications, please check your browser settings.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-3">Why Install Our App?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Get instant notifications about events and specials</li>
              <li>View our menu even when offline</li>
              <li>Easy access to booking our catering services</li>
              <li>Exclusive app-only promotions</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}