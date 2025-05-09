
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const fbAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const fbProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const fbStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const fbMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const fbAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const fbMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID; // Optional

const essentialFirebaseConfig: Record<string, string | undefined> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: fbApiKey,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: fbAuthDomain,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: fbProjectId,
  // Optional but good to check if your app uses them:
  // NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: fbStorageBucket,
  // NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: fbMessagingSenderId,
  // NEXT_PUBLIC_FIREBASE_APP_ID: fbAppId,
};

const missingOrPlaceholderKeys = Object.entries(essentialFirebaseConfig)
  .filter(([key, value]) => {
    const isMissing = !value || value.trim() === "";
    // Extended placeholder check to be more robust
    const isPlaceholder = value && (
        value.startsWith("YOUR_") || 
        value.startsWith("PASTE_") || 
        value.includes("API_KEY_HERE") ||
        value.includes("PROJECT_ID_HERE") ||
        value.includes("AUTH_DOMAIN_HERE") ||
        value === "YOUR_FIREBASE_API_KEY" || // common copy-paste mistake
        value === "YOUR_FIREBASE_AUTH_DOMAIN" ||
        value === "YOUR_FIREBASE_PROJECT_ID"
    );
    return isMissing || isPlaceholder;
  })
  .map(([key]) => key);


if (missingOrPlaceholderKeys.length > 0) {
  const detailedErrorMessage = `
    ####################################################################################
    ERROR: Firebase Configuration Incomplete or Invalid!
    ####################################################################################

    The following Firebase environment variables are missing, empty, or still using
    placeholder values (e.g., "YOUR_API_KEY_HERE") in your .env.local file:

    ${missingOrPlaceholderKeys.join("\n    ")}

    ------------------------------------------------------------------------------------
    ACTION REQUIRED:
    ------------------------------------------------------------------------------------
    1. CREATE a file named '.env.local' in the root of your project if it doesn't exist.
       You can do this by COPYING the '.env.local.example' file (also in the root)
       to '.env.local'. Ensure '.env.local.example' contains all necessary variables.
    
    2. OPEN your '.env.local' file and fill in the CORRECT values for the Firebase
       variables listed above. You can find these credentials in your Firebase
       project console:
       Go to Project settings > General tab > Scroll down to "Your apps" > Select your web app.
       Look for the "SDK setup and configuration" section and choose "Config".

    3. DO NOT use placeholder values. Use your actual Firebase project credentials.
       Ensure there are no extra spaces or quotes unless they are part of the actual value.

    4. After creating or updating '.env.local', you MUST RESTART your Next.js 
       development server for the changes to take effect. (e.g., Ctrl+C and then 
       'npm run dev' or 'yarn dev')
    ####################################################################################
  `;
  console.error(detailedErrorMessage); // This will print to the terminal console

  // This error is thrown to stop execution and inform the user in the browser overlay
  // Keep the browser message concise and direct users to the terminal.
  throw new Error("Firebase configuration error. Critical environment variables are missing or invalid. PLEASE CHECK YOUR TERMINAL CONSOLE (where you run 'npm run dev') for detailed instructions and a list of problematic variables. Then, verify your .env.local file and restart the server.");
}

const firebaseConfig = {
  apiKey: fbApiKey!,
  authDomain: fbAuthDomain!,
  projectId: fbProjectId!,
  storageBucket: fbStorageBucket, 
  messagingSenderId: fbMessagingSenderId, 
  appId: fbAppId, 
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
