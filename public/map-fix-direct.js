// Simple direct script to make Google Maps work
document.addEventListener('DOMContentLoaded', function() {
  // Run after a short delay to ensure React has rendered
  setTimeout(function() {
    console.log('Map fix script running...');
    const mapContainers = document.querySelectorAll('[id^="map-container-"]');
    
    if (mapContainers.length === 0) {
      console.log('No map containers found yet, will retry...');
      // Try again in 1 second if no containers found
      setTimeout(checkForMaps, 1000);
      return;
    }
    
    console.log(`Found ${mapContainers.length} map containers`);
    mapContainers.forEach(function(container) {
      const locationId = container.id.replace('map-container-', '');
      console.log(`Processing map for location: ${locationId}`);
      
      // Define map URLs
      const mapUrls = {
        portland: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.159563601747!2d-122.67878942359386!3d45.518537171074875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1742617552675!5m2!1sen!2sus",
        salem: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.156024280599!2d-123.0413951236238!3d44.940496071070314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1742618818338!5m2!1sen!2sus"
      };
      
      // Use direct URL if location is known, otherwise default to Portland
      const mapUrl = mapUrls[locationId] || mapUrls.portland;
      
      // Clear container and add iframe directly
      container.innerHTML = '';
      container.innerHTML = `
        <iframe 
          src="${mapUrl}" 
          width="100%" 
          height="100%" 
          style="border:0; position:absolute; top:0; left:0; width:100%; height:100%;" 
          allowfullscreen=""
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      `;
      
      console.log(`Map iframe added for ${locationId}`);
    });
  }, 500);
  
  // Function to check for maps after delay
  function checkForMaps() {
    const mapContainers = document.querySelectorAll('[id^="map-container-"]');
    if (mapContainers.length > 0) {
      console.log(`Found ${mapContainers.length} map containers on retry`);
      mapContainers.forEach(function(container) {
        const locationId = container.id.replace('map-container-', '');
        const mapUrls = {
          portland: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5591.159563601747!2d-122.67878942359386!3d45.518537171074875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1742617552675!5m2!1sen!2sus",
          salem: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.156024280599!2d-123.0413951236238!3d44.940496071070314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1742618818338!5m2!1sen!2sus"
        };
        
        const mapUrl = mapUrls[locationId] || mapUrls.portland;
        
        container.innerHTML = '';
        container.innerHTML = `
          <iframe 
            src="${mapUrl}" 
            width="100%" 
            height="100%" 
            style="border:0; position:absolute; top:0; left:0; width:100%; height:100%;" 
            allowfullscreen=""
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        `;
      });
    } else {
      console.log('Map containers still not found, giving up for now');
    }
  }
  
  // Add meta tags to help with CORS issues
  const meta1 = document.createElement('meta');
  meta1.httpEquiv = 'Cross-Origin-Opener-Policy';
  meta1.content = 'same-origin-allow-popups';
  document.head.appendChild(meta1);
  
  // Also listen for location changes
  window.addEventListener('storage', function(e) {
    if (e.key === 'selectedLocation') {
      console.log('Location changed to: ' + e.newValue);
      setTimeout(checkForMaps, 500);
    }
  });
}); 