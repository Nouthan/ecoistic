import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase.js";
import store from "../redux/store.js";
import { apiSlice } from "../redux/slices/apiSlice.js";
import { setCredentials } from "../redux/slices/authSlice.js";

export function getInitials(fullName) {
  const names = fullName?.split(" ");
  const initials = names?.slice(0, 2).map((name) => name[0]);
  const initialsStr = initials?.join("");
  return initialsStr;
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    const token = await user.getIdToken();
    console.log(token);
    const response = await store.dispatch(
      apiSlice.endpoints.googleLogin.initiate({ token })
    );
    const userData = response.data;
    console.log(response);

    if (userData) {
      store.dispatch(setCredentials(userData));
      console.log("User logged in successfully", userData);
    }
  } catch (error) {
    console.error("Error during Google login", error);
  }
}
