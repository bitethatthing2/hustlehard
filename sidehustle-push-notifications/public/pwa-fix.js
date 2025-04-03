// Store the install prompt event for later use
let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Don't prevent the default - this is what was causing the banner not to show
  // e.preventDefault();
  
  // Store the event for later use
  deferredPrompt = e;
  
  // Optionally, show your own custom install button if you have one
  // This could be added to your UI when this event fires
  const installButton = document.getElementById('install-pwa-button');
  if (installButton) {
    installButton.style.display = 'block';
    
    installButton.addEventListener('click', () => {
      // Show the install prompt
      if (deferredPrompt) {
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the PWA installation');
          } else {
            console.log('User dismissed the PWA installation');
          }
          
          // Clear the saved prompt as it can't be used again
          deferredPrompt = null;
        });
      }
    });
  }
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (evt) => {
  // Log that the app was installed
  console.log('PWA was installed');
  
  // Hide the install button if it exists
  const installButton = document.getElementById('install-pwa-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
}); 