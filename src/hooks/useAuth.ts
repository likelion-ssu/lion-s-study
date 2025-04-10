"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export const useAuth = () => {
  const { uid, googleId, loadUserInfo, isHydrated } = useUserStore();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const isLoggedIn = !!uid;

  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid]);

  useEffect(() => {
    const checkUserInDB = async () => {
      if (!googleId) return setIsRegistered(null);

      const usersRef = collection(fireStore, "users");
      const q = query(usersRef, where("googleId", "==", googleId));
      const snapshot = await getDocs(q);
      setIsRegistered(!snapshot.empty);
    };

    if (googleId) {
      checkUserInDB();
    }
  }, [googleId]);

  const needsRegistration = isLoggedIn && isRegistered === false;

  return {
    uid,
    googleId,
    isLoggedIn,
    isRegistered,
    needsRegistration,
    isHydrated 
  };
};
