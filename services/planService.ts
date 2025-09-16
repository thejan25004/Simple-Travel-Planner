
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "@/firebase";
// import { Plan } from "@/types/plan";

// // Reference to the "plans" collection in Firestore
// export const plansRef = collection(db, "plans");

// // ✅ Create a new plan
// export const createPlan = async (plan: Plan) => {
//   try {
//     const docRef = await addDoc(plansRef, {
//       name: plan.name,
//       location: plan.location,
//       startDate: plan.startDate,
//       endDate: plan.endDate,
//       status: plan.status,
//       notes: plan.notes || "",
//       image: plan.image || "", // ✅ save uploaded image URL
//     });
//     return docRef.id;
//   } catch (error) {
//     console.error("Error creating plan:", error);
//     throw error;
//   }
// };

// // ✅ Get all plans
// export const getAllPlans = async (): Promise<Plan[]> => {
//   try {
//     const querySnapshot = await getDocs(plansRef);
//     const plans: Plan[] = [];
//     querySnapshot.forEach((docSnap) => {
//       plans.push({
//         id: docSnap.id,
//         ...docSnap.data(),
//       } as Plan);
//     });
//     return plans;
//   } catch (error) {
//     console.error("Error fetching plans:", error);
//     throw error;
//   }
// };

// // ✅ Get single plan
// export const getPlanById = async (id: string): Promise<Plan | null> => {
//   try {
//     const docRef = doc(db, "plans", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return { id: docSnap.id, ...docSnap.data() } as Plan;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching plan by id:", error);
//     throw error;
//   }
// };

// // ✅ Update a plan
// export const updatePlan = async (id: string, updatedData: Partial<Plan>) => {
//   try {
//     const docRef = doc(db, "plans", id);
//     await updateDoc(docRef, updatedData);
//   } catch (error) {
//     console.error("Error updating plan:", error);
//     throw error;
//   }
// };

// // ✅ Delete a plan
// export const deletePlan = async (id: string) => {
//   try {
//     const docRef = doc(db, "plans", id);
//     await deleteDoc(docRef);
//   } catch (error) {
//     console.error("Error deleting plan:", error);
//     throw error;
//   }
// };



import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import { Plan } from "@/types/plan";

const getUserPlansRef = () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  return collection(db, `users/${user.uid}/plans`);
};

// Create a plan
export const createPlan = async (plan: Plan): Promise<string> => {
  try {
    const plansRef = getUserPlansRef();
    const docRef = await addDoc(plansRef, {
      ...plan,
      favorite: plan.favorite || false, // Default to false
      createdAt: new Date().toISOString(), // Optional: Track creation time
    });
    return docRef.id;
  } catch (error: any) {
    console.error("Error creating plan:", error);
    throw new Error(error.message || "Failed to create plan");
  }
};

// Get all plans for the authenticated user
export const getAllPlans = async (): Promise<Plan[]> => {
  try {
    const plansRef = getUserPlansRef();
    const querySnapshot = await getDocs(plansRef);
    const plans: Plan[] = [];
    querySnapshot.forEach((docSnap) => {
      plans.push({ id: docSnap.id, ...docSnap.data() } as Plan);
    });
    return plans;
  } catch (error: any) {
    console.error("Error fetching plans:", error);
    throw new Error(error.message || "Failed to fetch plans");
  }
};

// Get plan by ID
export const getPlanById = async (id: string): Promise<Plan | null> => {
  try {
    const plansRef = getUserPlansRef();
    const docRef = doc(plansRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Plan;
    }
    return null;
  } catch (error: any) {
    console.error("Error fetching plan by ID:", error);
    throw new Error(error.message || "Failed to fetch plan");
  }
};

// Update plan
export const updatePlan = async (id: string, updatedData: Partial<Plan>) => {
  try {
    const plansRef = getUserPlansRef();
    const docRef = doc(plansRef, id);
    await updateDoc(docRef, updatedData);
  } catch (error: any) {
    console.error("Error updating plan:", error);
    throw new Error(error.message || "Failed to update plan");
  }
};

// Delete plan
export const deletePlan = async (id: string) => {
  try {
    const plansRef = getUserPlansRef();
    const docRef = doc(plansRef, id);
    await deleteDoc(docRef);
  } catch (error: any) {
    console.error("Error deleting plan:", error);
    throw new Error(error.message || "Failed to delete plan");
  }
};

// Toggle favorite
export const toggleFavorite = async (id: string, current: boolean) => {
  try {
    const plansRef = getUserPlansRef();
    const docRef = doc(plansRef, id);
    await updateDoc(docRef, { favorite: !current });
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    throw new Error(error.message || "Failed to toggle favorite");
  }
};
