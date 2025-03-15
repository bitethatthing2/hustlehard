"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [deviceType, setDeviceType] = useState<'unknown' | 'ios' | 'android'>('unknown');
  
  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setDeviceType('ios');
    } else if (/android/.test(userAgent)) {
      setDeviceType('android');
    }
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to The Side Hustle Bar</h1>
        <p className="text-xl mb-8">Get notified about the latest side hustle opportunities</p>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-center">Get the Best Experience</h2>
          <p className="mb-4">
            This is a Progressive Web App (PWA) that works best when installed on your device and with notifications enabled.
          </p>
          
          {deviceType !== 'unknown' && (
            <div className="bg-black p-4 rounded-md mb-6">
              <p className="text-yellow-400 font-medium">We detected you're using {deviceType === 'ios' ? 'an iOS' : 'an Android'} device!</p>
              <p className="text-gray-300 mb-4">
                Follow our {deviceType}-specific instructions for the best experience.
              </p>
              <Link 
                href={`/instructions/${deviceType}`}
                className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                View {deviceType === 'ios' ? 'iOS' : 'Android'} Instructions
              </Link>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">iOS Users</h3>
              <p className="mb-4">Learn how to add this app to your home screen and enable notifications on your iPhone or iPad.</p>
              <Link 
                href="/instructions/ios"
                className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                iOS Instructions
              </Link>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Android Users</h3>
              <p className="mb-4">Learn how to install this app on your Android device and enable notifications.</p>
              <Link 
                href="/instructions/android"
                className="inline-block bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Android Instructions
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Install Our App?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Instant Notifications</h3>
            <p>Get alerted immediately when new side hustle opportunities become available.</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Works Offline</h3>
            <p>Access previously loaded content even when you don't have an internet connection.</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">App-Like Experience</h3>
            <p>Enjoy a smooth, fast experience that feels like a native app on your device.</p>
          </div>
        </div>
      </section>
    </main>
  );
}