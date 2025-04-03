// Optimized tracking prevention and performance fixes
(function() {
  // Cache DOM queries and use WeakMap for memory efficiency
  const imageCache = new WeakMap();
  const handledErrors = new Set();

  // Proxy image loader with caching
  function createImageProxy(originalImage) {
    if (imageCache.has(originalImage)) {
      return imageCache.get(originalImage);
    }

    const proxy = new Image();
    imageCache.set(originalImage, proxy);

    // Copy properties
    ['src', 'srcset', 'sizes'].forEach(prop => {
      if (originalImage[prop]) {
        proxy[prop] = originalImage[prop];
      }
    });

    return proxy;
  }

  // Optimized error monitoring with debouncing
  let errorTimeout;
  function monitorTrackingPrevention(event) {
    if (event.message?.includes('Tracking Prevention')) {
      const errorKey = `${event.filename}:${event.message}`;
      if (!handledErrors.has(errorKey)) {
        handledErrors.add(errorKey);
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
          console.warn('Tracking prevention detected - using fallback mechanisms');
        }, 100);
      }
    }
  }

  // Passive event listener patch with feature detection
  function patchEventListener() {
    if (window.EventTarget) {
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      const supportsPassive = (() => {
        let support = false;
        try {
          window.addEventListener('test', null, {
            get passive() { support = true; return true; }
          });
        } catch (e) {}
        return support;
      })();

      EventTarget.prototype.addEventListener = function(type, listener, options) {
        const isObject = typeof options === 'object';
        const usePassive = supportsPassive && 
          (type.startsWith('touch') || type === 'wheel' || type === 'mousewheel');

        const newOptions = isObject ? options : {
          capture: options,
          passive: usePassive,
          once: false
        };

        return originalAddEventListener.call(this, type, listener, newOptions);
      };
    }
  }

  // Initialize optimizations
  window.addEventListener('error', monitorTrackingPrevention, { passive: true });
  patchEventListener();

  // Export utilities if needed
  window.trackingFix = {
    createImageProxy,
    monitorTrackingPrevention
  };
})(); 