import { signInAnonymously, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const handleAnonymousLogin = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Anonymous user ID:", userCredential.user.uid);
  } catch (error) {
    console.error("Error with anonymous login:", error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User have been logged out")
  } catch(err) {
    console.log(err)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user?.isAnonymous) {
    console.log("User is browsing anonymously.");
    console.log(user.uid);
  }
});