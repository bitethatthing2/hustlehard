'use client';

import { type ReactNode, useState } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ProductInfo from '@/components/shop/ProductInfo';
import ProductDisplay from '@/components/shop/ProductDisplay';
import GiveawaysSection from '@/components/shop/GiveawaysSection';

function BackgroundBeams(): ReactNode {
  return (
    <div className="fixed inset-0 bg-black z-0 overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        {/* Vertical light beams */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow delay-300" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow delay-700" />
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 -left-[100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent transform rotate-[30deg] translate-y-[30vh]"></div>
          <div className="absolute bottom-0 -left-[100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent transform rotate-[-30deg] -translate-y-[30vh]"></div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage(): ReactNode {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleModelLoad = () => {
    setIsModelLoaded(true);
    setTimeout(() => setShowTooltip(false), 5000);
  };

  const handleModelError = () => {
    console.error('3D model failed to load');
    setIsModelLoaded(true);
  };

  return (
    <main className="relative min-h-screen bg-black text-white isolate">
      <BackgroundBeams />

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="relative z-20">
          <ShopHeader />
          <ProductDisplay 
            isModelLoaded={isModelLoaded}
            showTooltip={showTooltip}
            onModelLoad={handleModelLoad}
            onModelError={handleModelError}
            onTooltipToggle={() => setShowTooltip(!showTooltip)}
          />
          <ProductInfo />
          <GiveawaysSection />
        </div>
      </div>
    </main>
  );
} 