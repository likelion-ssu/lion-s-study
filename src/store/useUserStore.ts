"use client";

import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

interface UserState {
  uid: string | null;
  googleId: string | null;
  name: string | null;
  year: number | null;
  part: string | null;
  setUser: (uid: string, googleId: string) => void;
  setUserInfo: (name: string, year: number, part: string) => void;
  clearUser: () => void;
  loadUserInfo: (uid: string) => Promise<void>;
  initializeFromStorage: () => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
  uid: null,
  googleId: null,
  name: null,
  year: null,
  part: null,
  setUser: (uid, googleId) => {
    set({ uid, googleId });
    // localStorage에 저장
    localStorage.setItem("user", JSON.stringify({ uid, googleId }));
  },
  setUserInfo: (name, year, part) => {
    set({ name, year, part });
    // localStorage에 저장된 사용자 정보 업데이트
    const userData = localStorage.getItem("user");
    if (userData) {
      const { uid, googleId } = JSON.parse(userData);
      localStorage.setItem("user", JSON.stringify({ uid, googleId, name, year, part }));
    }
  },
  clearUser: () => {
    set({ uid: null, googleId: null, name: null, year: null, part: null });
    // localStorage에서 삭제
    localStorage.removeItem("user");
  },
  loadUserInfo: async uid => {
    try {
      const userDoc = await getDoc(doc(fireStore, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        set({ name: userData.name, year: userData.year, part: userData.part });

        // localStorage에 저장된 사용자 정보 업데이트
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          const { uid, googleId } = JSON.parse(storedUserData);
          localStorage.setItem(
            "user",
            JSON.stringify({
              uid,
              googleId,
              name: userData.name,
              year: userData.year,
              part: userData.part
            })
          );
        }
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  },
  initializeFromStorage: async () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const { uid, googleId, name, year, part } = JSON.parse(userData);
        set({ uid, googleId, name, year, part });

        // Firebase에서 최신 정보 불러오기
        if (uid) {
          const userDoc = await getDoc(doc(fireStore, "users", uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            set({ name: userData.name, year: userData.year, part: userData.part });
          }
        }
      }
    } catch (error) {
      console.error("Error initializing from storage:", error);
    }
  }
}));
