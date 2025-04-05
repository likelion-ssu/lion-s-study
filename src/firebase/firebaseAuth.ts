import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { fireAuth } from "./firebasedb";
import { useUserStore } from "@/store/useUserStore";
import fireStore from "./firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<"existing" | { uid: string; email: string }> => {
  try {
    const data = await signInWithPopup(fireAuth, provider);
    const user = data.user;

    const userRef = doc(fireStore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      useUserStore.getState().setUser(user.uid, userData.googleId);
      return "existing";
    } else {
      return { uid: user.uid, email: user.email! };
    }
  } catch (error) {
    console.error("Google 로그인 실패", error);
    throw error;
  }
};

export const signOutWithGoogle = async () => {
  try {
    await signOut(fireAuth);
    const { clearUser } = useUserStore.getState();
    clearUser();
    console.log("Google 로그아웃 성공");
  } catch (error) {
    console.log("Google 로그아웃 실패", error);
  }
};
