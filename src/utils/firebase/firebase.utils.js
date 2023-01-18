// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
   EmailAuthCredential} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3sMygge1RpkQ4POmlCYKqE2H18fIZG9M",
  authDomain: "crwn-clothing-db-657e0.firebaseapp.com",
  projectId: "crwn-clothing-db-657e0",
  storageBucket: "crwn-clothing-db-657e0.appspot.com",
  messagingSenderId: "563888146420",
  appId: "1:563888146420:web:f131358f4c43d84ec91ba1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInformation={}) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid );
    const userSnapshot = await getDoc(userDocRef);

    //if user data not exist
    //create/set the doc with the data from userAuth in my Collection
    //if user data exists
    //return userDocRef
    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      }
      catch(error){
        console.log('error creating the user',error.message);
      }
    }
    return userDocRef;
    
}

export const createAuthUserWithEmailAndPassword = async(email, password)=>{
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth,email,password);
}