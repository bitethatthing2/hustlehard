"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ElfsightWidget from '@/components/social/ElfsightWidget';

const GoogleReviewsSection: React.FC = () => {
  const [widgetFailed, setWidgetFailed] = useState(false);

  // Google Reviews widget ID
  const GOOGLE_REVIEWS_WIDGET_ID = "f4fdffed-81de-4d5d-b688-2da302faebbe";

  // Add error handler for widget not found errors
  useEffect(() => {
    const handleErrors = (event: ErrorEvent) => {
      if (
        event.message?.includes('eapps.Platform') && 
        (event.message?.includes('WIDGET_NOT_FOUND') || 
         event.message?.includes(`"${GOOGLE_REVIEWS_WIDGET_ID}"`) ||
         event.message?.includes('can`t be initialized'))
      ) {
        console.warn("Google Reviews widget failed to load, using fallback");
        setWidgetFailed(true);
      }
    };

    window.addEventListener('error', handleErrors as EventListener);
    
    return () => {
      window.removeEventListener('error', handleErrors as EventListener);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      
      <section className="py-12 md:py-16 bg-black w-full">
        <div className="w-full max-w-[100%] px-2">
          <div className="text-center mb-8">
            <h2 className="section-title text-center mx-auto mb-4">Leave Us A Review</h2>
            <p className="text-gray-300 text-lg mb-4 mx-auto max-w-full">
              Don't just take our word for it. See what our customers have to say about their experiences.
            </p>
          </div>
          
          <div className="w-full overflow-hidden">
            {!widgetFailed ? (
              <ElfsightWidget
                widgetId={GOOGLE_REVIEWS_WIDGET_ID}
                fallbackMessage="Loading reviews..."
                wrapperClassName="w-full max-w-6xl mx-auto"
              />
            ) : (
              <div className="bg-gray-800/30 p-8 rounded-lg border border-gray-700">
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
                    href="https://www.google.com/search?q=side+hustle+bar+reviews" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    See Our Reviews on Google
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleReviewsSection; 