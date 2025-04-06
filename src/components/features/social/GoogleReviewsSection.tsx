"use client";

import React from 'react';
import { Star } from 'lucide-react';

const GoogleReviewsSection: React.FC = () => {
  return (
    <>
      <section className="py-12 sm:py-16 md:py-20 bg-black w-full relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-[25%] left-[10%] w-32 h-32 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[15%] w-24 h-24 rounded-full bg-white/5 blur-2xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="section-title text-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">Customer Reviews</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-2 sm:mb-0 flex-shrink-0">
                <Star className="h-4 w-4 text-white" />
              </div>
              <p className="text-center sm:text-left text-sm sm:text-base text-gray-300">
                See what our satisfied customers have to say about their experience at Hustle Hard
              </p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
            <div className="bg-black/70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg">
              {/* Elfsight Google Reviews Widget - Follows same pattern as Instagram widget */}
              <div className="min-h-[500px]"> {/* Ensure widget container has height */}
                <div 
                  className="elfsight-app-f4fdffed-81de-4d5d-b688-2da302faebbe" 
                  data-elfsight-app-lazy
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Thank you for your feedback! It helps us improve and provide the best experience possible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleReviewsSection;
