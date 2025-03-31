"use client";

import React, { useState } from 'react';
import { Instagram, Camera, Heart, MessageCircle } from 'lucide-react';
import Head from 'next/head';
import ElfsightWidget from '@/components/social/ElfsightWidget';

const InstagramFeedSection: React.FC = () => {
  // Instagram widget ID - Currently invalid, defaulting to fallback UI
  const INSTAGRAM_WIDGET_ID = "979f0d90-30a8-42a5-8c5d-aa0644dacc4f";
  
  // Set to false to use the fallback UI since the widget ID is invalid
  const [useElfsightWidget, setUseElfsightWidget] = useState(false);
  
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
            {useElfsightWidget ? (
              <ElfsightWidget
                widgetId={INSTAGRAM_WIDGET_ID}
                wrapperClassName="bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg border border-gray-800"
                fallbackMessage="Loading Instagram feed..."
              />
            ) : (
              <div className="bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg border border-gray-800">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mb-4 sm:mb-6">
                    <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl text-white font-display mb-2 sm:mb-4">Our Instagram Feed</h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-xl px-2 sm:px-4">
                    Follow us on Instagram to see our latest events, drink specials, and behind-the-scenes content of the best sports bar in town!
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 w-full">
                    {[1, 2, 3, 4].map((image) => (
                      <div key={image} className="rounded-lg overflow-hidden relative group">
                        <div className="aspect-square bg-gradient-to-br from-purple-900/40 via-gray-800/30 to-gray-900/40 rounded-lg animate-pulse"></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-white mr-1" />
                              <span className="text-white text-xs">{Math.floor(Math.random() * 100)}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-white mr-1" />
                              <span className="text-white text-xs">{Math.floor(Math.random() * 20)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="https://www.instagram.com/sidehustlebar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md text-sm sm:text-base"
                  >
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-medium">Visit Our Instagram</span>
                  </a>
                </div>
              </div>
            )}
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