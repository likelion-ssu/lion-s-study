"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import LogoutModal from "./LogoutModal";

export default function LoginButton() {
  const { uid, loadUserInfo, initializeFromStorage } = useUserStore();

  // 시작 시 localStorage에서 로그인 상태 불러오기
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  // uid가 변경될 때 Firebase DB에서 사용자 정보 불러오기
  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid, loadUserInfo]);

  return (
    <>
      <LogoutModal />
      {!uid ? <LoginBtn /> : <NameBtn />}
    </>
  );
}
