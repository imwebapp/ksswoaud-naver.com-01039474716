// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAalAcfPT4JNK45DmmD8LkDQwQ6_sKNPNI",
	authDomain: "kormassagecom.firebaseapp.com",
	projectId: "kormassagecom",
	storageBucket: "kormassagecom.appspot.com",
	messagingSenderId: "601369094519",
	appId: "1:601369094519:web:bfe46737ea1d7c1e045972",
	measurementId: "G-WEKBPETWJ7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

//  SESSION_EXPIRED.
auth.onAuthStateChanged(async (user) => {
	if (user) {
	} else {
	  try {
		await auth.signInWithPopup(new GoogleAuthProvider());
	  } catch (error) {
		if (error.code === "auth/session-expired") {
		  await auth.signInWithPopup(new GoogleAuthProvider());
		} else {
		}
	  }
	}
  });