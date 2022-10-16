import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { useQuery } from '@tanstack/react-query';
import { db, signInAuthUserWithEmailAndPw } from '../utils/firebase/firebase.utils';
import { UserCredential } from 'firebase/auth';

export const useEmailSignIn = (email: string, password: string) =>
  useQuery(
    ['user'],
    async () => {
      try {
        const user = (await signInAuthUserWithEmailAndPw(email, password)) as UserCredential;
        const userDocRef = doc(db, 'users', user['user'].uid);
        const userSnapShot = await getDoc(userDocRef);
        return userSnapShot;
      } catch (error) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('Wrong password.');
              break;
            case 'auth/user-not-found':
              alert('User not exists.');
              break;
            default:
              alert(error.code);
              break;
          }
        }
      }
    },
    {
      enabled: false,
    }
  );
