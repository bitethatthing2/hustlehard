import { NextResponse } from "next/server";
import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getActiveSubscriptions } from "@/lib/supabase";

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  // Handle the private key properly for Netlify
  const privateKey = process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") 
    : undefined;

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

// Define result types
type NotificationResult = {
  success: boolean;
  sent: number;
  failed: number;
  details: Array<{
    token?: string;
    platform: string;
    status: string;
    error?: string;
  }>;
};

export async function POST(request: Request) {
  try {
    const { token, title, message, link, platform, sendToAll = false } = await request.json();

    // Validate required fields
    if (!token && !sendToAll) {
      return NextResponse.json(
        { error: "Either token or sendToAll must be provided" },
        { status: 400 }
      );
    }

    // Check if Firebase Admin is initialized
    if (getApps().length === 0) {
      return NextResponse.json(
        { error: "Firebase Admin is not initialized. Check server logs for details." },
        { status: 500 }
      );
    }

    const messaging = getMessaging();
    const results: NotificationResult = { success: false, sent: 0, failed: 0, details: [] };

    // Base notification payload
    const basePayload = {
      notification: {
        title: title || "New Notification",
        body: message || "You have a new notification",
      },
      data: {
        link: link || "/",
      },
    };

    // Platform-specific payloads
    const androidPayload = {
      token,
      notification: basePayload.notification,
      data: basePayload.data,
      android: {
        notification: {
          icon: "notification_icon", // Custom icon name in Android resources
          color: "#4CAF50", // Custom color for Android
          channelId: "default", // Android notification channel
          priority: "high" as const, // High priority for Android
          clickAction: "FLUTTER_NOTIFICATION_CLICK", // Standard action for handling clicks
        },
        priority: "high" as const,
      },
    };

    const iosPayload = {
      token,
      notification: basePayload.notification,
      data: basePayload.data,
      apns: {
        headers: {
          "apns-priority": "10", // High priority
        },
        payload: {
          aps: {
            alert: {
              title: basePayload.notification.title,
              body: basePayload.notification.body,
            },
            sound: "default",
            badge: 1,
            "mutable-content": 1,
            "content-available": 1,
            category: "NEW_MESSAGE", // iOS notification category
          },
        },
      },
    };

    const webPayload = {
      token,
      notification: basePayload.notification,
      data: basePayload.data,
      webpush: {
        notification: {
          icon: "/icon-192x192.png", // Web notification icon
          badge: "/badge-72x72.png", // Web notification badge
          vibrate: [100, 50, 100], // Vibration pattern
          actions: [
            {
              action: "open_url",
              title: "View",
            },
          ],
          requireInteraction: true, // Notification won't auto-dismiss
        },
        fcmOptions: {
          link: basePayload.data.link,
        },
      },
    };

    // Send to all registered devices
    if (sendToAll) {
      try {
        // Get all active subscriptions from Supabase
        const subscriptions = await getActiveSubscriptions();
        
        if (subscriptions.length === 0) {
          return NextResponse.json(
            { error: "No active subscriptions found" },
            { status: 404 }
          );
        }

        console.log(`Sending notifications to ${subscriptions.length} devices`);
        
        // Send to each device with platform detection
        for (const subscription of subscriptions) {
          const deviceToken = subscription.endpoint;
          const userAgent = subscription.user_agent.toLowerCase();
          
          // Determine platform based on user agent
          let devicePlatform = "web"; // Default to web
          if (userAgent.includes("android")) {
            devicePlatform = "android";
          } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
            devicePlatform = "ios";
          }
          
          try {
            if (devicePlatform === "android") {
              await messaging.send({...androidPayload, token: deviceToken});
            } else if (devicePlatform === "ios") {
              await messaging.send({...iosPayload, token: deviceToken});
            } else {
              await messaging.send({...webPayload, token: deviceToken});
            }
            
            results.sent++;
            results.details.push({ 
              token: deviceToken.substring(0, 10) + "...", 
              platform: devicePlatform,
              status: "success" 
            });
          } catch (error: any) {
            results.failed++;
            results.details.push({ 
              token: deviceToken.substring(0, 10) + "...", 
              platform: devicePlatform,
              status: "failed",
              error: error.message 
            });
          }
        }
        
        results.success = results.sent > 0;
        return NextResponse.json(results);
      } catch (error: any) {
        console.error("Error sending to all devices:", error);
        return NextResponse.json(
          { error: `Failed to send to all devices: ${error.message}` },
          { status: 500 }
        );
      }
    }
    
    // Send to specific token with platform detection
    if (platform === "all") {
      // Try sending to all platforms for this token
      try {
        await messaging.send({...androidPayload, token});
        results.sent++;
        results.details.push({ platform: "android", status: "success" });
      } catch (error: any) {
        results.details.push({ 
          platform: "android", 
          status: "failed",
          error: error.message 
        });
      }
      
      try {
        await messaging.send({...iosPayload, token});
        results.sent++;
        results.details.push({ platform: "ios", status: "success" });
      } catch (error: any) {
        results.details.push({ 
          platform: "ios", 
          status: "failed",
          error: error.message 
        });
      }
      
      try {
        await messaging.send({...webPayload, token});
        results.sent++;
        results.details.push({ platform: "web", status: "success" });
      } catch (error: any) {
        results.details.push({ 
          platform: "web", 
          status: "failed",
          error: error.message 
        });
      }
      
      results.success = results.sent > 0;
      return NextResponse.json(results);
    } else if (platform === "android") {
      // Send to Android
      try {
        const response = await messaging.send({...androidPayload, token});
        results.sent = 1;
        results.success = true;
        results.details.push({ platform, status: "success" });
        return NextResponse.json(results);
      } catch (error: any) {
        console.error(`Error sending to ${platform}:`, error);
        return NextResponse.json(
          { 
            error: `Failed to send to ${platform}: ${error.message}`,
            details: [{ platform, status: "failed", error: error.message }]
          },
          { status: 500 }
        );
      }
    } else if (platform === "ios") {
      // Send to iOS
      try {
        const response = await messaging.send({...iosPayload, token});
        results.sent = 1;
        results.success = true;
        results.details.push({ platform, status: "success" });
        return NextResponse.json(results);
      } catch (error: any) {
        console.error(`Error sending to ${platform}:`, error);
        return NextResponse.json(
          { 
            error: `Failed to send to ${platform}: ${error.message}`,
            details: [{ platform, status: "failed", error: error.message }]
          },
          { status: 500 }
        );
      }
    } else if (platform === "web") {
      // Send to Web
      try {
        const response = await messaging.send({...webPayload, token});
        results.sent = 1;
        results.success = true;
        results.details.push({ platform, status: "success" });
        return NextResponse.json(results);
      } catch (error: any) {
        console.error(`Error sending to ${platform}:`, error);
        return NextResponse.json(
          { 
            error: `Failed to send to ${platform}: ${error.message}`,
            details: [{ platform, status: "failed", error: error.message }]
          },
          { status: 500 }
        );
      }
    } else {
      // Default to base payload if platform not specified
      try {
        const response = await messaging.send({
          token,
          notification: basePayload.notification,
          data: basePayload.data
        });
        return NextResponse.json({ 
          success: true, 
          sent: 1,
          failed: 0,
          details: [{ platform: "default", status: "success" }]
        });
      } catch (error: any) {
        console.error("Error sending notification:", error);
        return NextResponse.json(
          { 
            error: `Failed to send notification: ${error.message}`,
            details: [{ platform: "default", status: "failed", error: error.message }]
          },
          { status: 500 }
        );
      }
    }
  } catch (error: any) {
    console.error("Error processing notification request:", error);
    return NextResponse.json(
      { error: `Failed to process notification request: ${error.message}` },
      { status: 500 }
    );
  }
} 