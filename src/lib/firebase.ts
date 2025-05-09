// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: These values MUST be set in your .env.local file.
// Refer to env.local.example for the required variables.

const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const fbAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const fbProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const fbStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const fbMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const fbAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const fbMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID; // Optional

const essentialFirebaseConfig = {
  apiKey: fbApiKey,
  authDomain: fbAuthDomain,
  projectId: fbProjectId,
};

const missingOrPlaceholderKeys = Object.entries(essentialFirebaseConfig)
  .filter(([key, value]) => !value || value.startsWith("YOUR_") || value === "")
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);

if (missingOrPlaceholderKeys.length > 0) {
  const errorMessage = `
    ####################################################################################
    ERROR: Firebase Configuration Incomplete or Invalid!
    ####################################################################################

    The following Firebase environment variables are missing, empty, or still using 
    placeholder values in your .env.local file:
    
    ${missingOrPlaceholderKeys.join("\n    ")}

    Please create or update the .env.local file in the root of your project with your 
    actual Firebase project credentials. 
    
    You can find these credentials in your Firebase project console:
    Project settings > General tab > Your apps > Web app SDK setup.

    Refer to the 'env.local.example' file for a template.
    DO NOT use placeholder values like "YOUR_API_KEY". 
    
    The application cannot initialize Firebase and will not work correctly until this is resolved.
    ####################################################################################
  `;
  console.error(errorMessage);
  throw new Error("Firebase configuration error. See console for details.");
}

const firebaseConfig = {
  apiKey: fbApiKey!,
  authDomain: fbAuthDomain!,
  projectId: fbProjectId!,
  storageBucket: fbStorageBucket, // Can be undefined if not used
  messagingSenderId: fbMessagingSenderId, // Can be undefined if not used
  appId: fbAppId, // Can be undefined if not used
  measurementId: fbMeasurementId, // Optional
};

// Initialize Firebase
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
