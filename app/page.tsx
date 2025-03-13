"use client";

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { useEffect, useState } from "react";
import { getActiveSubscriptions } from "@/lib/supabase";

export default function Home() {
  const { token, notificationPermissionStatus } = useFcmToken();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");
  const [notificationStatus, setNotificationStatus] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  useEffect(() => {
    async function checkSubscription() {
      if (token) {
        const subscriptions = await getActiveSubscriptions();
        const hasSubscription = subscriptions.some(sub => sub.endpoint.includes(token));
        setSubscriptionStatus(hasSubscription ? "saved" : "pending");
      }
    }
    checkSubscription();
  }, [token]);

  const handleTestNotification = async () => {
    try {
      setNotificationStatus("sending");
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
      
      if (data.success) {
        setNotificationStatus("sent");
      } else {
        setNotificationStatus("error");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationStatus("error");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>

      <div className="space-y-4">
        {notificationPermissionStatus === "granted" ? (
          <div>
            <p className="text-green-600">✅ Permission to receive notifications has been granted.</p>
            {subscriptionStatus === "saved" && (
              <p className="text-green-600">✅ Subscription saved to database.</p>
            )}
            {subscriptionStatus === "pending" && (
              <p className="text-yellow-600">⏳ Saving subscription...</p>
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
          >
            <option value="all">All Platforms</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="web">Web</option>
          </select>
        </div>

        <Button
          disabled={!token || notificationStatus === "sending"}
          className="mt-2"
          onClick={handleTestNotification}
        >
          {notificationStatus === "sending" ? "Sending..." : `Send ${selectedPlatform === "all" ? "All" : selectedPlatform} Notification`}
        </Button>
        
        {notificationStatus === "sent" && (
          <p className="text-green-600 mt-2">✅ Notification sent successfully!</p>
        )}
        {notificationStatus === "error" && (
          <p className="text-red-600 mt-2">❌ Error sending notification. Check console for details.</p>
        )}
      </div>
    </main>
  );
}
