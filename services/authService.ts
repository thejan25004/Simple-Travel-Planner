// import { auth } from "@/firebase"
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut
// } from "firebase/auth"

// export const register = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password)
// }

// export const login = (email: string, password: string) => {
//   return signInWithEmailAndPassword(auth, email, password)
// }

// export const logout = () => {
//   return signOut(auth)
// }
// src/services/authService.ts
// src/services/authService.ts
// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { auth } from "@/firebase";

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns User object
  } catch (error: any) {
    throw new Error(error.message || "Registration failed");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns User object
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Logout failed");
  }
};

// Change password (with re-authentication)
export const changePassword = async (currentPassword: string, newPassword: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("No user is signed in");

  try {
    // Step 1: Re-authenticate with current password
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Step 2: Update to new password
    await updatePassword(user, newPassword);
  } catch (err: any) {
    if (err.code === "auth/wrong-password") {
      throw new Error("Your current password is incorrect");
    }
    if (err.code === "auth/weak-password") {
      throw new Error("Your new password is too weak (at least 6 chars required)");
    }
    if (err.code === "auth/requires-recent-login") {
      throw new Error("Please log in again and try changing password");
    }
    throw new Error(err.message || "Password change failed");
  }
};
