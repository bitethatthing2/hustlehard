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

// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyB0Nxf3pvW32KBc0D1o2-K6qIeKovhGWfg",
  authDomain: "new1-f04b3.firebaseapp.com",
  projectId: "new1-f04b3",
  storageBucket: "new1-f04b3.firebasestorage.app",
  messagingSenderId: "802463638703",
  appId: "1:802463638703:web:bd0bbdaf3407d784d5205a",
  measurementId: "G-3RZEW537LN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Keep track of processed notifications to prevent duplicates
const processedNotifications = new Set();

// Handle background messages
messaging.onBackgroundMessage(async (payload) => {
  try {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    // Create a unique notification ID
    const notificationId = payload.collapseKey || `${Date.now()}`;
    
    // Check if we've already processed this notification
    if (processedNotifications.has(notificationId)) {
      console.log('[firebase-messaging-sw.js] Skipping duplicate notification:', notificationId);
      return;
    }
    
    // Add to processed notifications
    processedNotifications.add(notificationId);
    
    // Clean up processed notifications (keep only last 10)
    if (processedNotifications.size > 10) {
      const iterator = processedNotifications.values();
      processedNotifications.delete(iterator.next().value);
    }

    // Extract notification data
    const notificationData = {
      title: payload.data?.title || payload.notification?.title || 'New Notification',
      body: payload.data?.body || payload.notification?.body || '',
      image: payload.data?.image || payload.notification?.image,
      link: payload.data?.link || payload.fcmOptions?.link || '/'
    };

    console.log('[firebase-messaging-sw.js] Extracted notification data:', notificationData);

    if (!notificationData.title) {
      console.error('[firebase-messaging-sw.js] Missing title in payload');
      return;
    }

    const deviceIsIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    const notificationOptions = {
      body: notificationData.body,
      icon: '/icons/mipmap-xxxhdpi/ic_launcher.png',
      badge: '/icons/icon-72x72.png',
      tag: notificationId, // Use tag to prevent duplicates
      data: {
        ...notificationData,
        timestamp: Date.now()
      },
      ...((!deviceIsIOS && notificationData.image) && {
        image: notificationData.image
      }),
      renotify: false,
      requireInteraction: true,
      silent: deviceIsIOS,
      actions: deviceIsIOS ? [] : [
        {
          action: "open",
          title: "View",
        }
      ]
    };

    console.log('[firebase-messaging-sw.js] Showing notification with options:', notificationOptions);
    const registration = await self.registration.showNotification(notificationData.title, notificationOptions);
    console.log('[firebase-messaging-sw.js] Notification shown successfully:', registration);
    return registration;

  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error showing notification:', error);
    console.error('[firebase-messaging-sw.js] Error details:', error.message);
    return null;
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received:', event);
  
  event.notification.close();
  
  // Handle action buttons if clicked
  if (event.action === 'open') {
    console.log("[firebase-messaging-sw.js] 'View' button clicked");
  }
  
  const url = event.notification.data?.link || '/';
  console.log('[firebase-messaging-sw.js] Opening link:', url);
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
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
      .catch(error => {
        console.error('[firebase-messaging-sw.js] Error handling notification click:', error);
      })
  );
});

// Explicitly handle push events to prevent duplicate notifications
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Push event received, but will be handled by onBackgroundMessage');
  // We don't need to do anything here as onBackgroundMessage will handle it
  // This empty handler prevents the browser from showing its own notification
});
