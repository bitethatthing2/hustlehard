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

// Keep track of notifications to prevent duplicates
const notificationTracker = new Set();

// Track if Firebase is handling a message to prevent duplicates
let isFirebaseHandlingMessage = false;

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

    // CRITICAL: Override the default onBackgroundMessage handler
    messaging.onBackgroundMessage((payload) => {
      console.log("[firebase-messaging-sw.js] Received background message ", payload);
      
      // Set flag to indicate Firebase is handling this message
      isFirebaseHandlingMessage = true;
      
      try {
        // Create a notification ID based on the payload content to prevent duplicates
        const notificationId = `${payload.notification?.title || ''}-${Date.now()}`;
        
        // Check if we've already shown this notification
        if (notificationTracker.has(notificationId)) {
          console.log('[firebase-messaging-sw.js] Duplicate notification prevented:', notificationId);
          isFirebaseHandlingMessage = false;
          return Promise.resolve();
        }
        
        // Add to tracker
        notificationTracker.add(notificationId);
        
        // Clean up tracker (keep only last 10 notifications)
        if (notificationTracker.size > 10) {
          const iterator = notificationTracker.values();
          notificationTracker.delete(iterator.next().value);
        }
        
        // payload.fcmOptions?.link comes from our backend API route handle
        // payload.data.link comes from the Firebase Console where link is the 'key'
        const link = payload.fcmOptions?.link || payload.data?.link || '/';
        
        // Get appropriate icon
        const icon = getAppropriateIcon(payload);
        
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: icon,
          badge: '/icons_folder/icon72.png',
          data: { url: link },
          tag: notificationId, // Use tag to prevent duplicates
          actions: [
            {
              action: "open",
              title: "View",
            }
          ],
          requireInteraction: true
        };
        
        return self.registration.showNotification(notificationTitle, notificationOptions)
          .finally(() => {
            // Reset the flag when we're done
            setTimeout(() => {
              isFirebaseHandlingMessage = false;
            }, 1000);
          });
      } catch (error) {
        console.error('[firebase-messaging-sw.js] Error in background message handler:', error);
        isFirebaseHandlingMessage = false;
        return Promise.resolve();
      }
    });
    
    // Helper function to get the appropriate icon
    function getAppropriateIcon(payload) {
      // Check if payload has a specific icon
      if (payload.notification && payload.notification.icon) {
        return payload.notification.icon;
      }
      
      // Get user agent to determine device type
      const userAgent = self.navigator.userAgent.toLowerCase();
      
      // Default icons for different platforms
      if (userAgent.includes('android')) {
        return '/icons_folder/mipmap-xxxhdpi/ic_launcher.png';
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        return '/icons_folder/touch-icon-iphone.png';
      } else {
        return '/icons_folder/icon-192.png';
      }
    }
    
  } else {
    console.warn('[firebase-messaging-sw.js] Firebase is not defined, possibly due to script import failure');
  }
} catch (e) {
  console.error('Error initializing Firebase in service worker:', e);
}

// CRITICAL: Add a push event handler to prevent duplicate notifications
// This will check if Firebase is already handling the message
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Push event received:', event);
  
  // If Firebase is handling this message, don't show another notification
  if (isFirebaseHandlingMessage) {
    console.log('[firebase-messaging-sw.js] Firebase is already handling this message, ignoring push event');
    return;
  }
  
  // Wait a moment to see if Firebase will handle this message
  event.waitUntil(
    new Promise(resolve => {
      // Give Firebase a chance to handle the message first
      setTimeout(() => {
        // If Firebase started handling the message during our wait, don't show a notification
        if (isFirebaseHandlingMessage) {
          console.log('[firebase-messaging-sw.js] Firebase started handling the message during wait, ignoring push event');
          return resolve();
        }
        
        // If Firebase isn't handling this message, we need to handle it ourselves
        console.log('[firebase-messaging-sw.js] Firebase is not handling this message, handling push event ourselves');
        
        // Only proceed if we have data
        if (!event.data) {
          return resolve();
        }
        
        try {
          const data = event.data.json();
          console.log('[firebase-messaging-sw.js] Push data:', data);
          
          // Create a notification ID based on the payload content to prevent duplicates
          const notificationId = `${(data.notification?.title || data.data?.title || '')}-${Date.now()}`;
          
          // Check if we've already shown this notification
          if (notificationTracker.has(notificationId)) {
            console.log('[firebase-messaging-sw.js] Duplicate notification prevented:', notificationId);
            return resolve();
          }
          
          // Add to tracker
          notificationTracker.add(notificationId);
          
          // Only show notification if there's notification data
          if (!data.notification && !data.data?.title) {
            console.log('[firebase-messaging-sw.js] No notification data in push message, ignoring');
            return resolve();
          }
          
          // Extract notification data
          const title = data.notification?.title || data.data?.title || "New Notification";
          const body = data.notification?.body || data.data?.body || "You have a new notification";
          
          // Get link from various possible locations
          const link = data.fcmOptions?.link || data.data?.link || data.data?.url || '/';
          
          // Create notification options
          const options = {
            body: body,
            icon: data.notification?.icon || '/icons_folder/icon-192.png',
            badge: '/icons_folder/icon72.png',
            tag: notificationId, // Use tag to prevent duplicates
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
          return self.registration.showNotification(title, options)
            .then(resolve);
        } catch (error) {
          console.error('[firebase-messaging-sw.js] Error handling push event:', error);
          resolve();
        }
      }, 500); // Wait 500ms to see if Firebase handles it
    })
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  // Close the notification
  event.notification.close();
  
  // Handle action buttons if clicked
  if (event.action === 'open') {
    console.log("[firebase-messaging-sw.js] 'View' button clicked");
  }

  // Get the URL to open
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
