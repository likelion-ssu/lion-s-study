"use client";

import { useModalStore } from "@/store/useModalStore";
import GoogleLoginBtn from "../login/GoogleLoginBtn";
import ICDelete from "@/assets/icon/delete.svg";

import modalStyles from "./Modal.module.css";

export default function LoginModalContent() {
  const close = useModalStore(state => state.close);

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>로그인</h2>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <GoogleLoginBtn />
    </div>
  );
}
