"use server"; // For potential future use if called from server actions

import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp, type Timestamp } from "firebase/firestore";

export interface UserPreferences {
  defaultLocation?: string; // e.g., "London"
  units?: "metric" | "imperial";
  // Add other preferences as needed
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
  preferences?: UserPreferences;
  createdAt?: Timestamp;
  lastLogin?: Timestamp;
}

/**
 * Saves or updates a user's profile in Firestore.
 * This function is typically called after a user signs in or signs up.
 * @param userId The Firebase Auth user ID.
 * @param profileData Partial or full user profile data.
 */
export async function saveUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(userDocRef, {
      ...profileData,
      lastLogin: serverTimestamp(), // Update last login time
      // Set createdAt only if it's a new user (document doesn't exist)
      // For simplicity here, we'll overwrite or set it. A more robust way would be to check for doc existence.
      createdAt: profileData.createdAt || serverTimestamp(), 
    }, { merge: true }); // Merge true ensures we don't overwrite existing fields unnecessarily
    console.log("User profile saved/updated for UID:", userId);
  } catch (error) {
    console.error("Error saving user profile:", error);
    // Handle or throw error as appropriate for your application
    throw new Error("Could not save user profile.");
  }
}

/**
 * Retrieves a user's profile from Firestore.
 * @param userId The Firebase Auth user ID.
 * @returns The user profile data, or null if not found.
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, "users", userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log("No such user profile document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    // Handle or throw error
    throw new Error("Could not retrieve user profile.");
  }
}

// Example of how you might update user preferences
export async function updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
  const userDocRef = doc(db, "users", userId);
  try {
    await setDoc(userDocRef, { preferences }, { merge: true });
    console.log("User preferences updated for UID:", userId);
  } catch (error) {
    console.error("Error updating user preferences:", error);
    throw new Error("Could not update user preferences.");
  }
}
