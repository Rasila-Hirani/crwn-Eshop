
import { initializeApp } from 'firebase/app';
import { getFirestore,doc,getDocs, getDoc,setDoc ,collection, writeBatch,query,where} from 'firebase/firestore';
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
export const getUserCartRef = async userId =>{
  const cartCollection =collection(db,'carts');
  const q = query(cartCollection,where('userId','==',userId))
  const querySnapshot = await getDocs(q);
 
  if(querySnapshot.empty){
    const cartDocRef=doc(cartCollection);
      await setDoc(cartDocRef,{ userId, cartItems: []})
      return cartDocRef;
    }else{
     return querySnapshot.docs[0].ref;
  }
  
}
 export const signUpwithEmailAndPassword =(email,password)=>{
 
    return createUserWithEmailAndPassword(auth,email,password)
  
   
 }
export const signInwithEmailPassword = (email,password)=>{
 
  return  signInWithEmailAndPassword(auth, email, password)

}

export const addShopDataTOfirestore =async (key,objectsTOadd)=>{
  const collectionRef = collection(db,key)
  
  const batch = writeBatch(db);
  objectsTOadd.forEach(obj =>{
    const newDocRef = doc(collectionRef);
   
    batch.set(newDocRef,obj)
  });
 return await batch.commit();
}

export const getShopData=async () =>{
return await getDocs(collection(db,'collections')).then((collectionSnapshot)=>{
  const transformCollection =collectionSnapshot.docs.map((doc) =>{
    const {title,items} = doc.data()
    return {
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
          }
  })
return transformCollection.reduce((accumulator,collection) =>{
      accumulator[collection.title.toLowerCase()] =collection;
      return accumulator;
    },{})
 })
}

export const getCurrentUser =() =>{
  return new Promise((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth)
    },reject)
  })
}
  const googelProvider = new GoogleAuthProvider();
  googelProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () =>signInWithPopup(auth ,googelProvider) ;


export default app;



