"use client";

import React from "react";
import styles from "./LogoutModal.module.css";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { signOutWithGoogle } from "@/firebase/firebaseAuth";
import ICDelete from "@/assets/icon/delete.svg";

export default function LogoutModal() {
  const { openedModal, closeModal } = useModalStore();
  const { clearUser } = useUserStore();
  const { name, year, part } = useUserStore();

  const handleLogout = async () => {
    await signOutWithGoogle();
    clearUser();
    closeModal();
  };

  if (openedModal !== "logout") return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <p className={styles.name}>{name}</p>
            <p className={styles.year}>{year}기</p>
          </div>
          <ICDelete onClick={closeModal} style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.partContainer}>
          <p className={styles.part}>파트</p>
          <div className={styles.partName}>{part}</div>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
