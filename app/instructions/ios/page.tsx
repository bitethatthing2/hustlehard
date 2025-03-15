'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchToken } from '@/firebase';

export default function IOSInstructions() {
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
      
      <h1 className="text-3xl font-bold mb-6">iOS Installation Guide</h1>
      
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Step 1: Add to Home Screen</h2>
        <p className="mb-4">To get the best experience, add this app to your home screen:</p>
        
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>Open Safari</strong> - This app must be opened in Safari to add it to your home screen.
          </li>
          <li>
            <strong>Tap the Share button</strong> - Look for the share icon (square with an arrow pointing up) at the bottom of the screen.
          </li>
          <li>
            <strong>Scroll down and tap &quot;Add to Home Screen&quot;</strong> - You might need to scroll down to find this option.
          </li>
          <li>
            <strong>Tap &quot;Add&quot;</strong> - You can rename the app if you want, then tap &quot;Add&quot; in the top-right corner.
          </li>
        </ol>
        
        <div className="bg-black p-4 rounded-md mb-6">
          <p className="text-yellow-400 font-medium">Important:</p>
          <p className="text-gray-300">iOS requires you to open the app from your home screen icon to enable full functionality, including background notifications.</p>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Step 2: Enable Notifications</h2>
        <p className="mb-4">iOS requires a user action to enable notifications. Follow these steps:</p>
        
        <ol className="list-decimal pl-6 space-y-4 mb-6">
          <li>
            <strong>Open the app from your home screen</strong> - Make sure you&apos;re using the app from your home screen, not from Safari.
          </li>
          <li>
            <strong>Tap the button below</strong> - This will trigger the iOS notification permission prompt.
          </li>
          <li>
            <strong>Tap &quot;Allow&quot;</strong> - When iOS asks if you want to allow notifications, tap &quot;Allow&quot; to receive updates.
          </li>
        </ol>
        
        <div className="mt-6">
          {notificationStatus === 'idle' && (
            <button
              onClick={requestNotificationPermission}
              className="bg-white text-black font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors"
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
              <p className="mt-2">You will now receive updates about new opportunities.</p>
            </div>
          )}
          
          {notificationStatus === 'denied' && (
            <div className="bg-red-900 p-4 rounded-md">
              <p className="font-medium">Notification permission denied.</p>
              <p className="mt-2">To enable notifications, go to Settings &gt; Safari &gt; Advanced &gt; Website Data, find this website, and allow notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 