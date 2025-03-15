'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchToken } from '@/firebase';

export default function AndroidInstructions() {
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'requested' | 'granted' | 'denied'>('idle');

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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/" className="text-white hover:underline mb-8 inline-block">
        &larr; Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">The Side Hustle Bar - Android Installation Guide</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Step 1: Add to Home Screen</h2>
        <p className="mb-4">To get the best experience from The Side Hustle Bar app, add it to your home screen:</p>
        
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>Open Chrome</strong> - This app works best in Chrome on Android.
          </li>
          <li>
            <strong>Tap the menu button</strong> - Look for the three dots in the top-right corner.
          </li>
          <li>
            <strong>Tap &quot;Add to Home screen&quot;</strong> - This option should appear in the menu.
          </li>
          <li>
            <strong>Tap &quot;Add&quot;</strong> - Confirm by tapping &quot;Add&quot; on the prompt that appears.
          </li>
        </ol>
        
        <div className="bg-black p-4 rounded-md mb-6">
          <p className="text-yellow-400 font-medium">Tip:</p>
          <p className="text-gray-300">On some Android devices, you might see an &quot;Install app&quot; banner at the bottom of the screen. You can tap this for a quicker installation.</p>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Step 2: Enable Notifications</h2>
        <p className="mb-4">Stay updated with The Side Hustle Bar&apos;s latest events and specials:</p>
        
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>Open the app</strong> - Either from your browser or from the home screen icon.
          </li>
          <li>
            <strong>Tap the button below</strong> - This will trigger the notification permission prompt.
          </li>
          <li>
            <strong>Tap &quot;Allow&quot;</strong> - When prompted, allow notifications to stay updated.
          </li>
        </ol>
        
        <div className="mt-6">
          {notificationStatus === 'idle' && (
            <button
              onClick={requestNotificationPermission}
              className="bg-yellow-400 text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-500 transition-colors"
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
              <p className="mt-2">You will now receive updates about events and specials at The Side Hustle Bar.</p>
            </div>
          )}
          
          {notificationStatus === 'denied' && (
            <div className="bg-red-900 p-4 rounded-md">
              <p className="font-medium">Notification permission denied.</p>
              <p className="mt-2">To enable notifications later, go to your browser settings, find this site in the permissions section, and allow notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 