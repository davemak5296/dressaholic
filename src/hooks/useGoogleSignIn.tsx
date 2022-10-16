import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { db, signInWithGooglePopup } from '../utils/firebase/firebase.utils';

export const useGoogleSignIn = () =>
  useQuery(
    ['user'],
    async () => {
      const user = await signInWithGooglePopup();
      const userDocRef = doc(db, 'users', user['user'].uid);
      const userSnapShot = await getDoc(userDocRef);
      return userSnapShot;
    },
    {
      enabled: false,
    }
  );
