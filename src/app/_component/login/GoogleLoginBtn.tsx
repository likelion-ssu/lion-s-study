"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect, useState } from "react";
import SignUpModal from "./SignUpModal";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";

export default function GoogleLoginBtn() {
  const { uid, setUser } = useUserStore();
  const { closeLoginModal } = useModalStore();
  const [showSignup, setShowSignup] = useState(false);
  const [pendingUser, setPendingUser] = useState<{ uid: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { uid, email } = JSON.parse(userData);
      setUser(uid, email);
    }
  }, [setUser]);

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (typeof result === "object") {
      setPendingUser(result);
      setShowSignup(true);
      closeLoginModal();
    }
  };

  const handleLogout = async () => {
    await signOutWithGoogle();
    // 로그아웃 시에는 모달을 닫지 않음
  };

  return (
    <div>
      {uid ? (
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <>
          <button type="button" onClick={handleLogin} className={styles.googleBtn}>
            <ICGoogle />
            <p className={styles.googleBtnText}>Sign in with Google</p>
          </button>
          {showSignup && pendingUser && (
            <SignUpModal
              uid={pendingUser.uid}
              googleId={pendingUser.email}
              onSuccess={() => {
                setShowSignup(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
