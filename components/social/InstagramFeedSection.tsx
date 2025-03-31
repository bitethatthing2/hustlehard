"use client";

import React from 'react';
import { Instagram, Camera } from 'lucide-react';
import Head from 'next/head';
import Script from 'next/script';

const InstagramFeedSection: React.FC = () => {
  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      
      <section className="py-12 sm:py-16 md:py-20 bg-black w-full relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bar-accent/5 to-transparent"></div>
          <div className="absolute top-[15%] right-[5%] w-32 h-32 rounded-full bg-bar-accent/5 blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[8%] w-24 h-24 rounded-full bg-bar-accent/5 blur-2xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="section-title text-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">Follow Us on Instagram</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 mb-2 sm:mb-0">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <p className="text-center sm:text-left text-sm sm:text-base text-gray-300">
                Tag us in your photos using <span className="text-white font-medium">#SidehustleBar</span> for a chance to be featured!
              </p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden rounded-xl holographic-border">
            <div className="bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg border border-gray-800">
              {/* Elfsight Instagram Feed Widget */}
              <Script src="https://static.elfsight.com/platform/platform.js" async />
              <div className="elfsight-app-4118f1f5-d59f-496f-8439-e8e0232a0fef" data-elfsight-app-lazy></div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Follow us for our latest events, drink specials, and promotions
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramFeedSection;