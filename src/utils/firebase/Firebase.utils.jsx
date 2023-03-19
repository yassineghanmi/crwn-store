// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZE5_aI2KxK4NYOm3rgDddwPX05KGmrA0",
  authDomain: "crwn-clothing-62a47.firebaseapp.com",
  projectId: "crwn-clothing-62a47",
  storageBucket: "crwn-clothing-62a47.appspot.com",
  messagingSenderId: "980810068037",
  appId: "1:980810068037:web:646035f69da9d6cb3cb32c",
  measurementId: "G-E99MXGVKND",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore(app);
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e) {
      console.log("fireStore problem");
    }
  }
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) return;
  console.log("update 1");
  const response = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(response.user, {
    displayName,
  });
  return response;
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const SignOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

//Create Collections And Docs
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log("done");
};

//Get Collections And Docs
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = await query(collectionRef);
  const querySnapshot = await getDocs(q);
  //console.log(querySnapshot);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    //console.log("data =", docSnapshot.data());
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  //console.log(categoryMap)
  return categoryMap;
};
