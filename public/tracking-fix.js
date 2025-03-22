// Script to handle tracking prevention warnings
(function() {
  // Create a proxy image loader
  window.proxyImageLoader = function(src, fallbackSrc) {
    const img = new Image();
    img.onerror = function() {
      console.warn('Image load error, using fallback:', src);
      this.src = fallbackSrc || '/only_these/logos/logo.png';
    };
    img.src = src;
    return img;
  };

  // Suppress -ms-high-contrast deprecation warnings
  const originalConsoleWarn = console.warn;
  console.warn = function(...args) {
    // Filter out specific deprecation warnings
    if (typeof args[0] === 'string') {
      if (args[0].includes('-ms-high-contrast') || 
          args[0].includes('Tracking Prevention')) {
        return;
      }
    }
    return originalConsoleWarn.apply(console, args);
  };
  
  // Monitor for errors related to tracking prevention
  window.addEventListener('error', function(event) {
    if (event.message && 
        (event.message.includes('Tracking Prevention') || 
         event.message.includes('googleusercontent.com') ||
         event.message.includes('instagram.com'))) {
      console.info('Suppressed third-party resource error');
      event.preventDefault();
      return true;
    }
  }, true);
})(); 