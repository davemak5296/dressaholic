import { useQuery } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createAuthUserWithEmailAndPw, db } from '../utils/firebase/firebase.utils';

export const useEmailSignUp = (email: string, password: string, displayName: string) =>
  useQuery(
    ['user'],
    async () => {
      try {
        const user = (await createAuthUserWithEmailAndPw(email, password)) as UserCredential;
        const userDocRef = doc(db, 'users', user['user'].uid);
        const createAt = new Date();
        await setDoc(userDocRef, {
          displayName,
          email,
          createAt,
        });
        const userSnapShot = await getDoc(userDocRef);
        return userSnapShot;
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert('Cannot sign up, email already in use.');
              break;
            default:
              alert(error.code);
              break;
          }
        }
      }
    },
    { enabled: false }
  );
