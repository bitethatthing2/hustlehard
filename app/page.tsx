"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { useEffect, useState } from "react";
import { getActiveSubscriptions, testSupabaseConnection, saveNotificationSubscription } from "@/lib/supabase";
import { useRouter } from "@/lib/router";
import { toast } from "sonner";

export default function Home() {
  const { token, notificationPermissionStatus, isDevelopmentMode } = useFcmToken();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");
  const [notificationStatus, setNotificationStatus] = useState<string>("");
  const [supabaseTestStatus, setSupabaseTestStatus] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [supabaseError, setSupabaseError] = useState<string>("");
  const [notificationResponse, setNotificationResponse] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSubscription() {
      if (token) {
        const subscriptions = await getActiveSubscriptions();
        if (subscriptions.length === 0) {
          setSubscriptionStatus("no-subscriptions");
          return;
        }
        
        // In development mode, consider the subscription saved if we have a token
        if (isDevelopmentMode) {
          setSubscriptionStatus("saved");
          return;
        }
        
        const hasSubscription = subscriptions.some((sub: { endpoint: string }) => sub.endpoint.includes(token));
        setSubscriptionStatus(hasSubscription ? "saved" : "pending");
      }
    }
    checkSubscription();
  }, [token, isDevelopmentMode]);

  const handleTestNotification = async () => {
    if (!token) {
      toast.error("No notification token available");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/send-simple-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          title: "Test Notification",
          message: "This is a test notification",
          link: "/contact",
        }),
      });

      const data = await response.json();
      console.log("Notification API response:", data);
      
      if (data.success) {
        toast.success("Notification sent successfully!");
      } else {
        toast.error(`Failed to send notification: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification. Check console for details.");
    } finally {
      setIsSending(false);
    }
  };

  async function handleTestSupabase() {
    setSupabaseTestStatus("testing");
    setSupabaseError("");
    try {
      const result = await testSupabaseConnection();
      console.log(result);
      setSupabaseTestStatus(result === true ? "success" : "error");
      if (result !== true) {
        setSupabaseError("Failed to connect to Supabase. Check console for details.");
      }
    } catch (error) {
      console.error("Error testing Supabase:", error);
      setSupabaseTestStatus("error");
      setSupabaseError(error instanceof Error ? error.message : "Unknown error");
    }
  }

  async function handleRetrySaveSubscription() {
    if (!token) {
      setSubscriptionStatus("no-token");
      return;
    }
    
    setSubscriptionStatus("saving");
    try {
      // Get the service worker registration
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        setSubscriptionStatus("no-subscription");
        return;
      }
      
      // Save to Supabase
      const result = await saveNotificationSubscription(subscription, navigator.userAgent);
      
      if (result) {
        setSubscriptionStatus("saved");
      } else {
        setSubscriptionStatus("error");
        setSupabaseError("Failed to save subscription to Supabase. Check console for details.");
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
      setSubscriptionStatus("error");
      setSupabaseError(error instanceof Error ? error.message : "Unknown error");
    }
  }

  const navigateToContact = () => {
    router.navigate("/contact");
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>

      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Notification Status</h2>
        
        {notificationPermissionStatus === "granted" ? (
          <p className="text-green-600">✅ Permission to receive notifications has been granted.</p>
        ) : notificationPermissionStatus === "denied" ? (
          <p className="text-red-600">
            ❌ You have denied permission to receive notifications. Please
            enable notifications in your browser settings.
          </p>
        ) : notificationPermissionStatus === "default" ? (
          <p className="text-yellow-600">
            ⚠️ You haven't decided about notifications yet. Click the button below to enable them.
          </p>
        ) : (
          <p className="text-gray-600">Loading notification permission status...</p>
        )}
        
        {token ? (
          <p className="mt-2 text-green-600">✅ FCM Token obtained successfully.</p>
        ) : (
          <p className="mt-2 text-red-600">❌ No FCM token available. Notifications won't work.</p>
        )}
        
        {isDevelopmentMode && (
          <p className="mt-2 text-blue-600">
            ℹ️ Running in development mode. Notifications will be simulated.
          </p>
        )}
      </div>

      <Button
        disabled={!token || isSending}
        className="mt-5"
        onClick={handleTestNotification}
      >
        {isSending ? "Sending..." : "Send Test Notification"}
      </Button>
      
      <div className="mt-8 text-sm text-gray-600">
        <p>
          When you click the button above, a notification will be sent to your device.
          If the app is in the background, you'll see a system notification.
          If the app is in the foreground, you'll see a toast notification.
        </p>
      </div>
    </main>
  );
}
