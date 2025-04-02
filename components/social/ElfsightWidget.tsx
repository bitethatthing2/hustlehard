"use client";

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

// Add typings for global window object
declare global {
  interface Window {
    eapps?: {
      initWidget?: (options: { widgetElemId: string }) => void;
      initWidgetsFromBuffer?: () => void;
      AppsManager?: any;
      Platform?: { 
        initialized?: boolean;
      };
    };
    elfsightLoaded?: boolean;
    elfsightLoadFailed?: boolean;
  }
}

interface ElfsightWidgetProps {
  widgetId: string;
  className?: string;
  wrapperClassName?: string;
  fallbackMessage?: string;
}

/**
 * Reusable component for Elfsight widgets
 * 
 * @param widgetId - The Elfsight widget ID
 * @param className - Optional className for the widget container
 * @param wrapperClassName - Optional className for the wrapper div
 * @param fallbackMessage - Optional message to display if widget fails to load
 */
const ElfsightWidget: React.FC<ElfsightWidgetProps> = ({
  widgetId,
  className = '',
  wrapperClassName = '',
  fallbackMessage = 'Loading widget...',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true);
  const elementId = `elfsight-app-${widgetId}`;
  
  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;
    
    isMounted.current = true;
    
    // Initialize widget if Elfsight platform is already loaded
    const initializeWidget = () => {
      try {
        if (window.eapps && typeof window.eapps.initWidget === 'function') {
          window.eapps.initWidget({
            widgetElemId: elementId,
          });
        }
      } catch (err) {
        console.warn('Error initializing Elfsight widget:', err);
        if (isMounted.current) {
          setHasError(true);
        }
      }
    };

    // Check if widget is loaded
    const checkWidgetLoaded = () => {
      if (!isMounted.current) return;
      
      if (widgetRef.current) {
        const widgetContainer = widgetRef.current.querySelector(`[class*="elfsight-app-"]`);
        const hasContent = widgetContainer && widgetContainer.children.length > 0;
        
        if (hasContent) {
          setIsLoaded(true);
        } else {
          // Check again after a delay
          setTimeout(checkWidgetLoaded, 1000);
        }
      }
    };

    // Start the check process
    initializeWidget();
    checkWidgetLoaded();

    // Clean up function
    return () => {
      isMounted.current = false;
    };
  }, [widgetId, elementId]);

  // Fallback component if widget fails to load
  if (hasError) {
    return (
      <div className={`elfsight-widget-error ${wrapperClassName}`}>
        <div className="p-4 text-center">
          <p className="text-red-500">Widget could not be loaded.</p>
          <div className="mt-2">
            <a 
              href="https://g.page/r/CQFvIkYoqoS2EAE/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 underline"
            >
              See our reviews on Google
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`elfsight-widget-container ${wrapperClassName}`}>
      {!isLoaded && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-pulse">{fallbackMessage}</div>
        </div>
      )}
      
      <div
        ref={widgetRef}
        id={elementId}
        className={`${elementId} ${className}`}
        data-elfsight-app-lazy
      />
    </div>
  );
};

export default ElfsightWidget; 