import { NextResponse } from "next/server";
import { getMessaging } from "firebase-admin/messaging";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { token, title, message, link, platform } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const messaging = getMessaging();

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
    const platformPayloads = {
      android: {
        ...basePayload,
        android: {
          notification: {
            ...basePayload.notification,
            icon: "notification_icon", // Use your custom icon name
            color: "#4CAF50", // Custom color for Android
            channelId: "default", // Make sure this matches your Android channel ID
          },
        },
      },
      ios: {
        ...basePayload,
        apns: {
          payload: {
            aps: {
              ...basePayload.notification,
              sound: "default",
              badge: 1,
              "mutable-content": 1,
            },
          },
        },
      },
      web: {
        ...basePayload,
        webpush: {
          notification: {
            ...basePayload.notification,
            icon: "/icon-192x192.png", // Path to your web icon
            badge: "/badge-72x72.png", // Path to your badge icon
          },
        },
      },
    };

    // Determine which payload to use based on platform
    let payload;
    if (platform === "all") {
      // Send to all platforms with their specific payloads
      const results = await Promise.all([
        messaging.send({ ...platformPayloads.android, token }),
        messaging.send({ ...platformPayloads.ios, token }),
        messaging.send({ ...platformPayloads.web, token }),
      ]);
      return NextResponse.json({ success: true, results });
    } else if (platform && platformPayloads[platform as keyof typeof platformPayloads]) {
      // Send to specific platform
      payload = platformPayloads[platform as keyof typeof platformPayloads];
    } else {
      // Default to base payload if platform not specified
      payload = basePayload;
    }

    const response = await messaging.send({ ...payload, token });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
} 