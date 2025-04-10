"use client";

import React from "react";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "./NameBtn.module.css";
import LogoutModalContent from "../modal/LogoutModalContent";

export default function NameBtn() {
  const { name, year } = useUserStore();
  const open = useModalStore(state => state.open);
  const handleOpenLogout = () => {
    open(<LogoutModalContent />);
  };

  return (
    <button type="button" className={styles.btn} onClick={handleOpenLogout}>
      <p className={styles.name}>{name}</p>
      <p className={styles.year}>{year}기</p>
    </button>
  );
}
