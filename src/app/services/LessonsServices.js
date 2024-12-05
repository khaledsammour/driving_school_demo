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
export const fetchTodayLessonsFromFirestore = async () => {
    try {
        // Get the start and end of the current day
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Start of the day

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // End of the day

        // Reference the "lessons" collection
        const lessonsCollection = collection(db, "lessons");

        // Create a query to fetch lessons created today
        const lessonsQuery = query(
            lessonsCollection,
            where("createdAt", ">=", todayStart),
            where("createdAt", "<=", todayEnd),
        );

        // Execute the query
        const lessonsSnapshot = await getDocs(lessonsQuery);

        // Map the documents to an array of lesson objects
        const lessonsList = lessonsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return lessonsList;
    } catch (error) {
        console.error("Firestore fetch error:", error.message);
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