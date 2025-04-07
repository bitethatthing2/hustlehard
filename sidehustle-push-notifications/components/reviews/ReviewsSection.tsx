"use client";

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// This component creates a wrapper for the Elfsight Google Reviews widget
const ReviewsSection: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Google Reviews widget ID - configured in Elfsight dashboard
  const GOOGLE_REVIEWS_WIDGET_ID = "f4fdffed-81de-4d5d-b688-2da302faebbe";

  // Check for client-side hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Render a fallback component if the widget fails to load
  const renderFallback = () => (
    <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 w-full max-w-3xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl text-white mb-4">Google Reviews</h3>
        <p className="text-gray-300 mb-4">
          Check out our 4.8 star rating on Google! We appreciate all of our customers' feedback.
        </p>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-2xl">★</span>
          ))}
        </div>
        <p className="text-yellow-400 font-bold text-xl mb-4">4.8 / 5</p>
        <a 
          href="https://g.page/r/CQFvIkYoqoS2EAE/review" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          See Our Reviews on Google
        </a>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      
      <section className="py-12 md:py-16 bg-black w-full">
        <div className="w-full max-w-[100%] px-2">
          <div className="text-center mb-8">
            <h2 className="section-title text-center mx-auto mb-4">Our Reviews</h2>
            <p className="text-gray-300 text-lg mb-4 mx-auto max-w-full">
              Don't just take our word for it. See what our customers have to say about their experiences.
            </p>
          </div>
          
          <div className="w-full flex flex-col items-center" ref={containerRef}>
            {isHydrated ? (
              <div className="w-full max-w-3xl mx-auto" style={{ minHeight: "500px" }}>
                {/* Elfsight Google Reviews Widget with proper lazy loading attribute */}
                <div 
                  className={`elfsight-app-${GOOGLE_REVIEWS_WIDGET_ID}`} 
                  data-elfsight-app-lazy
                ></div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
              </div>
            )}
            
            <div className="mt-8 text-center text-sm text-gray-400 max-w-3xl">
              <p>
                Reviews are powered by Google. Your feedback helps us improve our service.
                <br />
                Thank you for taking the time to share your experience!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsSection; 