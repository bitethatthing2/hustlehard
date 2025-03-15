import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
let firebaseAdminInitialized = false;

// Ensure Firebase Admin is initialized just once
function initializeFirebaseAdmin() {
  if (firebaseAdminInitialized) {
    return;
  }
  
  if (!admin.apps.length) {
    try {
      // Handle the private key properly for Netlify
      const privateKey = process.env.FIREBASE_PRIVATE_KEY 
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") 
        : undefined;
        
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      };
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
      
      firebaseAdminInitialized = true;
      console.log("Firebase Admin initialized successfully");
    } catch (error) {
      console.error("Firebase Admin initialization error:", error);
      throw error; // Re-throw to handle in the API route
    }
  } else {
    firebaseAdminInitialized = true;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Firebase Admin before proceeding
    initializeFirebaseAdmin();
    
    const { token, title, message, link, image } = await request.json();
    
    // Log the received parameters for debugging
    console.log("Notification request received:", { token: token ? "present" : "missing", title, message, link, image });
    
    // Validate required fields
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }
    
    // Handle development mode with test token
    if (token === "test-token-for-ui-development") {
      console.log("Development mode detected, simulating notification send");
      
      // Simulate a successful response for development
      return NextResponse.json({
        success: true,
        message: "This is a simulated response for development mode. In production, real notifications would be sent."
      });
    }

    // Prepare the notification payload
    const payload: Message = {
      token,
      notification: {
        title: title || "New Notification",
        body: message || "You have a new notification",
      },
      webpush: {
        // Pass URL for click handling
        fcmOptions: link ? {
          link,
        } : undefined,
        // Set notification configuration
        notification: {
          // Use proper large icon from only_these folder
          icon: "/only_these/ms-icon-310x310.png",
          // Use larger badge icon for better visibility in status bar
          badge: "/only_these/ms-icon-144x144.png",
          // Allow interaction
          requireInteraction: true,
          // Include image in webpush notification if provided
          image: image,
          // Add actions for Android
          actions: [
            {
              action: "open",
              title: "Open",
              icon: "/only_these/ms-icon-144x144.png"
            }
          ],
          // Add data to help with click handling
          data: {
            url: link || "/",
            notificationId: Date.now().toString(),
          }
        }
      },
      // Include data for handling in service worker
      data: {
        title: title || "New Notification",
        body: message || "You have a new notification",
        link: link || "/",
        image: image || "",
        timestamp: Date.now().toString(),
      }
    };

    try {
      const response = await admin.messaging().send(payload);
      console.log("Notification sent successfully:", response);

      return NextResponse.json({ 
        success: true, 
        message: "Notification sent!",
        messageId: response
      });
    } catch (error: any) {
      console.error("Error sending notification:", error);
      return NextResponse.json({ 
        success: false, 
        error: error.message || "Unknown error occurred"
      }, { 
        status: 500 
      });
    }
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Unknown error occurred"
    }, { 
      status: 500 
    });
  }
} 