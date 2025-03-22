import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramFeedSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-black w-full">
      <div className="w-full max-w-[100%] px-2">
        <h2 className="section-title text-center mx-auto mb-6">Follow Us on Instagram</h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Instagram className="h-5 w-5 text-bar-accent" />
          <p className="text-center text-gray-300 max-w-full">
            Tag us in your photos using #SidehustleBar for a chance to be featured!
          </p>
        </div>
        
        <div className="w-full overflow-hidden">
          <div className="elfsight-app-3e805b8a-5eab-4485-93cc-489d1122c66c" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeedSection; 