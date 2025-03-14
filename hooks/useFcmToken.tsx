"use client";

import { useEffect, useRef, useState } from "react";
import { fetchToken, setupForegroundMessageHandler, isIOS } from "@/firebase";
import { toast } from "sonner";

async function getNotificationPermissionAndToken() {
  // Check if Notifications are supported in the browser
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return { token: null, isDevelopmentMode: false };
  }

  // Check if permission is already granted
  if (Notification.permission === "granted") {
    console.log("Notification permission already granted");
    const token = await fetchToken();
    
    // Check if we're using a development token
    const isDevelopmentMode = token === "test-token-for-ui-development";
    
    return { token, isDevelopmentMode };
  }

  // If permission is not denied, request permission from the user
  if (Notification.permission !== "denied") {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted");
      const token = await fetchToken();
      
      // Check if we're using a development token
      const isDevelopmentMode = token === "test-token-for-ui-development";
      
      return { token, isDevelopmentMode };
    }
  }

  console.log("Notification permission not granted.");
  return { token: null, isDevelopmentMode: false };
}

const useFcmToken = () => {
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false); // Track if we're using development mode
  const retryLoadToken = useRef(0); // Ref to track retry attempts
  const isLoading = useRef(false); // Ref to track if token fetch is in progress
  const messageHandlerRef = useRef<any>(null); // Ref to track the message handler

  const loadToken = async () => {
    // Prevent multiple fetches if already in progress
    if (isLoading.current) return;

    isLoading.current = true; // Mark as in progress
    const { token, isDevelopmentMode } = await getNotificationPermissionAndToken();

    // Handle permission denied
    if (Notification.permission === "denied") {
      setNotificationPermissionStatus("denied");
      console.info("Push Notifications permission denied");
      isLoading.current = false;
      return;
    }

    // Retry fetching token if necessary (up to 3 times)
    if (!token) {
      if (retryLoadToken.current >= 3) {
        toast.error("Unable to initialize notifications");
        console.info("Push Notifications initialization failed after 3 retries");
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error("Retrying token fetch..., attempt:", retryLoadToken.current);
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Set token and status
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    setIsDevelopmentMode(isDevelopmentMode);
    
    // Show development mode toast
    if (isDevelopmentMode) {
      toast.info(
        "Using development mode for notifications due to SSL certificate issues. This is expected in local development.",
        { duration: 6000 }
      );
    }
    
    isLoading.current = false;
  };

  useEffect(() => {
    // Initialize token loading when component mounts
    if ("Notification" in window) {
      const deviceIsIOS = isIOS();
      if (!deviceIsIOS) {
        // Non-iOS devices request permission immediately
        loadToken();
      } else {
        // For iOS, defer permission request until user interaction
        console.log("iOS detected, deferring permission request until user interaction");
      }
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available

      console.log(`Setting up foreground message handler with token ${token}`);
      
      // Set up foreground message handler
      const unsubscribe = await setupForegroundMessageHandler();
      
      if (unsubscribe) {
        messageHandlerRef.current = unsubscribe;
      }
    };

    setupListener();

    // Cleanup the listener when component unmounts
    return () => {
      if (messageHandlerRef.current) {
        messageHandlerRef.current();
      }
    };
  }, [token]);

  // Function to request notification permission (for iOS)
  const requestNotificationPermission = async () => {
    console.log("User initiated notification permission request");
    await loadToken();
  };

  return { 
    token, 
    notificationPermissionStatus, 
    isDevelopmentMode,
    requestNotificationPermission 
  };
};

export default useFcmToken;
