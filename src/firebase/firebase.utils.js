
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc,setDoc } from 'firebase/firestore';
import {getAuth ,GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';



const config ={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  }
  const app = initializeApp(config);
  const db = getFirestore(app);
  export const auth = getAuth(app);

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;
    
    const userRef = await doc(db,'users',`${userAuth.uid}`);
    const userSnap = await getDoc(userRef);

    if(!userSnap.exists()){
        const {displayName, email} = userAuth;
         const createdAt = new Date()
            try{
            await setDoc(userRef,{
            displayName,
            email,
            createdAt,
            ...additionalData
            })
            }catch(error){
            console.log('error creating user',error.message)
            }
    }
    
    return userSnap;
  }

 export const signUpwithEmailAndPassword =async(email,password,displayName)=>{
    const {user} =await createUserWithEmailAndPassword(auth,email,password,displayName)
   return user;
 }
export const signInwithEmailPassword = (email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
  //  const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    
  });
}
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => signInWithPopup(auth ,provider);


export default app;



