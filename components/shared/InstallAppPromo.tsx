'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InstallAppPromo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-black/30 border border-white/20 rounded-xl backdrop-blur-sm">
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          Unlock the full experience!
        </h2>
        <p className="text-white max-w-2xl mx-auto mb-6">
          Install our app and be the first to know about upcoming events, new menu items, exclusive artist spotlights, and even raffles and giveaways. Don't miss out - download now for instant updates!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/instructions/ios">
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2 h-auto">
              iOS Installation Guide
            </Button>
          </Link>
          <Link href="/instructions/android">
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2 h-auto">
              Android Installation Guide
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstallAppPromo; 