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
  updatePassword
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

export const changePassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is signed in");
    }
    await updatePassword(user, newPassword);
  } catch (error: any) {
    throw new Error(error.message || "Password change failed");
  }
};