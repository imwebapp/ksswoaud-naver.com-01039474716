// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAKKtaDFaTcgc5ztDKqOD3q77odFtCnnT8",
	authDomain: "kormsg-5b4c5.firebaseapp.com",
	projectId: "kormsg-5b4c5",
	storageBucket: "kormsg-5b4c5.appspot.com",
	messagingSenderId: "1010461619465",
	appId: "1:1010461619465:web:b1885be5185b8f13874fd8",
	measurementId: "G-8295JJRZ1L"
}

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