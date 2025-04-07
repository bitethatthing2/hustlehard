import { useEffect, useRef } from 'react';

interface GoogleReviewsProps {
  appId?: string;
  className?: string;
}

export default function GoogleReviews({ 
  appId = "f4fdffed-81de-4d5d-b688-2da302faebbe",
  className = "" 
}: GoogleReviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Avoid duplicate initialization
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Handle widget setup
    if (containerRef.current) {
      // Make sure the element has the required class
      const elementClass = `elfsight-app-${appId}`;
      if (!containerRef.current.classList.contains(elementClass)) {
        containerRef.current.classList.add(elementClass);
      }
      
      // Add lazy loading attribute
      containerRef.current.setAttribute('data-elfsight-app-lazy', '');

      // If Elfsight platform is already loaded, trigger initialization
      if (typeof window !== 'undefined' && window.hasOwnProperty('eapps')) {
        try {
          // @ts-ignore - Elfsight global isn't typed
          if (typeof window.eapps?.initWidgetsFromBuffer === 'function') {
            // @ts-ignore
            window.eapps.initWidgetsFromBuffer();
          }
        } catch (error) {
          console.warn('Error initializing Elfsight widget:', error);
        }
      }
    }

    // No cleanup needed - we're not adding the script manually anymore
    // The script is loaded once in layout.tsx
  }, [appId]);

  return (
    <div 
      ref={containerRef}
      className={`w-full ${className}`}
      style={{ minHeight: '150px' }}
    />
  );
} 