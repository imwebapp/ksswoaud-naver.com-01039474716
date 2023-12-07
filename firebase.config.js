// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCksk8KY_tWJkb_YfyiIYIfSdRig5a0PPo",
	authDomain: "massage-813ec.firebaseapp.com",
	databaseURL: "https://massage-813ec.firebaseio.com",
	projectId: "massage-813ec",
	storageBucket: "massage-813ec.appspot.com",
	messagingSenderId: "928206138152",
	appId: "1:928206138152:web:36c97be8b209b74e637e1d",
	measurementId: "G-3EL5YTDRZ5",
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