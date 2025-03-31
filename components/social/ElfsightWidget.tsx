"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Extend the Window interface to include the Elfsight eapps property and our custom flag
declare global {
  interface Window {
    eapps?: {
      AppsManager?: any;
      Platform?: {
        initialized?: boolean;
      };
    };
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
  className,
  wrapperClassName,
  fallbackMessage = "Widget loading..."
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Error handler for all Elfsight widget errors
  const handleElfsightErrors = useCallback((event: ErrorEvent) => {
    // Check if this is an Elfsight error message
    if (
      event.message?.includes('eapps.Platform') && 
      (event.message?.includes('WIDGET_NOT_FOUND') || 
       event.message?.includes(`"${widgetId}"`) ||
       event.message?.includes('can`t be initialized'))
    ) {
      console.warn(`Elfsight widget error: ${event.message}`);
      setHasError(true);
      setIsLoading(false);
    }
    
    // Check for Elfsight script loading errors
    if (event.target && 
        'src' in event.target && 
        typeof (event.target as HTMLScriptElement).src === 'string' &&
        (event.target as HTMLScriptElement).src.includes('static.elfsight.com/platform/platform.js')) {
      console.warn('Elfsight platform script failed to load');
      setHasError(true);
      setIsLoading(false);
    }
  }, [widgetId]);

  useEffect(() => {
    // Check if Elfsight script failed to load (set in layout.tsx)
    if (typeof window !== 'undefined' && window.elfsightLoadFailed) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    
    // Add global error handler for Elfsight errors
    window.addEventListener('error', handleElfsightErrors as EventListener);
    
    // Check if Elfsight is loaded
    if (typeof window !== 'undefined') {
      const checkElfsightLoaded = setInterval(() => {
        // Check if platform is initialized
        if (window.eapps && (window.eapps.AppsManager || window.eapps.Platform?.initialized)) {
          setIsLoading(false);
          clearInterval(checkElfsightLoaded);
        }
      }, 500);
      
      // Timeout after 10 seconds to prevent infinite checking
      setTimeout(() => {
        clearInterval(checkElfsightLoaded);
        if (isLoading) {
          setHasError(true);
        }
      }, 10000);
      
      return () => {
        clearInterval(checkElfsightLoaded);
        window.removeEventListener('error', handleElfsightErrors as EventListener);
      };
    }
  }, [isLoading, handleElfsightErrors]);

  // Error handler for direct widget errors
  const handleError = () => {
    console.warn('Elfsight widget had an error loading');
    setHasError(true);
  };

  return (
    <div className={cn("elfsight-widget-wrapper w-full", wrapperClassName)}>
      {isLoading && !hasError && (
        <div className="text-center py-6 text-white/70">{fallbackMessage}</div>
      )}
      
      {hasError && (
        <div className="text-center py-6 text-white/70">
          Widget could not be loaded. The widget ID may be invalid or your connection may be offline.
        </div>
      )}
      
      {!hasError && (
        <div 
          className={cn("elfsight-app-" + widgetId, className)}
          data-elfsight-app-lazy
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ElfsightWidget; 