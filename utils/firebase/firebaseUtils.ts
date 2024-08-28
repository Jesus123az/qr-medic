
import { FirebaseApp, initializeApp } from "firebase/app";
import {Auth, createUserWithEmailAndPassword,  getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, User} from 'firebase/auth'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
export const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

export const registerUser =async(email: string, password: string)=>{
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        return user;

    }catch(error){
        console.error("error creating User", error)
    }

}

export const loginUser = async(email: string, password: string)=>{
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        if(user){
            return user;
        }
    }catch(error){
        console.error("error logging in", error)
    }

}

export const sendPasswordResetLink = async (email: string)=>{
    try{
        await sendPasswordResetEmail(auth, email)
    }catch(err){
        console.error(err)
    }

}

export const logOut = ()=>{
    signOut(auth);
}