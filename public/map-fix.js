// Helper script for Google Maps loading issues
(function() {
  // Detect when Google Maps iframes are loaded
  function detectMapLoads() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            // Check if the added node is an iframe or contains an iframe
            if (node.tagName === 'IFRAME') {
              checkIframe(node);
            } else if (node.querySelectorAll) {
              const iframes = node.querySelectorAll('iframe');
              iframes.forEach(checkIframe);
            }
          }
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    // Also check existing iframes
    const existingIframes = document.querySelectorAll('iframe');
    existingIframes.forEach(checkIframe);
  }
  
  // Check if the iframe is a Google Maps embed and ensure it loads
  function checkIframe(iframe) {
    if (iframe.src && iframe.src.includes('google.com/maps')) {
      // Store original source
      const originalSrc = iframe.src;
      
      // Set a timeout to force reload if it doesn't load
      const timeout = setTimeout(() => {
        if (document.contains(iframe)) {
          // Try to reload the iframe
          iframe.src = 'about:blank';
          setTimeout(() => {
            iframe.src = originalSrc;
          }, 50);
        }
      }, 3000);
      
      // Clear timeout if it loads successfully
      iframe.addEventListener('load', function() {
        clearTimeout(timeout);
        // Signal that the map has loaded
        window.dispatchEvent(new CustomEvent('google-map-loaded'));
        // Also post a message for React components to detect
        window.postMessage({ type: 'GOOGLE_MAPS_LOADED' }, '*');
        
        // Add success class
        iframe.classList.add('map-iframe-loaded');
      });
    }
  }
  
  // Fix CORS issues with Google Maps
  function addMapsCorsHeaders() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cross-Origin-Opener-Policy';
    meta.content = 'same-origin-allow-popups';
    document.head.appendChild(meta);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      detectMapLoads();
      addMapsCorsHeaders();
    });
  } else {
    detectMapLoads();
    addMapsCorsHeaders();
  }
})(); 