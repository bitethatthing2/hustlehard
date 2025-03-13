"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { useEffect, useState } from "react";
import { getActiveSubscriptions, testSupabaseConnection, saveNotificationSubscription } from "@/lib/supabase";
import { useRouter } from "@/lib/router";

export default function Home() {
  const { token, notificationPermissionStatus, isDevelopmentMode } = useFcmToken();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");
  const [notificationStatus, setNotificationStatus] = useState<string>("");
  const [supabaseTestStatus, setSupabaseTestStatus] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [supabaseError, setSupabaseError] = useState<string>("");
  const [notificationResponse, setNotificationResponse] = useState<any>(null);
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
    try {
      setNotificationStatus("sending");
      setNotificationResponse(null);
      
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          title: "Test Notification",
          message: `This is a test notification for ${selectedPlatform === "all" ? "all platforms" : selectedPlatform}`,
          link: "/contact",
          platform: selectedPlatform
        }),
      });

      const data = await response.json();
      console.log("Notification response:", data);
      setNotificationResponse(data);
      
      if (data.success) {
        setNotificationStatus("sent");
      } else {
        setNotificationStatus("error");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationStatus("error");
      setNotificationResponse({ error: error instanceof Error ? error.message : "Unknown error" });
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

      <div className="space-y-4">
        {notificationPermissionStatus === "granted" ? (
          <div>
            <p className="text-green-600">✅ Permission to receive notifications has been granted.</p>
            {isDevelopmentMode && (
              <p className="text-yellow-600">⚠️ Running in development mode with mock service worker due to SSL certificate issues.</p>
            )}
            {subscriptionStatus === "saved" && (
              <p className="text-green-600">✅ Subscription saved to database.</p>
            )}
            {subscriptionStatus === "pending" && (
              <p className="text-yellow-600">⏳ Saving subscription...</p>
            )}
            {subscriptionStatus === "error" && (
              <p className="text-red-600">❌ Error saving subscription. {supabaseError}</p>
            )}
            {subscriptionStatus === "no-subscriptions" && (
              <p className="text-yellow-600">⚠️ No subscriptions found in database.</p>
            )}
          </div>
        ) : notificationPermissionStatus !== null ? (
          <p className="text-red-600">
            ❌ You have not granted permission to receive notifications. Please
            enable notifications in your browser settings.
          </p>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="platform-select" className="text-sm font-medium">
            Select Platform:
          </label>
          <select 
            id="platform-select"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="p-2 border rounded-md w-48"
            aria-label="Select platform for notification"
          >
            <option value="all">All Platforms</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="web">Web</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <Button
            disabled={!token || notificationStatus === "sending" || (!isDevelopmentMode && subscriptionStatus !== "saved")}
            onClick={handleTestNotification}
          >
            {notificationStatus === "sending" ? "Sending..." : `Send ${selectedPlatform === "all" ? "All" : selectedPlatform} Notification`}
          </Button>

          <Button
            variant="outline"
            onClick={navigateToContact}
          >
            Go to Contact Page
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleTestSupabase}
            disabled={supabaseTestStatus === "testing"}
          >
            {supabaseTestStatus === "testing" ? "Testing..." : "Test Supabase Connection"}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleRetrySaveSubscription}
            disabled={!token || subscriptionStatus === "saving"}
          >
            {subscriptionStatus === "saving" ? "Saving..." : "Retry Save Subscription"}
          </Button>
        </div>
        
        {notificationStatus === "sent" && (
          <p className="text-green-600 mt-2">✅ Notification sent successfully!</p>
        )}
        {notificationStatus === "error" && (
          <p className="text-red-600 mt-2">❌ Error sending notification. Check console for details.</p>
        )}
        
        {notificationResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-medium mb-2">Notification Response:</h3>
            <pre className="text-xs overflow-auto max-h-40">
              {JSON.stringify(notificationResponse, null, 2)}
            </pre>
          </div>
        )}
        
        {supabaseTestStatus === "success" && (
          <p className="text-green-600 mt-2">✅ Supabase connection successful!</p>
        )}
        {supabaseTestStatus === "error" && (
          <p className="text-red-600 mt-2">❌ Error connecting to Supabase. Check console for details.</p>
        )}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Firebase Cloud Messaging Demo with Next.js 14
        </p>
      </div>
    </main>
  );
}
