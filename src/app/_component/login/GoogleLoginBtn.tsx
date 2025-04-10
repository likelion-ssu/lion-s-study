"use client";

import { signInWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import { useModalStore } from "@/store/useModalStore";
import SignUpModalContent from "../modal/SignUpModalContent";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";
import { useEffect } from "react";

export default function GoogleLoginBtn() {
  const { open, close } = useModalStore();
  const { setUser, clearUser } = useUserStore();
  const auth = useAuth();

  useEffect(() => {
    if (auth.needsRegistration) {
      open(<SignUpModalContent uid={auth.uid} googleId={auth.googleId} />);
      useModalStore.getState().onBackdropClick = () => {
        clearUser();
        close();
      };
    } else if (auth.isLoggedIn && auth.isRegistered) {
      close();
    }
    return () => {
      useModalStore.getState().onBackdropClick = null;
    };
  }, [auth.needsRegistration, auth.isLoggedIn, auth.isRegistered, close]);

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (typeof result === "object") {
        setUser(result.uid, result.email);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button onClick={handleLogin} className={styles.googleBtn}>
      <ICGoogle />
      <p className={styles.googleBtnText}>Sign in with Google</p>
    </button>
  );
}
