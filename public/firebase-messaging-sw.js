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

// Get the base URL for assets
const baseUrl = self.location.origin;

// Helper function to validate image URLs
function isValidImageUrl(url) {
  if (!url || url === 'undefined' || url === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  
  const title = payload.notification?.title || payload.data?.title || "New Notification";
  const body = payload.notification?.body || payload.data?.body || "You have a new notification";
  const link = payload.fcmOptions?.link || payload.data?.link || '/';
  const image = payload.data?.image || payload.notification?.image;
  
  const notificationOptions = {
    body,
    icon: `${baseUrl}/icons/mipmap-xxxhdpi/ic_launcher.png`,
    badge: `${baseUrl}/icons/icon-72x72.png`,
    data: { 
      url: link,
      ...payload.data,
      messageId: payload.messageId || payload.collapseKey || Date.now().toString()
    },
    tag: payload.messageId || payload.collapseKey || Date.now().toString(), // Use messageId as tag to prevent duplicate notifications
    renotify: false, // Don't notify again for same tag
    silent: false
  };

  if (isValidImageUrl(image)) {
    notificationOptions.image = image;
    console.log("Adding image to notification:", image);
  }

  console.log("SW: Creating notification with options:", notificationOptions);
  return self.registration.showNotification(title, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("SW: Notification clicked", event);
  event.notification.close();
  
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
