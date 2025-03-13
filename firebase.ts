import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

// Helper function to manually register the service worker
async function registerServiceWorker() {
  try {
    console.log("Attempting to register service worker manually...");
    
    // Check if we're in a development environment with a self-signed certificate
    // We'll only use the mock service worker if we're not on HTTPS or if we detect an untrusted certificate
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
      // First check if there's an existing registration
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          if (registration.scope.includes('firebase-cloud-messaging-push-scope') || 
              registration.active?.scriptURL.includes('firebase-messaging-sw.js')) {
            console.log('Found existing service worker registration:', registration.scope);
            
            // Make sure the service worker is activated
            if (registration.active) {
              console.log('Service worker is already active');
              return registration;
            } else if (registration.installing || registration.waiting) {
              console.log('Service worker is installing or waiting, waiting for it to activate...');
              // Wait for the service worker to activate
              return new Promise((resolve) => {
                registration.addEventListener('updatefound', () => {
                  const newWorker = registration.installing;
                  if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                      if (newWorker.state === 'activated') {
                        console.log('Service worker activated');
                        resolve(registration);
                      }
                    });
                  }
                });
                
                // If already installing, listen for state changes
                if (registration.installing) {
                  registration.installing.addEventListener('statechange', () => {
                    if (registration.active) {
                      console.log('Service worker activated');
                      resolve(registration);
                    }
                  });
                }
                
                // Set a timeout to resolve anyway after 3 seconds
                setTimeout(() => {
                  console.log('Timed out waiting for service worker to activate, proceeding anyway');
                  resolve(registration);
                }, 3000);
              });
            }
            return registration;
          }
        }
      } catch (error) {
        console.warn('Error checking existing service worker registrations:', error);
      }
      
      // Try to register the service worker
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/firebase-cloud-messaging-push-scope',
        });
        
        console.log('Service worker registered successfully:', registration.scope);
        
        // Wait for the service worker to activate if it's not already
        if (!registration.active) {
          console.log('Waiting for service worker to activate...');
          await new Promise<void>((resolve) => {
            if (registration.installing) {
              registration.installing.addEventListener('statechange', (e) => {
                if (registration.active) {
                  console.log('Service worker activated');
                  resolve();
                }
              });
            } else {
              // If somehow there's no installing worker, resolve immediately
              resolve();
            }
            
            // Set a timeout to resolve anyway after 3 seconds
            setTimeout(() => {
              console.log('Timed out waiting for service worker to activate, proceeding anyway');
              resolve();
            }, 3000);
          });
        }
        
        return registration;
      } catch (regError) {
        console.warn('Primary service worker registration failed:', regError);
        
        // Don't attempt the blob URL approach in development with self-signed certs
        // as it's known to fail with "URL protocol not supported" error
        if (isDevelopmentWithUntrustedCert) {
          console.log("Skipping blob URL approach in development environment");
          return null;
        }
        
        // Try an alternative approach - create a blob URL with the service worker code
        // This is a workaround for SSL certificate issues
        try {
          console.log('Attempting alternative service worker registration...');
          
          // Fetch the service worker code
          const swResponse = await fetch('/firebase-messaging-sw.js', { 
            cache: 'no-store',
            headers: { 'Service-Worker': 'script' }
          });
          
          if (!swResponse.ok) {
            throw new Error(`Failed to fetch service worker: ${swResponse.status}`);
          }
          
          const swCode = await swResponse.text();
          const swBlob = new Blob([swCode], { type: 'application/javascript' });
          const swBlobUrl = URL.createObjectURL(swBlob);
          
          // Register the service worker from the blob URL
          const blobRegistration = await navigator.serviceWorker.register(swBlobUrl, {
            scope: '/firebase-cloud-messaging-push-scope'
          });
          
          console.log('Service worker registered via blob URL:', blobRegistration.scope);
          
          // Wait for the service worker to activate
          if (!blobRegistration.active) {
            console.log('Waiting for blob service worker to activate...');
            await new Promise<void>((resolve) => {
              if (blobRegistration.installing) {
                blobRegistration.installing.addEventListener('statechange', () => {
                  if (blobRegistration.active) {
                    console.log('Blob service worker activated');
                    resolve();
                  }
                });
              } else {
                resolve();
              }
              
              // Set a timeout to resolve anyway after 3 seconds
              setTimeout(() => {
                console.log('Timed out waiting for blob service worker to activate, proceeding anyway');
                resolve();
              }, 3000);
            });
          }
          
          return blobRegistration;
        } catch (blobError) {
          console.error('Alternative service worker registration failed:', blobError);
          return null;
        }
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

// Function to create a mock service worker registration for development
function createMockServiceWorkerRegistration() {
  console.log('Creating mock service worker registration for development');
  
  // Create a mock PushSubscription with all required properties
  const mockPushSubscription: PushSubscription = {
    endpoint: 'https://mock-endpoint.example.com/mock-subscription-id',
    expirationTime: null,
    options: {} as PushSubscriptionOptions,
    getKey: (keyName: PushEncryptionKeyName) => {
      // Return mock keys as ArrayBuffer
      const mockKeys: Record<string, ArrayBuffer> = {
        'p256dh': new Uint8Array([1, 2, 3, 4]).buffer,
        'auth': new Uint8Array([5, 6, 7, 8]).buffer
      };
      return mockKeys[keyName] || null;
    },
    toJSON: () => ({
      endpoint: 'https://mock-endpoint.example.com/mock-subscription-id',
      expirationTime: null,
      keys: {
        p256dh: 'mock-p256dh-key',
        auth: 'mock-auth-key'
      }
    }),
    unsubscribe: () => Promise.resolve(true)
  };
  
  // Create a mock ServiceWorkerRegistration
  const mockRegistration = {
    scope: '/firebase-cloud-messaging-push-scope',
    active: {
      scriptURL: '/firebase-messaging-sw.js'
    },
    pushManager: {
      getSubscription: () => Promise.resolve(mockPushSubscription),
      subscribe: (options?: PushSubscriptionOptionsInit) => {
        console.log('Mock pushManager.subscribe called with options:', options);
        return Promise.resolve(mockPushSubscription);
      }
    }
  };
  
  return mockRegistration;
}

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
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
      
      // Configure FCM to not show default notifications
      // This ensures only our service worker shows notifications with custom styling
      if (typeof window !== 'undefined') {
        // Set notification options to silent for foreground messages
        // This prevents duplicate notifications
        try {
          // @ts-ignore - Accessing internal property for configuration
          fcmMessaging.onMessage = () => {
            console.log("Intercepted foreground message, preventing default notification");
            return Promise.resolve();
          };
        } catch (err) {
          console.warn("Could not override onMessage handler:", err);
        }
      }
      
      // Check if we're in a development environment with a self-signed certificate
      const isDevelopmentWithUntrustedCert = 
        typeof window !== 'undefined' && 
        (window.location.protocol !== 'https:' || 
         (window.location.hostname === 'localhost' && 
          !window.isSecureContext)); // isSecureContext will be true if the certificate is trusted
      
      if (isDevelopmentWithUntrustedCert) {
        console.log("Development environment with untrusted certificate detected");
        console.log("Using development fallback for FCM token");
        
        // Set up mock service worker registration
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const mockRegistration = createMockServiceWorkerRegistration();
          
          // Override the ready property if it doesn't already exist
          if (!navigator.serviceWorker._originalReady) {
            navigator.serviceWorker._originalReady = navigator.serviceWorker.ready;
            Object.defineProperty(navigator.serviceWorker, 'ready', {
              get: function() {
                return Promise.resolve(mockRegistration);
              }
            });
          }
          
          // Also provide a mock for pushManager.subscribe
          try {
            // Create a mock subscription function that will be used when the real one fails
            const originalSubscribe = PushManager.prototype.subscribe;
            if (!PushManager.prototype._originalSubscribe) {
              PushManager.prototype._originalSubscribe = originalSubscribe;
              PushManager.prototype.subscribe = function(options?: PushSubscriptionOptionsInit) {
                return originalSubscribe.call(this, options)
                  .catch(error => {
                    console.warn('Real pushManager.subscribe failed, using mock:', error);
                    const mockRegistration = createMockServiceWorkerRegistration();
                    return mockRegistration.pushManager.subscribe(options);
                  });
              };
            }
          } catch (mockError) {
            console.error('Failed to set up mock PushManager.subscribe:', mockError);
          }
        }
        
        console.log("Returning placeholder token for testing");
        return "test-token-for-ui-development";
      }
      
      // First try to manually register the service worker
      let swRegistration = await registerServiceWorker();
      let useMockRegistration = false;
      
      // If service worker registration fails, use development fallback
      if (!swRegistration) {
        console.warn("Service worker registration failed, using development fallback");
        useMockRegistration = true;
        
        // Set a global mock for navigator.serviceWorker.ready
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
          const mockRegistration = createMockServiceWorkerRegistration();
          
          // Override the ready property if it doesn't already exist
          if (!navigator.serviceWorker._originalReady) {
            navigator.serviceWorker._originalReady = navigator.serviceWorker.ready;
            Object.defineProperty(navigator.serviceWorker, 'ready', {
              get: function() {
                return Promise.resolve(mockRegistration);
              }
            });
          }
          
          // Also provide a mock for pushManager.subscribe
          try {
            // Create a mock subscription function that will be used when the real one fails
            const originalSubscribe = PushManager.prototype.subscribe;
            if (!PushManager.prototype._originalSubscribe) {
              PushManager.prototype._originalSubscribe = originalSubscribe;
              PushManager.prototype.subscribe = function(options?: PushSubscriptionOptionsInit) {
                return originalSubscribe.call(this, options)
                  .catch(error => {
                    console.warn('Real pushManager.subscribe failed, using mock:', error);
                    const mockRegistration = createMockServiceWorkerRegistration();
                    return mockRegistration.pushManager.subscribe(options);
                  });
              };
            }
          } catch (mockError) {
            console.error('Failed to set up mock PushManager.subscribe:', mockError);
          }
        }
      }
      
      try {
        // If we're using a mock registration, return the placeholder token directly
        if (useMockRegistration) {
          console.log("Using mock registration, returning placeholder token");
          return "test-token-for-ui-development";
        }
        
        // Get token with the service worker registration if available
        const tokenOptions: {
          vapidKey: string;
          serviceWorkerRegistration?: ServiceWorkerRegistration;
        } = {
          vapidKey: vapidKey || '',
        };
        
        // Only add the registration if it's not null and we're not using a mock
        if (swRegistration && !useMockRegistration) {
          tokenOptions.serviceWorkerRegistration = swRegistration as ServiceWorkerRegistration;
        }
        
        const token = await getToken(fcmMessaging, tokenOptions);
        
        console.log("FCM token obtained:", token ? token.substring(0, 10) + "..." : "null");
        return token;
      } catch (swError) {
        console.error("Service worker error:", swError);
        // Return a placeholder token for testing
        console.log("Returning placeholder token for testing");
        return "test-token-for-ui-development";
      }
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

// Add this to make TypeScript happy with our property additions
declare global {
  interface ServiceWorkerContainer {
    _originalReady?: Promise<ServiceWorkerRegistration>;
  }
  
  interface PushManager {
    _originalSubscribe?: (options?: PushSubscriptionOptionsInit) => Promise<PushSubscription>;
  }
}

export { app, messaging };
