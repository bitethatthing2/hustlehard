// src/lib/firebase/config.ts

// Ensure environment variables are loaded (e.g., in .env.local)
// Example variables - replace with your actual project config names if different
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID // Optional: for Analytics
  };
  
  // Basic validation to ensure config values are present (optional but helpful)
  export function validateFirebaseConfig(): boolean {
      const missingKeys = Object.entries(firebaseConfig)
          .filter(([, value]) => value === undefined || value === '')
          // Add any keys here that are genuinely optional for your setup if needed
          .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`); // Attempts to guess env var name
  
      if (missingKeys.length > 0) {
          console.warn(
              `Firebase config is missing or invalid in environment variables: ${missingKeys.join(', ')}. Firebase services might not initialize correctly.`
          );
          // Set to true if you want to allow the app to run even with missing keys
          // Set to false if Firebase is absolutely critical for basic app function
          return false;
      }
      return true;
  }
  
  
  export default firebaseConfig;