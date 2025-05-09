
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

// Define expected Firebase config keys, whether they are optional, and clear placeholder examples.
// These examples MUST be detectable by the isPlaceholder function if copied verbatim.
const essentialFirebaseConfig: Record<string, { value: string | undefined, isOptional: boolean, example: string }> = {
  NEXT_PUBLIC_FIREBASE_API_KEY: { value: fbApiKey, isOptional: false, example: "PLACEHOLDER_API_KEY_REPLACE_ME" },
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: { value: fbAuthDomain, isOptional: false, example: "PLACEHOLDER_AUTH_DOMAIN_REPLACE_ME_your-project-id.firebaseapp.com" },
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: { value: fbProjectId, isOptional: false, example: "PLACEHOLDER_PROJECT_ID_REPLACE_ME" },
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: { value: fbStorageBucket, isOptional: true, example: "PLACEHOLDER_STORAGE_BUCKET_REPLACE_ME_your-project-id.appspot.com" },
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: { value: fbMessagingSenderId, isOptional: true, example: "PLACEHOLDER_MESSAGING_SENDER_ID_REPLACE_ME_123456789012" },
  NEXT_PUBLIC_FIREBASE_APP_ID: { value: fbAppId, isOptional: true, example: "PLACEHOLDER_APP_ID_REPLACE_ME_1:123456789012:web:abc" },
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: { value: fbMeasurementId, isOptional: true, example: "PLACEHOLDER_MEASUREMENT_ID_REPLACE_ME_G-XYZ" },
};

// Function to detect if a value is a placeholder.
function isPlaceholder(value: string | undefined): boolean {
  if (!value || value.trim() === "") return true; // Empty or whitespace-only is a placeholder for a required field

  const upperValue = value.toUpperCase();

  // Common placeholder markers
  const placeholderMarkers = [
    "PLACEHOLDER_", "_REPLACE_ME", "YOUR_", "_HERE", 
    "PASTE_", "ENTER_", "AIzaSyFAKEAPIKEY", "your-project-id-fake", // Common generic placeholders
    "---", "***", "XXX" // Other common markers
  ];
  if (placeholderMarkers.some(marker => upperValue.includes(marker))) {
    return true;
  }

  // Check if the value exactly matches one of the example placeholder formats.
  // This catches cases where the user copies an example string directly from guidance.
  for (const key in essentialFirebaseConfig) {
    if (essentialFirebaseConfig[key].example === value) {
      return true;
    }
  }
  
  return false;
}

const missingOrPlaceholderIssues: string[] = [];

for (const [key, config] of Object.entries(essentialFirebaseConfig)) {
  const isMissing = !config.value || config.value.trim() === "";
  const isActuallyPlaceholder = isPlaceholder(config.value);

  if (!config.isOptional) {
    if (isMissing) {
      missingOrPlaceholderIssues.push(`- ${key} is MISSING or empty. It is a required Firebase credential.`);
    } else if (isActuallyPlaceholder) {
      missingOrPlaceholderIssues.push(`- ${key} has a PLACEHOLDER value: "${config.value}". Please replace it with your actual Firebase project credential. (An example of a placeholder format is: "${config.example}")`);
    }
  } else {
    // For optional keys, only flag if they are set to an obvious placeholder.
    // If an optional key is empty or undefined, that's fine.
    if (config.value && config.value.trim() !== "" && isActuallyPlaceholder) {
      missingOrPlaceholderIssues.push(`- ${key} (optional) has a PLACEHOLDER value: "${config.value}". Replace with your actual credential or leave blank if not used. (An example placeholder format: "${config.example}")`);
    }
  }
}


if (missingOrPlaceholderIssues.length > 0) {
  const detailedErrorMessage = `
    ####################################################################################
    ERROR: Firebase Configuration Incomplete or Invalid!
    ####################################################################################

    The application cannot start due to issues with Firebase environment variables.
    This usually means your '.env.local' file is missing, incomplete, or contains
    placeholder values that need to be replaced with your actual Firebase credentials.

    The following Firebase environment variables require attention:
    ${missingOrPlaceholderIssues.join("\n    ")}

    ------------------------------------------------------------------------------------
    ACTION REQUIRED:
    ------------------------------------------------------------------------------------
    1. LOCATE or CREATE the file named '.env.local' in the root of your project.
       If it does not exist, create it by copying the '.env.local.example' file 
       (which should also be in the root of your project).

    2. OPEN your '.env.local' file.
    
    3. FILL IN the CORRECT values for the Firebase variables listed above using
       the credentials from your Firebase project console:
       - Go to your Firebase project: https://console.firebase.google.com/
       - Select your project.
       - In the left sidebar, click on "Project settings" (the gear icon).
       - In the "General" tab, scroll down to the "Your apps" section.
       - If you haven't registered your web app, click "Add app" and choose web (</>).
       - If registered, click its name or find "SDK setup and configuration".
       - Choose "Config" to view the firebaseConfig object. Use these values for
         the corresponding NEXT_PUBLIC_FIREBASE_... variables in your '.env.local'.

    4. ENSURE there are NO PLACEHOLDER values (e.g., "PLACEHOLDER_API_KEY_REPLACE_ME", 
       "YOUR_API_KEY_HERE", or the example values like "AIzaSyFAKEAPIKEY..."). 
       Replace them with your *actual* project credentials. The values listed
       above as "PLACEHOLDER value" are the ones currently detected as problematic.

    5. SAVE the '.env.local' file.

    6. CRITICAL: RESTART your Next.js development server for changes to take effect.
       (e.g., Ctrl+C in the terminal, then run 'npm run dev' or 'yarn dev')
    ####################################################################################
  `;
  console.error(detailedErrorMessage);

  // This error is thrown to stop execution and inform the user in the browser overlay.
  // Keep the browser message concise and direct users to the terminal.
  throw new Error("Firebase configuration error. Critical environment variables are missing or contain placeholder values. PLEASE CHECK YOUR TERMINAL CONSOLE (where you run 'npm run dev') for detailed instructions and a list of problematic variables. Then, verify your .env.local file (created from .env.local.example if needed) and restart the server.");
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

