import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import toast from "react-hot-toast";

export const fetchPackagesFromFirestore = async () => {
    try {
        const packagesCollection = collection(db, "packages");
        const packagesSnapshot = await getDocs(packagesCollection);
        const packagesList = packagesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return packagesList;
    } catch (error) {
        console.error("Error fetching packages:", error.message);
        throw error;
    }
}


export const deletePackageFromFirestore = async (id) => {
    try {
        const packageRef = doc(db, "packages", id);
        
        await deleteDoc(packageRef);
        console.log("Package deleted successfully");
        toast.success("Package deleted successfully");
    } catch (error) {
        console.error("Error deleting package:", error.message);
        toast.error("Failed to delete package. Please try again");
        throw error;
    }
}