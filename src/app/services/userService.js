import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

export const fetchUsersFromFirestore = async () => {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
};

