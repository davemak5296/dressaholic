import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  // User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  // collection,
  // writeBatch,
  // query,
  // getDocs,
  // DocumentData,
  // CollectionReference,
} from 'firebase/firestore';
import { OnAuthNextFnType } from '../../types';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCyRnzfQJHDNLD0BZM1MVftczEGWt2Y3fY',
  authDomain: 'ztm-crwn-2d3cc.firebaseapp.com',
  projectId: 'ztm-crwn-2d3cc',
  storageBucket: 'ztm-crwn-2d3cc.appspot.com',
  messagingSenderId: '698305848091',
  appId: '1:698305848091:web:46039c776d7f9cbf1629be',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const db = getFirestore();
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const createUserDocFromAuth = async (
  userAuth: UserCredential['user'],
  additionalInfo: object = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('error creating the user', error.message);
      }
    }
  }

  return userSnapShot;
};
export const createAuthUserWithEmailAndPw = async (email: string, pw: string) => {
  if (!email || !pw) return;
  return createUserWithEmailAndPassword(auth, email, pw);
};
export const signInAuthUserWithEmailAndPw = async (email: string, pw: string) => {
  if (!email || !pw) return;
  return signInWithEmailAndPassword(auth, email, pw);
};
export const signOutUser = async () => signOut(auth);
export const onAuthStateChangedListener = (nextFn: OnAuthNextFnType) =>
  onAuthStateChanged(auth, nextFn);
export const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const unsub = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsub();
        res(userAuth);
      },
      rej
    );
  });
};

// const createCollection = <T = DocumentData>(collectionName: string) =>
//   collection(db, collectionName) as CollectionReference<T>;
// export const addCollectionAndDocs = async (collectionKey: string, objectsToAdd: Catalog[]) => {
//   const collectionRef = createCollection<Catalog>(collectionKey);

//   const batch = writeBatch(db);

//   objectsToAdd.forEach((obj) => {
//     const docRef = doc(collectionRef, obj.title.toLowerCase());
//     batch.set(docRef, obj);
//   });

//   await batch.commit();
//   console.log('done');
// };
// export const getCategoriesAndDocs = async () => {
//   const categoriesRef = createCollection<Catalog>('categories');
//   const q = query(categoriesRef);

//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => doc.data());
// };
