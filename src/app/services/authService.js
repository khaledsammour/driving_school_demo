
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth , db } from "../firebase";
import { doc, setDoc , serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged , signOut } from 'firebase/auth';
import toast from "react-hot-toast";

export const Register = async (email, password, additionalData = {}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            uid: user.uid,
            first_name: additionalData.first_name || "",
            last_name: additionalData.last_name || "",
            phone: additionalData.phone || "",
            gender: additionalData.gender || "",
            password: additionalData.password || "",
            language: additionalData.language || "",
            address: additionalData.address || "",
            license_info: additionalData.license_info || "",
            middle_name: additionalData.middle_name || "",
            third_name: additionalData.third_name || "",
            type: additionalData.type || "",
            date: additionalData.date || "",
            total_driving_hours: additionalData.total_driving_hours || "",
            driving_hours: additionalData.driving_hours || "",
            online_training_hours: additionalData.online_training_hours || "",
            package_id: additionalData.package_id || "",
            car_test: additionalData.car_test || "",
            is_profile_complete: false,
            is_verify: false,
            createdAt: serverTimestamp(),
        });
        await sendEmailVerification(user);

        return user;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("This email is already registered. Please try logging in.");
        } else if (error.code === 'auth/weak-password') {
            throw new Error("Weak Password");
        } else {
            throw new Error("Something went wrong. Please try again.");
        }
    }
};






export const Login = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password must be provided.");
    }
    let loginUser = null
    try {
        loginUser = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {        
        if (error.code === 'auth/user-not-found') {
            throw new Error("No user found with this email. Please register first.");
        } else if (error.code === 'auth/wrong-password') {
            throw new Error("Incorrect password. Please try again.");
        } else if (error.code === 'auth/invalid-email') {
            throw new Error("Invalid email format. Please enter a valid email.");
        } else if (error.code === 'auth/invalid-credential') {
            throw new Error("Invalid credentials. Please check your email and password.");
        } else {
            throw new Error("Login failed. Please try again later.");
        }
    }
    if (loginUser && loginUser.user.emailVerified){
        localStorage.setItem('IdUser', loginUser.user.uid);
        localStorage.setItem('typeUser', loginUser.user.type);
        await setDoc(
            doc(db, "users", loginUser.user.uid),
            {
                is_verify: true
            },
            { merge: true }
        );
        return loginUser.user;
    } else if(loginUser){
        throw new Error("You should verify your email first");
    }
};



export const checkUserLoggedIn = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
  
      console.log('User is logged in:', user);
      console.log('User is logged in:', user.uid);
        // localStorage.setItem('IdUser', user.uid);
      callback(true, user);
    } else {
     
      console.log('User is registered but not logged in.');
      callback(false, null);
    }
  });
};


export const Logout = async () => {
    try {
        await signOut(auth); 
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout error:", error.message);
    }
}