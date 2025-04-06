/* eslint-disable no-restricted-globals */

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// **IMPORTANT**: Config is injected during the build process
// by next.config.ts into self.__FIREBASE_CONFIG__

// For debugging
const SW_VERSION = '1.0.1'; // Incremented version
console.log(`[SW v${SW_VERSION}] Service Worker starting... Attempting to read config.`);

// Ensure the config object exists before proceeding
if (typeof self === 'undefined' || !(self as any).__FIREBASE_CONFIG__) {
  console.error(`[SW v${SW_VERSION}] Firebase config (self.__FIREBASE_CONFIG__) not found. SW cannot initialize.`);
} else {
  // Read the injected config
  const firebaseConfig = (self as any).__FIREBASE_CONFIG__;
  console.log(`[SW v${SW_VERSION}] Firebase config loaded from injection:`, firebaseConfig ? 'Config Present' : 'Config Missing/Invalid');

  try {
    // Initialize the Firebase app in the service worker using injected config
    const app = initializeApp(firebaseConfig);
    console.log(`[SW v${SW_VERSION}] Firebase app initialized in SW.`);

    const messaging = getMessaging(app);
    console.log(`[SW v${SW_VERSION}] Firebase Messaging instance obtained in SW.`);

    // Background message handler
    onBackgroundMessage(messaging, (payload) => {
      console.log(`[SW v${SW_VERSION}] Received background message:`, payload);

      // Customize notification here
      const notificationTitle = payload.notification?.title || payload.data?.title || "New Hustle Hard Update";
      const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || "Check it out!",
        // Use a standard icon from your manifest
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png', // Optional: badge for Android
        tag: payload.collapseKey || payload.messageId || Date.now().toString(), // Helps grouping/replacing notifications
        data: {
          url: payload.fcmOptions?.link || payload.data?.link || '/', // Default link
          swVersion: SW_VERSION
        },
        // Add other options as needed (e.g., actions, image)
        // image: payload.data?.image,
        // actions: [
        //   { action: 'open_url', title: 'Open' },
        // ],
      };

      console.log(`[SW v${SW_VERSION}] Showing notification with title: "${notificationTitle}" and options:`, notificationOptions);

      // Use self.registration (service worker's registration property)
      if (self.registration) {
         self.registration.showNotification(notificationTitle, notificationOptions)
           .then(() => console.log(`[SW v${SW_VERSION}] Notification shown successfully.`))
           .catch(err => console.error(`[SW v${SW_VERSION}] Error showing notification:`, err));
      } else {
        console.error(`[SW v${SW_VERSION}] self.registration is not available. Cannot show notification.`);
      }
    });

    console.log(`[SW v${SW_VERSION}] Background message handler set up.`);

  } catch (error) {
    console.error(`[SW v${SW_VERSION}] Error initializing Firebase in SW:`, error);
    // Log the config that caused the error if possible
    console.error(`[SW v${SW_VERSION}] Config used:`, firebaseConfig);
  }
}

// Handle notification click event
self.addEventListener('notificationclick', (event) => {
  console.log(`[SW v${SW_VERSION}] Notification clicked:`, event.notification);
  event.notification.close(); // Close the notification

  // Get the URL from the notification data
  const urlToOpen = event.notification.data?.url || '/';
  console.log(`[SW v${SW_VERSION}] Attempting to open URL: ${urlToOpen}`);

  // Open the app or specific URL
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // Use startsWith for broader matching if needed (e.g., ignore query params)
        if (client.url === urlToOpen && 'focus' in client) {
          console.log(`[SW v${SW_VERSION}] Found existing client, focusing...`);
          return client.focus();
        }
      }
      // If no existing tab, open a new one
      if (clients.openWindow) {
        console.log(`[SW v${SW_VERSION}] No existing client found, opening new window...`);
        return clients.openWindow(urlToOpen);
      }
    }).catch(err => {
      console.error(`[SW v${SW_VERSION}] Error handling notification click:`, err);
    })
  );
});

console.log(`[SW v${SW_VERSION}] Service Worker script fully executed.`);
