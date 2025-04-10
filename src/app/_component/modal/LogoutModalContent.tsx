"use client";

import React from "react";
import styles from "./LogoutModal.module.css";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import { signOutWithGoogle } from "@/firebase/firebaseAuth";
import ICDelete from "@/assets/icon/delete.svg";

export default function LogoutModalContent() {
  const { name, year, part, clearUser } = useUserStore();
  const close = useModalStore(state => state.close);

  const handleLogout = async () => {
    await signOutWithGoogle();
    clearUser();
    close();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          <p className={styles.name}>{name}</p>
          <p className={styles.year}>{year}기</p>
        </div>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.partContainer}>
        <p className={styles.part}>파트</p>
        <div className={styles.partName}>{part}</div>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
