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

// Keep track of shown notifications to prevent duplicates
const shownNotifications = new Map<string, number>();
const NOTIFICATION_TIMEOUT = 5000; // 5 seconds

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
      
      // Add more detailed console logs for debugging
      console.log("VAPID Key Environment Variable:", vapidKey);
      console.log("All environment variables:", Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));
      
      // Add console log for debugging
      console.log("Attempting to get FCM token with VAPID key:", 
        vapidKey ? "Key exists (length: " + vapidKey.length + ")" : "Key missing");
      
      // Check if we're in a development environment with a self-signed certificate
      const isDevelopmentWithUntrustedCert = 
        typeof window !== 'undefined' && 
        (window.location.protocol !== 'https:' || 
         (window.location.hostname === 'localhost' && 
          !window.isSecureContext)); // isSecureContext will be true if the certificate is trusted
      
      if (isDevelopmentWithUntrustedCert) {
        console.log("Development environment with untrusted certificate detected");
        console.log("Using development fallback for FCM token");
        return "test-token-for-ui-development";
      }
      
      // Register service worker if needed
      let swRegistration = null;
      if ('serviceWorker' in navigator) {
        try {
          swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            scope: '/firebase-cloud-messaging-push-scope',
          });
          console.log('Service worker registered successfully:', swRegistration.scope);
        } catch (error) {
          console.error("Error registering service worker:", error);
        }
      }
      
      // Get token with the service worker registration if available
      const tokenOptions: {
        vapidKey: string;
        serviceWorkerRegistration?: ServiceWorkerRegistration;
      } = {
        vapidKey: vapidKey || '',
      };
      
      // Only add the registration if it's not null
      if (swRegistration) {
        tokenOptions.serviceWorkerRegistration = swRegistration;
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
  const m = await messaging();
  if (!m) return null;

  return onMessage(m, (payload: MessagePayload) => {
    console.log('Foreground message received:', payload);
    
    if (!payload.data && !payload.notification) return;

    const deviceIsIOS = isIOS();
    
    if (Notification.permission === 'granted') {
      // For iOS use notification payload, for Android prioritize data payload
      const title = deviceIsIOS 
        ? (payload.notification?.title || 'New Notification')
        : (payload.data?.title || payload.notification?.title || 'New Notification');
      
      const body = deviceIsIOS 
        ? (payload.notification?.body || '')
        : (payload.data?.body || payload.notification?.body || '');
      
      // Generate a unique ID for the notification
      const notificationId = payload.collapseKey || `${Date.now()}`;
      
      // Check if we've shown this notification recently
      const lastShownTime = shownNotifications.get(notificationId);
      const currentTime = Date.now();
      
      if (lastShownTime && currentTime - lastShownTime < NOTIFICATION_TIMEOUT) {
        console.log('Skipping duplicate notification:', notificationId);
        return;
      }
      
      // Update the shown notifications map
      shownNotifications.set(notificationId, currentTime);
      
      // Clean up old notifications from the map
      for (const [id, time] of shownNotifications.entries()) {
        if (currentTime - time > NOTIFICATION_TIMEOUT) {
          shownNotifications.delete(id);
        }
      }
      
      // Extract link from payload
      const notificationLink = deviceIsIOS 
        ? (payload.data?.link || payload.fcmOptions?.link || '/')
        : (payload.data?.link || '/');

      console.log('Notification link:', notificationLink);
      
      const notificationOptions = {
        body: body,
        icon: deviceIsIOS 
          ? '/icons/mipmap-xxxhdpi/ic_launcher.png'
          : (payload.data?.image || payload.notification?.image || '/icons/mipmap-xxxhdpi/ic_launcher.png'),
        badge: '/icons/icon-72x72.png',
        tag: notificationId,
        data: deviceIsIOS ? {
          ...payload.notification,
          timestamp: currentTime,
          link: notificationLink,
          imageUrl: payload.notification?.image
        } : {
          ...payload.data,
          timestamp: currentTime,
          link: notificationLink,
          imageUrl: payload.data?.image || payload.notification?.image
        },
        ...((!deviceIsIOS && payload.notification?.image) && {
          image: payload.notification.image
        }),
        requireInteraction: true,
        silent: deviceIsIOS, // Keep notifications silent on iOS
        renotify: false,
        actions: deviceIsIOS ? [] : undefined
      };

      console.log('Creating notification with options:', notificationOptions);
      
      // Create and show the notification
      const notification = new Notification(title, notificationOptions);
      
      // Add click handler directly to the notification
      notification.onclick = function(event) {
        event.preventDefault(); // Prevent the browser from focusing the Notification's tab
        console.log('Notification clicked, navigating to:', notificationOptions.data.link);
        window.open(notificationOptions.data.link, '_blank');
      };
    }
  });
};

// Helper function to manually register the service worker
async function registerServiceWorker() {
  try {
    console.log("Attempting to register service worker manually...");
    
    // Check if we're in a development environment with a self-signed certificate
    const isDevelopmentWithUntrustedCert = 
      typeof window !== 'undefined' && 
      (window.location.protocol !== 'https:' || 
       (window.location.hostname === 'localhost' && 
        !window.isSecureContext)); // isSecureContext will be true if the certificate is trusted
    
    if (isDevelopmentWithUntrustedCert) {
      console.log("Development environment with untrusted certificate detected");
      console.log("Using mock service worker registration for development");
      return null; // This will trigger the mock registration fallback
    }
    
    // If we're on HTTPS with a trusted certificate, proceed with normal registration
    console.log("Secure context detected, proceeding with normal service worker registration");
    
    if ('serviceWorker' in navigator) {
      // Try to register the service worker
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope',
        });
        
        console.log('Service worker registered successfully:', registration.scope);
        return registration;
      } catch (regError) {
        console.warn('Service worker registration failed:', regError);
        return null;
      }
    } else {
      console.warn('Service workers are not supported in this browser');
      return null;
    }
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
}

export { app, messaging };
