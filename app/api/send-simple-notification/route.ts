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
    
    const { token, title, message, link } = await request.json();
    
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

    const payload: Message = {
      token,
      notification: {
        title: title || "New Notification",
        body: message || "You have a new notification",
      },
      webpush: link ? {
        fcmOptions: {
          link,
        },
      } : undefined,
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