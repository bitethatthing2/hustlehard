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

  // Silence the specific -ms-high-contrast deprecation warnings
  const originalWarn = console.warn;
  
  // Override console.warn to filter out specific deprecation messages
  console.warn = function(...args) {
    // Check if the warning is about -ms-high-contrast
    if (args.length > 0 && 
        typeof args[0] === 'string' && 
        args[0].includes('-ms-high-contrast') && 
        args[0].includes('deprecated')) {
      // Silently ignore these specific warnings
      return;
    }
    
    // Pass other warnings through to the original console.warn
    return originalWarn.apply(console, args);
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