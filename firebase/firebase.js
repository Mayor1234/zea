import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Sign In With Google
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      createUserDocumentFromAuth(user);
      // const credential =
      // GoogleAuthProvider.credentialFromResult(userCredential);
      // const token = credential.accessToken;

      console.log(user);
      // console.log(token);
    })
    .catch((error) => {
      console.log('error signing with google is:', error.message);
    });
};

// Database
const db = getFirestore(app);

export const createUserDocumentFromAuth = async (user) => {
  if (!user) return;

  const userDocRef = doc(db, 'users', user.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { email, displayName } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error adding user:', error.message);
    }
  }

  return userDocRef;
};
