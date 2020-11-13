import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA7qrioLYIRYhoiDCUHr3mdG-mUie7sz3Y",
  authDomain: "crown-db-befc8.firebaseapp.com",
  databaseURL: "https://crown-db-befc8.firebaseio.com",
  projectId: "crown-db-befc8",
  storageBucket: "crown-db-befc8.appspot.com",
  messagingSenderId: "98319172192",
  appId: "1:98319172192:web:a2fd6a45400e3b0cbab905",
  measurementId: "G-XGLT63YGZ7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log('User auth:', userAuth);

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch (error) {
      console.log('There was an error creating new user', error.message)
    }
    
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;