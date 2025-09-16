import {
  
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"
import { db } from "@/firebase"
import { Task } from "@/types/task"

// tasks
export const tasksRef = collection(db, "tasks")

export const getAllTaskByUserId = async (userId: string) => {
  const q = query(tasksRef, where("userId", "==", userId))

  const querySnapshot = await getDocs(q)
  const taskList = querySnapshot.docs.map((taskRef) => ({
    id: taskRef.id,
    ...taskRef.data()
  })) as Task[]
  return taskList
}
