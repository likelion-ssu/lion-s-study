"use client";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import fireStore from "@/firebase/firestore";
import styles from "./SignUpModal.module.css";
import modalStyles from "./Modal.module.css";
import ICDelete from "@/assets/icon/delete.svg";
import { useState } from "react";

const PART_OPTIONS = [
  { value: "기획", label: "기획" },
  { value: "디자인", label: "디자인" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "백엔드", label: "백엔드" }
];

export default function SignUpModalContent({
  uid,
  googleId
}: {
  uid: string | null;
  googleId: string | null;
}) {
  if (!uid || !googleId) {
    alert("로그인을 다시 해주세요.");
    return null;
  }

  const [isPartOpen, setIsPartOpen] = useState(false);

  const { name, year, part, setName, setYear, setPart, clearUser } = useUserStore();
  const close = useModalStore(state => state.close);

  const isFormValid = name && year && part;

  const handleSubmit = async () => {
    if (!isFormValid) return alert("모든 값을 입력하세요");

    await setDoc(doc(fireStore, "users", uid), {
      googleId,
      name,
      year: Number(year),
      part,
      createdAt: serverTimestamp(),
      favorites: []
    });

    useUserStore.getState().setUserInfo(name, Number(year), part);
    close();
  };

  const handleClose = () => {
    clearUser();
    close();
  };

  const handleSelectClick = () => {
    setIsPartOpen(!isPartOpen);
  };

  const handleOptionClick = (value: string) => {
    setPart(value);
    setIsPartOpen(false);
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>내 정보 입력</h2>
        <ICDelete onClick={handleClose} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.form}>
        <div>
          <p className={styles.formLabel}>이름</p>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <p className={styles.formLabel}>기수</p>
          <div className={styles.yearWrapper}>
            <input
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              placeholder="ex) 13"
              className={styles.yearInput}
            />
            <p className={styles.formLabel}>기</p>
          </div>
        </div>
        <div>
          <p className={styles.formLabel}>파트</p>
          <div className={styles.selectWrapper}>
            <div
              className={styles.selectBox}
              onClick={handleSelectClick}
              style={{ color: part ? "#000" : "#9a9a9a" }}
            >
              {part || "파트 선택"}
            </div>
            {isPartOpen && (
              <div className={styles.optionList}>
                {PART_OPTIONS.map(option => (
                  <div
                    key={option.value}
                    className={`${styles.option} ${
                      part === option.value ? styles.selectedOption : ""
                    }`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={handleSubmit} className={isFormValid ? styles.active : ""}>
            완료하기
          </button>
        </div>
      </div>
    </div>
  );
}
