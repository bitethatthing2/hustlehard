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

// Flag to track if we're in the foreground
let clientIsHandlingNotifications = false;

// Check if any client windows are visible
async function hasVisibleClients() {
  const windowClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  });
  
  return windowClients.some(client => client.visibilityState === 'visible');
}

// Generate a consistent notification ID from the payload
function generateNotificationId(payload) {
  // Use collapseKey if available, otherwise create a hash from the notification content
  if (payload.collapseKey) {
    return `collapseKey:${payload.collapseKey}`;
  }
  
  // Create a hash from notification content
  const title = payload.data?.title || payload.notification?.title || '';
  const body = payload.data?.body || payload.notification?.body || '';
  const timestamp = Math.floor(Date.now() / 10000); // Round to nearest 10 seconds to prevent duplicates
  
  return `content:${title}:${body}:${timestamp}`;
}

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFICATION_HANDLED_BY_CLIENT') {
    console.log('[firebase-messaging-sw.js] Client is handling notifications');
    clientIsHandlingNotifications = true;
    
    // Store the notification ID that was handled by the client
    if (event.data.notificationId) {
      processedNotifications.add(event.data.notificationId);
      console.log('[firebase-messaging-sw.js] Added client-handled notification ID:', event.data.notificationId);
    }
  }
});

// Handle background messages
messaging.onBackgroundMessage(async (payload) => {
  try {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    // Create a unique notification ID
    const notificationId = generateNotificationId(payload);
    
    // Check if we've already processed this notification
    if (processedNotifications.has(notificationId)) {
      console.log('[firebase-messaging-sw.js] Skipping duplicate notification:', notificationId);
      return;
    }

    // Check if any clients are visible - if so, let the client handle the notification
    const clientsAreVisible = await hasVisibleClients();
    if (clientsAreVisible && clientIsHandlingNotifications) {
      console.log('[firebase-messaging-sw.js] Clients are visible and handling notifications, skipping SW notification');
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
        timestamp: Date.now(),
        notificationId: notificationId // Store the ID for reference
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
