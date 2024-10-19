
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged , signOut } from 'firebase/auth';

export const Register = async (email , password)=> {
    try {
        const CreateUser = await createUserWithEmailAndPassword(auth , email , password);
        console.log(CreateUser.user);
        
        return CreateUser.user;
    } catch (error) {
         console.error("Registration error:", error.message);
    throw error; 
    }
}



export const Login = async (email , password)=> {
    try{
        const LoginUser = await signInWithEmailAndPassword(auth , email , password);
        console.log(LoginUser.user);
        return LoginUser.user;  

    }catch(error){
        console.error("Login error:", error.message);
        throw error;
    }
}


export const checkUserLoggedIn = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is logged in:', user);
      callback(true, user);
    } else {
      console.log('No user is logged in.');
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