// Simple direct script to make Google Maps work
document.addEventListener('DOMContentLoaded', function() {
  // Flag to prevent multiple executions
  let mapInitialized = false;
  let retryCount = 0;
  const MAX_RETRIES = 2;
  
  // Record map status to prevent loops
  const mapStatus = {
    portland: { loaded: false, attempts: 0 },
    salem: { loaded: false, attempts: 0 }
  };
  
  function initializeMaps() {
    // Only run once
    if (mapInitialized) {
      console.log('[Map Fix] Maps already initialized, skipping');
      return;
    }
    
    console.log('[Map Fix] Running map initialization...');
    const mapContainers = document.querySelectorAll('[id^="map-container-"]');
    
    if (mapContainers.length === 0) {
      retryCount++;
      console.log(`[Map Fix] No map containers found yet (attempt ${retryCount}/${MAX_RETRIES})`);
      
      // Only retry a limited number of times
      if (retryCount < MAX_RETRIES) {
        setTimeout(initializeMaps, 1000);
      } else {
        console.log('[Map Fix] Max retries reached, giving up');
      }
      return;
    }
    
    console.log(`[Map Fix] Found ${mapContainers.length} map container(s)`);
    mapInitialized = true;
    
    mapContainers.forEach(function(container) {
      const locationId = container.id.replace('map-container-', '');
      
      // Skip if this location's map has too many attempts
      if (mapStatus[locationId] && mapStatus[locationId].attempts >= 2) {
        console.log(`[Map Fix] Skipping ${locationId} map - too many attempts`);
        return;
      }
      
      console.log(`[Map Fix] Processing map for location: ${locationId}`);
      
      // Define map URLs - use standard ones that work well
      const mapUrls = {
        portland: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.159563601747!2d-122.67878942359386!3d45.518537171074875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1742617552675!5m2!1sen!2sus",
        salem: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.156024280599!2d-123.0413951236238!3d44.940496071070314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1742618818338!5m2!1sen!2sus"
      };
      
      // Fallback to simpler URLs if needed
      const fallbackUrls = {
        portland: "https://maps.google.com/maps?q=Side+Hustle+Portland+OR&output=embed",
        salem: "https://maps.google.com/maps?q=Side+Hustle+Bar+Salem+OR&output=embed"
      };
      
      // Track attempts for this location
      if (!mapStatus[locationId]) {
        mapStatus[locationId] = { loaded: false, attempts: 0 };
      }
      mapStatus[locationId].attempts++;
      
      // Use appropriate URL based on attempt count
      const useUrl = mapStatus[locationId].attempts > 1 
        ? fallbackUrls[locationId] || fallbackUrls.portland
        : mapUrls[locationId] || mapUrls.portland;
      
      // Remove existing content
      container.innerHTML = '';
      
      // Create and append the iframe
      const iframe = document.createElement('iframe');
      iframe.className = "map-iframe";
      iframe.src = useUrl;
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('title', `${locationId.charAt(0).toUpperCase() + locationId.slice(1)} Map`);
      
      // Add load and error handlers
      iframe.addEventListener('load', function() {
        console.log(`[Map Fix] Map for ${locationId} loaded successfully`);
        mapStatus[locationId].loaded = true;
        // Add loaded class to container
        container.classList.add('map-loaded');
      });
      
      iframe.addEventListener('error', function(e) {
        console.error(`[Map Fix] Error loading map for ${locationId}:`, e);
        // Don't retry automatically - prevent loops
      });
      
      container.appendChild(iframe);
      console.log(`[Map Fix] Added map iframe for ${locationId} (attempt ${mapStatus[locationId].attempts})`);
    });
  }
  
  // Start the initialization
  setTimeout(initializeMaps, 500);
  
  // Handle location changes safely
  window.addEventListener('storage', function(e) {
    if (e.key === 'selectedLocation') {
      console.log(`[Map Fix] Location changed to: ${e.newValue}`);
      // Reset flags and give time for React to update DOM
      mapInitialized = false;
      retryCount = 0;
      // Delay to let React render
      setTimeout(initializeMaps, 1000);
    }
  });
}); 