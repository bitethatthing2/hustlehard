"use client";

import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe, MessagePayload } from "firebase/messaging";
import { fetchToken, messaging, setupForegroundMessageHandler } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveNotificationSubscription } from "@/lib/supabase";

// Keep track of notifications to prevent duplicates
const processedNotifications = new Set<string>();

// Track the last notification timestamp to prevent duplicates that arrive within a short time window
let lastNotificationTimestamp = 0;
const NOTIFICATION_DEBOUNCE_MS = 1000; // 1 second debounce

async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return { token: null, isDevelopmentMode: false };
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === "granted") {
    console.log("Notification permission already granted");
    const token = await fetchToken();
    
    // Check if we're using a development token
    const isDevelopmentMode = token === "test-token-for-ui-development";
    
    if (token) {
      console.log("FCM Token obtained:", token);
      try {
        // Save subscription to Supabase
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker ready");
        const subscription = await registration.pushManager.getSubscription();
        console.log("Push Subscription:", subscription);
        if (subscription) {
          console.log("Attempting to save subscription to Supabase...");
          const result = await saveNotificationSubscription(subscription, navigator.userAgent);
          console.log("Supabase save result:", result);
        } else {
          console.log("No subscription found");
        }
      } catch (error) {
        console.error("Error saving subscription:", error);
      }
    }
    return { token, isDevelopmentMode };
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== "denied") {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted");
      const token = await fetchToken();
      
      // Check if we're using a development token
      const isDevelopmentMode = token === "test-token-for-ui-development";
      
      if (token) {
        console.log("FCM Token obtained:", token);
        try {
          // Save subscription to Supabase
          const registration = await navigator.serviceWorker.ready;
          console.log("Service Worker ready");
          const subscription = await registration.pushManager.getSubscription();
          console.log("Push Subscription:", subscription);
          if (subscription) {
            console.log("Attempting to save subscription to Supabase...");
            const result = await saveNotificationSubscription(subscription, navigator.userAgent);
            console.log("Supabase save result:", result);
          } else {
            console.log("No subscription found");
          }
        } catch (error) {
          console.error("Error saving subscription:", error);
        }
      }
      return { token, isDevelopmentMode };
    }
  }

  console.log("Notification permission not granted.");
  return { token: null, isDevelopmentMode: false };
}

// Helper function to check if a notification is a duplicate
function isDuplicateNotification(payload: MessagePayload): boolean {
  // Create a notification ID based on content and timestamp
  const notificationId = `${payload.notification?.title || ''}-${Date.now()}`;
  
  // Check if we've already processed this notification
  if (processedNotifications.has(notificationId)) {
    console.log("Duplicate notification prevented (already in set):", notificationId);
    return true;
  }
  
  // Check if this notification arrived too soon after the last one
  const now = Date.now();
  if (now - lastNotificationTimestamp < NOTIFICATION_DEBOUNCE_MS) {
    console.log("Duplicate notification prevented (debounce):", notificationId);
    return true;
  }
  
  // Update the last notification timestamp
  lastNotificationTimestamp = now;
  
  // Add to processed notifications
  processedNotifications.add(notificationId);
  
  // Clean up processed notifications (keep only last 10)
  if (processedNotifications.size > 10) {
    const iterator = processedNotifications.values();
    processedNotifications.delete(iterator.next().value);
  }
  
  return false;
}

const useFcmToken = () => {
  const router = useRouter(); // Initialize the router for navigation.
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false); // State to track if we're using development mode
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.
  const messageHandlerRef = useRef<Unsubscribe | null>(null); // Ref to keep track of the message handler

  const loadToken = async () => {
    // Step 4: Prevent multiple fetches if already fetched or in progress.
    if (isLoading.current) return;

    isLoading.current = true; // Mark loading as in progress.
    const { token, isDevelopmentMode } = await getNotificationPermissionAndToken(); // Fetch the token.

    // Step 5: Handle the case where permission is denied.
    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info(
        "%cPush Notifications issue - permission denied",
        "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
      );
      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    // This step is typical initially as the service worker may not be ready/installed yet.
    if (!token) {
      if (retryLoadToken.current >= 3) {
        toast.error("Unable to load notification token. Some features may not work correctly.");
        console.info(
          "%cPush Notifications issue - unable to load token after 3 retries",
          "color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("An error occurred while retrieving token. Retrying...");
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Step 7: Set the fetched token and mark as fetched.
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    setIsDevelopmentMode(isDevelopmentMode);
    
    // Show a toast if we're in development mode
    if (isDevelopmentMode) {
      toast.info(
        "Using development mode for notifications due to SSL certificate issues. This is expected in local development.",
        { duration: 6000 }
      );
    }
    
    isLoading.current = false;
  };

  useEffect(() => {
    // Step 8: Initialize token loading when the component mounts.
    if ("Notification" in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available.

      console.log(`Setting up foreground message handler with token ${token}`);
      
      // Use the new setupForegroundMessageHandler function
      const unsubscribe = await setupForegroundMessageHandler();
      
      if (unsubscribe) {
        messageHandlerRef.current = unsubscribe;
      }
    };

    setupListener();

    // Step 11: Cleanup the listener when the component unmounts.
    return () => {
      if (messageHandlerRef.current) {
        messageHandlerRef.current();
      }
    };
  }, [token]);

  return { token, notificationPermissionStatus, isDevelopmentMode }; // Return the token, permission status, and development mode flag.
};

export default useFcmToken;
