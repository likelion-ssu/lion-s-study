"use client";

import React from "react";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import styles from "./NameBtn.module.css";

export default function NameBtn() {
  const { name, year } = useUserStore();
  const { openModal } = useModalStore();

  return (
    <button type="button" className={styles.btn} onClick={() => openModal("logout")}>
      <p className={styles.name}>{name}</p>
      <p className={styles.year}>{year}기</p>
    </button>
  );
}
