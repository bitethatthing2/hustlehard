/// <reference types="react" />
'use client';

import React from 'react';
import Link from 'next/link';

export default function IOSInstructionsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/"
            className="text-bar-accent hover:text-bar-accent/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-bar-accent">iOS Installation Guide</h1>
        </div>

        {/* Instructions Card */}
        <div className="bg-black/80 rounded-lg overflow-hidden border border-bar-accent/20 p-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-bar-accent mb-3">Step 1: Add to Home Screen</h2>
              <div className="space-y-2 text-white/90">
                <p>1. Open Safari and visit our website</p>
                <p>2. Tap the Share button at the bottom of the screen</p>
                <p>3. Scroll down and tap "Add to Home Screen"</p>
                <p>4. Tap "Add" in the top right corner</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-bar-accent mb-3">Step 2: Enable Notifications</h2>
              <div className="space-y-2 text-white/90">
                <p>1. When prompted, tap "Allow" for notifications</p>
                <p>2. Open your device Settings</p>
                <p>3. Go to Notifications {`>`} Side Hustle Bar</p>
                <p>4. Enable all notification options</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-bar-accent mb-3">Step 3: Verify Installation</h2>
              <div className="space-y-2 text-white/90">
                <p>1. Look for the Side Hustle Bar icon on your home screen</p>
                <p>2. Open the app to ensure it loads properly</p>
                <p>3. Check for the welcome notification</p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-bar-accent/10 rounded-lg border border-bar-accent/20">
              <h3 className="text-bar-accent font-semibold mb-2">Need Help?</h3>
              <p className="text-white/70 text-sm">
                If you're having trouble with the installation, please{' '}
                <Link href="/contact" className="text-bar-accent hover:text-bar-accent/80 underline">
                  contact our support team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 