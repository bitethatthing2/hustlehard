import React, { useState, useEffect } from 'react';
import { Instagram, Camera, Heart, MessageCircle } from 'lucide-react';
import Head from 'next/head';

const InstagramFeedSection: React.FC = () => {
  const [elfsightLoaded, setElfsightLoaded] = useState(true);

  // Check if Elfsight failed to load after a timeout
  useEffect(() => {
    // Wait 5 seconds to see if Elfsight loads
    const timer = setTimeout(() => {
      // Check if the Elfsight container has content
      const container = document.querySelector('.elfsight-app-3e805b8a-5eab-4485-93cc-489d1122c66c');
      if (container && container.children.length === 0) {
        console.warn('Elfsight Instagram widget failed to load, showing fallback');
        setElfsightLoaded(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Suppress deprecation warnings for -ms-high-contrast
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    console.warn = function(...args) {
      // Filter out the -ms-high-contrast deprecation warnings
      if (typeof args[0] === 'string' && args[0].includes('-ms-high-contrast')) {
        return;
      }
      return originalConsoleWarn.apply(console, args);
    };

    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      
      <section className="py-16 md:py-20 bg-black w-full relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bar-accent/5 to-transparent"></div>
          <div className="absolute top-[15%] right-[5%] w-32 h-32 rounded-full bg-bar-accent/5 blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[8%] w-24 h-24 rounded-full bg-bar-accent/5 blur-2xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="section-title text-center mx-auto mb-6">Follow Us on Instagram</h2>
            <div className="flex items-center justify-center gap-2 mb-2 max-w-2xl mx-auto">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                <Instagram className="h-4 w-4 text-white" />
              </div>
              <p className="text-center text-gray-300">
                Tag us in your photos using <span className="text-white font-medium">#SidehustleBar</span> for a chance to be featured!
              </p>
            </div>
          </div>
          
          <div className="w-full overflow-hidden rounded-xl holographic-border">
            {elfsightLoaded ? (
              <div className="elfsight-app-3e805b8a-5eab-4485-93cc-489d1122c66c p-1" data-elfsight-app-lazy></div>
            ) : (
              <div className="bg-black/70 backdrop-blur-md p-8 rounded-lg border border-gray-800">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center mb-6">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl text-white font-display mb-4">Our Instagram Feed</h3>
                  <p className="text-gray-300 mb-8 max-w-xl">
                    Follow us on Instagram to see our latest events, drink specials, and behind-the-scenes content of the best sports bar in town!
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((image) => (
                      <div key={image} className="rounded-lg overflow-hidden relative group">
                        <div className="aspect-square bg-gradient-to-br from-purple-900/40 via-gray-800/30 to-gray-900/40 rounded-lg animate-pulse"></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 text-white mr-1" />
                              <span className="text-white text-xs">{Math.floor(Math.random() * 100)}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 text-white mr-1" />
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
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-md"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="font-medium">Visit Our Instagram</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Follow us for our latest events, drink specials, and promotions
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramFeedSection; 