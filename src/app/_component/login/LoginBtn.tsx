"use client";

import React from "react";
import styles from "./LoginBtn.module.css";
import { useModalStore } from "@/store/useModalStore";

export default function LoginBtn() {
  const { openModal } = useModalStore();

  return (
    <button type="button" className={styles.btn} onClick={() => openModal("login")}>
      로그인
    </button>
  );
}
