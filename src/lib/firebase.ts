
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

const essentialFirebaseConfig: Record<string, { value: string | undefined, isOptional: boolean, example?: string }> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: { value: fbApiKey, isOptional: false, example: "AIzaSy*******************" },
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: { value: fbAuthDomain, isOptional: false, example: "your-project-id.firebaseapp.com" },
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: { value: fbProjectId, isOptional: false, example: "your-project-id" },
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: { value: fbStorageBucket, isOptional: true, example: "your-project-id.appspot.com" },
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: { value: fbMessagingSenderId, isOptional: true, example: "123456789012" },
  NEXT_PUBLIC_FIREBASE_APP_ID: { value: fbAppId, isOptional: true, example: "1:123456789012:web:abcdef1234567890abcdef" },
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: { value: fbMeasurementId, isOptional: true, example: "G-ABCDEFGHIJ" },
};

const placeholderPrefixes = ["YOUR_", "PASTE_", "<", "ENTER_"];
const placeholderSuffixes = ["_HERE", ">"];

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return false;
  const upperValue = value.toUpperCase();
  return placeholderPrefixes.some(prefix => upperValue.startsWith(prefix)) ||
         placeholderSuffixes.some(suffix => upperValue.endsWith(suffix)) ||
         value.includes("---") || value.includes("***") || value.trim() === "";
}

const missingOrPlaceholderIssues: string[] = [];

for (const [key, config] of Object.entries(essentialFirebaseConfig)) {
  const isMissing = !config.value || config.value.trim() === "";
  const isActuallyPlaceholder = isPlaceholder(config.value);

  if (!config.isOptional) {
    if (isMissing) {
      missingOrPlaceholderIssues.push(`- ${key} is missing or empty.`);
    } else if (isActuallyPlaceholder) {
      missingOrPlaceholderIssues.push(`- ${key} has a placeholder value: "${config.value}". Example: "${config.example}"`);
    }
  } else {
    // For optional keys, only flag if they are set to a placeholder.
    // If they are missing/empty, that's fine for optional keys.
    if (config.value && config.value.trim() !== "" && isActuallyPlaceholder) {
      missingOrPlaceholderIssues.push(`- ${key} (optional) has a placeholder value: "${config.value}". Leave blank or provide a real value. Example: "${config.example}"`);
    }
  }
}


if (missingOrPlaceholderIssues.length > 0) {
  const detailedErrorMessage = `
    ####################################################################################
    ERROR: Firebase Configuration Incomplete or Invalid!
    ####################################################################################

    The application cannot start due to issues with Firebase environment variables.
    Please check your '.env.local' file (create it from '.env.local.example' if needed).

    The following Firebase environment variables require attention:
    ${missingOrPlaceholderIssues.join("\n    ")}

    ------------------------------------------------------------------------------------
    ACTION REQUIRED:
    ------------------------------------------------------------------------------------
    1. LOCATE or CREATE the file named '.env.local' in the root of your project.
       Use '.env.local.example' as a template.

    2. OPEN your '.env.local' file.
    
    3. FILL IN the CORRECT values for the Firebase variables listed above.
       You can find these credentials in your Firebase project console:
       - Go to your Firebase project: https://console.firebase.google.com/
       - Select your project.
       - In the left sidebar, click on "Project settings" (the gear icon).
       - In the "General" tab, scroll down to the "Your apps" section.
       - If you haven't registered your web app, click "Add app" and choose web (</>).
       - If registered, click its name or find "SDK setup and configuration".
       - Choose "Config" to view the firebaseConfig object. Use these values.

    4. ENSURE there are no placeholder values (e.g., "YOUR_API_KEY_HERE").

    5. SAVE the '.env.local' file.

    6. CRITICAL: RESTART your Next.js development server for changes to take effect.
       (e.g., Ctrl+C in the terminal, then run 'npm run dev' or 'yarn dev')
    ####################################################################################
  `;
  console.error(detailedErrorMessage);

  // This error is thrown to stop execution and inform the user in the browser overlay.
  // Keep the browser message concise and direct users to the terminal.
  throw new Error("Firebase configuration error. Critical environment variables are missing or invalid. PLEASE CHECK YOUR TERMINAL CONSOLE (where you run 'npm run dev') for detailed instructions and a list of problematic variables. Then, verify your .env.local file (created from .env.local.example) and restart the server.");
}

const firebaseConfig = {
  apiKey: fbApiKey!,
  authDomain: fbAuthDomain!,
  projectId: fbProjectId!,
  storageBucket: fbStorageBucket || undefined, // Use undefined if optional and not set
  messagingSenderId: fbMessagingSenderId || undefined,
  appId: fbAppId || undefined,
  measurementId: fbMeasurementId || undefined,
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

