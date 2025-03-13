importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Extract notification data from payload
  const notificationTitle = payload.notification.title || "New Notification";
  const notificationBody = payload.notification.body || "You have a new notification";
  
  // Get link from various possible locations using our utility function
  const link = getNotificationUrl(payload);
  
  // Get icon from payload or use default
  const icon = payload.notification.icon || "./icon-192x192.png";
  const badge = payload.notification.badge || "./badge-72x72.png";
  
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
  const url = event.notification.data.url || "/";
  
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
      icon: "./icon-192x192.png",
      badge: "./badge-72x72.png",
      data: {
        url: getNotificationUrl(data)
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (error) {
    console.error('[firebase-messaging-sw.js] Error handling push:', error);
  }
});
