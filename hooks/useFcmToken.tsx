"use client";

import { useEffect, useRef, useState } from "react";
import { getToken, onMessage, Unsubscribe } from "firebase/messaging";
import { fetchToken, messaging } from "@/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveNotificationSubscription } from "@/lib/supabase";

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

const useFcmToken = () => {
  const router = useRouter(); // Initialize the router for navigation.
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false); // State to track if we're using development mode
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.

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

      console.log(`onMessage registered with token ${token}`);
      const m = await messaging();
      if (!m) return;

      // Step 9: Register a listener for incoming FCM messages.
      const unsubscribe = onMessage(m, (payload) => {
        if (Notification.permission !== "granted") return;

        console.log("Foreground push notification received:", payload);
        const link = payload.fcmOptions?.link || payload.data?.link;

        if (link) {
          toast.info(
            `${payload.notification?.title}: ${payload.notification?.body}`,
            {
              action: {
                label: "Visit",
                onClick: () => {
                  const link = payload.fcmOptions?.link || payload.data?.link;
                  if (link) {
                    router.push(link);
                  }
                },
              },
            }
          );
        } else {
          toast.info(
            `${payload.notification?.title}: ${payload.notification?.body}`
          );
        }
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    // Step 11: Cleanup the listener when the component unmounts.
    return () => unsubscribe?.();
  }, [token, router, toast]);

  return { token, notificationPermissionStatus, isDevelopmentMode }; // Return the token, permission status, and development mode flag.
};

export default useFcmToken;
