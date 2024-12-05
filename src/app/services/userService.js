import { collection, getDocs, query, where} from "firebase/firestore";
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
export const fetchLastUsersFromFirestore = async () => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Start of the day

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // End of the day
        const usersCollection = collection(db, "users");

        // Create a query to fetch users of type "user", ordered by a timestamp field, descending, limited to 5
        const usersQuery = query(
            usersCollection,
            where("type", "==", "user"),
            where("createdAt", ">=", todayStart),
            where("createdAt", "<=", todayEnd)
        );

        // Execute the query
        const usersSnapshot = await getDocs(usersQuery);

        // Map the documents to an array of user objects
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
