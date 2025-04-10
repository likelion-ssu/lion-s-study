"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import styles from "./LoginBtn.module.css";
import LoginModalContent from "../modal/LoginModalContent";

export default function LoginBtn() {
  const open = useModalStore(state => state.open);
  const handleOpenLogin = () => {
    open(<LoginModalContent />);
  };

  return (
    <button type="button" className={styles.btn} onClick={handleOpenLogin}>
      로그인
    </button>
  );
}
