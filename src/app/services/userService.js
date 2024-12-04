import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; 

export const fetchUsersFromFirestore = async () => {
    try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, where("type", "==", "user"));
        const usersSnapshot = await getDocs(usersQuery);
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

export const fetchDriversFromFirestore = async () => {
    try {
        const usersCollection = collection(db, "users");
        const usersQuery = query(usersCollection, where("type", "==", "driver"));
        const usersSnapshot = await getDocs(usersQuery);
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
