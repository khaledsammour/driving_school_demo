import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import toast from "react-hot-toast";

export const fetchLessonsFromFirestore = async () => {
    try {
        const lessonsCollection = collection(db, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsList = lessonsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return lessonsList;
    } catch (error) {
        console.error("Firestore fetch error:", error);
        toast.error("Error fetching lessons. Check your connection.");
        throw error;
    }
};



export const deleteLessonsFromFirestore = async (id) => {
    try {
        const lessonsRef = doc(db, "lessons", id);
        
        await deleteDoc(lessonsRef);
        console.log("lessons deleted successfully");
        toast.success("lessons deleted successfully");
    } catch (error) {
        console.error("Error deleting lessons:", error.message);
        toast.error("Failed to delete lessons. Please try again");
        throw error;
    }
}