import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage, MessagePayload } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0Nxf3pvW32KBc0D1o2-K6qIeKovhGWfg",
  authDomain: "new1-f04b3.firebaseapp.com",
  projectId: "new1-f04b3",
  storageBucket: "new1-f04b3.firebasestorage.app",
  messagingSenderId: "802463638703",
  appId: "1:802463638703:web:bd0bbdaf3407d784d5205a",
  measurementId: "G-3RZEW537LN"
};

// Helper function to check if device is iOS
export const isIOS = () => {
  return typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Get messaging instance
const messaging = async () => {
  const supported = await isSupported();
  console.log("Is messaging supported:", supported);
  if (!supported) {
    console.log("Firebase messaging is not supported in this environment");
    return null;
  }
  return getMessaging(app);
};

// Track processed notification IDs to prevent duplicates
const processedNotifications = new Set();

// Fetch FCM token
export const fetchToken = async () => {
  try {
    console.log("Attempting to fetch FCM token...");
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      console.log("Messaging initialized, fetching token...");
      
      // Try to get VAPID key from window.ENV first, then fall back to process.env
      const vapidKey = typeof window !== 'undefined' && (window as any).ENV?.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY 
        ? (window as any).ENV.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY 
        : process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY;
      
      console.log("Using VAPID key:", vapidKey ? "Key exists" : "Key missing");
      
      // Check if we're in a development environment with a self-signed certificate
      const isDevelopmentWithUntrustedCert = 
        typeof window !== 'undefined' && 
        (window.location.protocol !== 'https:' || 
         (window.location.hostname === 'localhost' && 
          !window.isSecureContext));
      
      if (isDevelopmentWithUntrustedCert) {
        console.log("Development environment detected, using test token");
        return "test-token-for-ui-development";
      }
      
      // Register service worker if needed
      let serviceWorkerRegistration = null;
      if ('serviceWorker' in navigator) {
        try {
          // Check for existing service worker
          const registrations = await navigator.serviceWorker.getRegistrations();
          const existingFCMServiceWorker = registrations.find(
            reg => reg.active && reg.scope.includes(window.location.origin)
          );
          
          if (existingFCMServiceWorker) {
            console.log('Found existing service worker:', existingFCMServiceWorker.scope);
            serviceWorkerRegistration = existingFCMServiceWorker;
          } else {
            console.log('Registering new service worker');
            serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service worker registered:', serviceWorkerRegistration.scope);
          }
        } catch (error) {
          console.error("Error registering service worker:", error);
        }
      }
      
      // Get token with the proper options
      const tokenOptions: {
        vapidKey: string;
        serviceWorkerRegistration?: ServiceWorkerRegistration;
      } = {
        vapidKey: vapidKey || '',
      };
      
      if (serviceWorkerRegistration) {
        tokenOptions.serviceWorkerRegistration = serviceWorkerRegistration;
      }
      
      const token = await getToken(fcmMessaging, tokenOptions);
      console.log("FCM token obtained:", token ? token.substring(0, 10) + "..." : "null");
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

// Setup foreground message handler
export const setupForegroundMessageHandler = async () => {
  console.log("Setting up foreground message handler");
  const m = await messaging();
  if (!m) return null;

  console.log("Successfully installed foreground message handler");
  
  return onMessage(m, (payload: MessagePayload) => {
    console.log('Foreground message received:', payload);
    
    if (!payload.data && !payload.notification) return;

    if (Notification.permission !== 'granted') {
      console.log('Notification permission not granted, skipping foreground notification');
      return;
    }

    // Extract notification ID to prevent duplicates
    const notificationId = payload.messageId || payload.collapseKey || Date.now().toString();
    
    // Skip if we've already processed this notification
    if (processedNotifications.has(notificationId)) {
      console.log(`Skipping duplicate notification ${notificationId}`);
      return;
    }
    
    // Add to processed set
    processedNotifications.add(notificationId);
    
    // Keep the set small by removing older notifications
    if (processedNotifications.size > 20) {
      const oldestId = processedNotifications.values().next().value;
      processedNotifications.delete(oldestId);
    }

    const deviceIsIOS = isIOS();
    
    // Extract notification data
    const title = payload.notification?.title || payload.data?.title || "New Notification";
    const body = payload.notification?.body || payload.data?.body || "";
    const link = payload.fcmOptions?.link || payload.data?.link || '/';
    const image = payload.data?.image || payload.notification?.image;
    
    // Cast to any to allow for custom notification properties
    // The Notification API accepts these properties but TypeScript definitions are incomplete
    const notificationOptions: any = {
      body,
      // Use exact same icon path as Vite project
      icon: `/ic_stat_barber_1024/res/drawable-xxxhdpi/ic_stat_barber_1024.png`,
      badge: `/ic_stat_barber_1024/res/drawable-xxxhdpi/ic_stat_barber_1024.png`,
      tag: notificationId, // Use tag to prevent duplicates
      data: { 
        url: link,
        notificationId
      },
      requireInteraction: !deviceIsIOS,
      silent: deviceIsIOS, // Keep notifications silent on iOS
      renotify: false
    };

    if (image) {
      notificationOptions.image = image;
    }

    console.log('Creating foreground notification with options:', notificationOptions);
    
    // Create and show the notification
    const notification = new Notification(title, notificationOptions);
    
    // Add click handler directly to the notification
    notification.onclick = function(event) {
      event.preventDefault();
      console.log('Notification clicked, navigating to:', link);
      window.open(link, '_blank');
    };
  });
};

export { app, messaging };
