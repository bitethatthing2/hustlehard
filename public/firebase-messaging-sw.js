// Self-registration for the service worker
self.addEventListener('install', function(event) {
  console.log('[firebase-messaging-sw.js] Service Worker installed');
  self.skipWaiting(); // Ensure the service worker activates immediately
});

// Handle service worker activation
self.addEventListener('activate', function(event) {
  console.log('[firebase-messaging-sw.js] Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

// Try to import Firebase scripts with error handling
try {
  importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  );
  console.log('[firebase-messaging-sw.js] Firebase scripts imported successfully');
} catch (e) {
  console.error('Error importing Firebase scripts:', e);
}

// Replace these with your own Firebase config keys...
const firebaseConfig = {
  apiKey: "AIzaSyB0Nxf3pvW32KBc0D1o2-K6qIeKovhGWfg",
  authDomain: "new1-f04b3.firebaseapp.com",
  projectId: "new1-f04b3",
  storageBucket: "new1-f04b3.firebasestorage.app",
  messagingSenderId: "802463638703",
  appId: "1:802463638703:web:bd0bbdaf3407d784d5205a",
  measurementId: "G-3RZEW537LN"
};

// Initialize Firebase with error handling
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    console.log('[firebase-messaging-sw.js] Firebase initialized successfully');

    /**
     * Get the URL from a notification
     * @param {Object} notification - The notification object
     * @returns {string} The URL to navigate to
     */
    function getNotificationUrl(notification) {
      // Extract link from various possible locations
      return notification.data?.link || 
             notification.data?.url || 
             notification.fcmOptions?.link || 
             '/';
    }

    // Helper function to get the appropriate icon based on device
    function getDeviceAppropriateIcon(payload) {
      // Check if payload has a specific icon
      if (payload.notification && payload.notification.icon) {
        return payload.notification.icon;
      }
      
      // Get user agent to determine device type
      const userAgent = self.navigator.userAgent.toLowerCase();
      
      // Default icons for different platforms
      if (userAgent.includes('android')) {
        // Android device
        return './icons_folder/mipmap-xxxhdpi/ic_launcher.png';
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        // iOS device
        return './icons_folder/touch-icon-iphone.png';
      } else if (userAgent.includes('windows')) {
        // Windows device
        return './icons_folder/icon-144.png';
      } else {
        // Default for other devices
        return './icons_folder/icon-192.png';
      }
    }
    
    // Helper function to get the appropriate badge based on device
    function getDeviceAppropriateBadge(payload) {
      // Check if payload has a specific badge
      if (payload.notification && payload.notification.badge) {
        return payload.notification.badge;
      }
      
      // Get user agent to determine device type
      const userAgent = self.navigator.userAgent.toLowerCase();
      
      // Default badges for different platforms
      if (userAgent.includes('android')) {
        // Android device
        return './icons_folder/icon-72.png';
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        // iOS device - iOS prefers smaller badges
        return './icons_folder/icon-40.png';
      } else {
        // Default for other devices
        return './icons_folder/icon-72.png';
      }
    }

    // Handle background messages
    messaging.onBackgroundMessage((payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );

      // IMPORTANT: Set FCM's default notification behavior to silent
      // This prevents Firebase from showing its default notification
      messaging.setBackgroundMessageHandler(function(payload) {
        console.log('[firebase-messaging-sw.js] Handling background message with custom handler');
        // Return empty promise to prevent default notification
        return Promise.resolve();
      });

      // Extract notification data from payload
      const notificationTitle = payload.notification.title || "New Notification";
      const notificationBody = payload.notification.body || "You have a new notification";
      
      // Get link from various possible locations using our utility function
      const link = getNotificationUrl(payload);
      
      // Get device-appropriate icons
      const icon = getDeviceAppropriateIcon(payload);
      const badge = getDeviceAppropriateBadge(payload);
      
      // Create notification options
      const notificationOptions = {
        body: notificationBody,
        icon: icon,
        badge: badge,
        vibrate: [100, 50, 100],
        data: { url: link },
        actions: [
          {
            action: "open",
            title: "View",
          }
        ],
        requireInteraction: true
      };
      
      // Show the notification
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } else {
    console.warn('[firebase-messaging-sw.js] Firebase is not defined, possibly due to script import failure');
  }
} catch (e) {
  console.error('Error initializing Firebase in service worker:', e);
}

// Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.", event);

  // Close the notification
  event.notification.close();
  
  // Handle action buttons if clicked
  if (event.action === 'open') {
    console.log("[firebase-messaging-sw.js] 'View' button clicked");
  }

  // Get the URL to open using our utility function
  const url = event.notification.data?.url || "/";
  
  // This checks if the client is already open and if it is, it focuses on the tab
  // If it is not open, it opens a new tab with the URL
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        // Try to find an existing window with the URL
        for (const client of clientList) {
          const clientUrl = new URL(client.url);
          const targetUrl = new URL(url, self.location.origin);
          
          // If we find a matching client, focus it
          if (clientUrl.pathname === targetUrl.pathname && "focus" in client) {
            return client.focus();
          }
        }

        // If no matching client is found, open a new window
        if (clients.openWindow) {
          console.log("[firebase-messaging-sw.js] Opening new window:", url);
          return clients.openWindow(url);
        }
      })
  );
});

// Handle push events directly (for web push)
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Push received:', event);
  
  // If the push has data but no notification (raw push),
  // create a notification from the data
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    // If Firebase already created a notification, don't create another one
    if (data.notification) return;
    
    // Otherwise, create a notification from the data
    const title = data.data?.title || "New Notification";
    const options = {
      body: data.data?.body || "You have a new notification",
      icon: './icons_folder/icon-192.png',
      badge: './icons_folder/icon-72.png',
      data: {
        url: data.data?.link || data.data?.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error handling push:', error);
  }
});

// Add a message event listener to handle communication from the client
self.addEventListener('message', function(event) {
  console.log('[firebase-messaging-sw.js] Message received from client:', event.data);
  
  if (event.data && event.data.type === 'PING') {
    // Respond to ping to confirm service worker is active
    event.ports[0].postMessage({
      type: 'PONG',
      status: 'Service worker is active'
    });
  }
});
