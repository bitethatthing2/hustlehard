import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

/**
 * Example component showing how to transform custom buttons to Shadcn UI buttons
 * This is a reference implementation - not meant to be used directly
 */
export const HeroButtonExamples = () => {
  return (
    <div className="space-y-8 p-6 border rounded-lg bg-gray-50">
      <div>
        <h2 className="text-xl font-bold mb-4">Before: Custom Button with Holographic Effects</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          {/* BEFORE - Original implementation with custom styling */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow"></div>
            
            <div className="relative z-10">
              <Link 
                href="/shop"
                className="w-full relative bg-gradient-to-r from-bar-accent via-bar-accent to-bar-accent/90 px-6 sm:px-8 py-4 sm:py-5 md:py-6 rounded-lg font-bold text-lg sm:text-xl md:text-2xl text-black hover:brightness-125 transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 shadow-xl transform hover:scale-[1.02] border-2 border-white/40 button-primary holographic-btn pulsing-shadow"
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/5 opacity-80"></div>
                </div>
                
                <Image
                  src="/menu_icon.png"
                  alt="Shop"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter brightness-0 invert relative z-10 drop-shadow-glow"
                />
                <span className="relative z-10 drop-shadow-md text-white">SHOP NOW</span>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 relative z-10 drop-shadow-glow" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">After: Shadcn UI Button Component</h2>
        <div className="bg-gray-900 p-6 rounded-lg">
          {/* AFTER - Simplified implementation using Shadcn UI Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="py-6 px-8 rounded-lg font-bold text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-3 sm:gap-4 shadow-sm bg-white text-black hover:bg-white border border-white"
            >
              <Image
                src="/menu_icon.png"
                alt="Shop"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="text-black font-bold">SHOP NOW</span>
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-medium mb-2">Key differences:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Removed complex nested divs for visual effects</li>
          <li>Eliminated gradient backgrounds and animations</li>
          <li>Simplified markup structure significantly</li>
          <li>Consistent styling through Shadcn UI component</li>
          <li>Improved accessibility with proper focus states</li>
          <li>Button maintains core functionality with simpler code</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-2">Before Code:</h3>
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60">
            {`<Link 
  href="/shop"
  className="w-full relative bg-gradient-to-r 
  from-bar-accent via-bar-accent to-bar-accent/90 
  px-6 sm:px-8 py-4 sm:py-5 md:py-6 rounded-lg 
  font-bold text-lg sm:text-xl md:text-2xl 
  text-black hover:brightness-125 transition-all 
  duration-300 flex items-center justify-center gap-3 
  sm:gap-4 shadow-xl transform hover:scale-[1.02] 
  border-2 border-white/40 button-primary 
  holographic-btn pulsing-shadow"
>
  {/* Inner glow effect */}
  <div className="absolute inset-0 rounded-lg overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t 
    from-white/20 via-transparent to-white/5 opacity-80"></div>
  </div>
  
  <Image src="/.png" alt="Shop" width={40} height={40} 
  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
  <span className="relative z-10">SHOP NOW</span>
  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9">{/* ... */}</svg>
</Link>`}
          </pre>
        </div>

        <div>
          <h3 className="font-medium mb-2">After Code:</h3>
          <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-60">
            {`<Button asChild size="lg" className="w-full max-w-md 
py-6 text-lg font-bold flex items-center 
justify-center gap-4">
  <Link href="/shop">
    <Image
      src="/menu_icon.png"
      alt="Shop"
      width={40}
      height={40}
      className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
    />
    <span>SHOP NOW</span>
    <svg className="w-6 h-6 sm:w-8 sm:h-8" 
    fill="none" viewBox="0 0 24 24" 
    stroke="currentColor" strokeWidth={1.5}>
      {/* path details */}
    </svg>
  </Link>
</Button>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HeroButtonExamples; 